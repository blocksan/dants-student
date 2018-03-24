let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let _ = require('lodash');
let jwt = require('jsonwebtoken');

let bcrypt = require('bcryptjs');


let UserSchema = new Schema({
    "name": {
        "type": String,
        "trim": true,
        "minlength": 1
    },
    "email": {
        "type": String,
        "trim": true
    },
    "password": {
        "type": String
    }
});

//user delete method
UserSchema.statics.removeToken = function(id, token) {
    var User = this;
    return User.findOneAndUpdate({ _id: id }, { token: null }, { upsert: true }).exec()
        .then(function(user) {
            return Promise.resolve(user);
        }, function(err) {
            return Promise.reject();
        })
};

//User object method
UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'token': token,
    });
};

//User object method and get user from email and password
UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;

    return User.findOne({ email: email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            // Use bcrypt.compare to compare password and user.password and send back the user
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};


//this method is called everytime whenever save method is called which save password after hashing
UserSchema.pre('save', function(next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});


UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var token = jwt.sign({ _id: user._id.toHexString(), name: user.name, email: user.email }, process.env.SECRET_KEY).toString();

    user.token = token;

    return user.save().then(function() {
        return token;
    })
}
UserSchema.statics.findEmail = function(email) {
    var User = this;

    return User.findOne({ email: email }).then(function(user) {

        if (!user) {
            return Promise.reject();
        } else {
            return Promise.resolve(user);
        }
    })
}

let users = mongoose.model('users', UserSchema)
module.exports = {
    users: users
}