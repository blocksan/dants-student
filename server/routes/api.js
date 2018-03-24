const express = require('express');
const router = express.Router();

let _ = require('lodash');
let mongoose = require('./../db/db-connection').mongoose;
let User = require('./../models/users').users;
let searchdata = require('./../models/searchdata').searchdata;


let authenticate = require('./../middleware/authenticate').authenticate;

let translate = require('yandex-translate')('trnsl.1.1.20180313T071228Z.8ab0847319ae2005.9258e5f28c2acb16e117ec920ba63fffe51eef8a');

/* const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID; */


function register(req, res) {
    var body = _.pick(req.body, ['email', 'name', 'password']);

    var user = new User(body);


    user.save().then(user => {
        return user.generateAuthToken();
    }).then(token => {
        res.header('x-auth', token).json({ user: user, token: token });
    }).catch(err => {
        console.log(err);
        if (err.name === 'ValidationError')
            res.status(500).send({ 'errorname': err.name, 'message': 'name must be filled' })
        else if (err.name == 'MongoError' && err.code == 11000)
            res.status(500).send({ 'errorname': err.name, 'message': err.errmsg, 'code': err.code })
    });

}



// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/dm', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    User.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/register', (req, res) => {



    var body = _.pick(req.body, ['email']);



    User.findEmail(body.email).then(user => {
        res.status(409).json({ 'message': 'Email already exists' })
    }).catch(() => {
        register(req, res);
    });
});


router.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then(function(token) {

            res.header('x-auth', token).json({ user: user, token: token });
        });
    }).catch(() => {
        res.status(400).send({ "err": "username or password incorrect" });
    });
});

router.post('/postsearch', (req, res) => {
    var body = _.pick(req.body, ['searchkey', 'searchresult']);
    var searchd = new searchdata(body)
    searchd.save().then(search => {
        res.status(200).json({ search: search });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ 'errorname': err.name, 'message': err.errmsg, 'code': err.code })
    });

});
router.get('/getsavedsearch', (req, res) => {
    searchdata.find()
        .exec()
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).send({ 'errorname': 'error in fetching the data' })
        });

});

router.delete('/logout', authenticate, (req, res) => {
    User.removeToken(req.user._id, req.token).then(function(response) {
        res.status(200).send();
    }).catch(function(e) {
        res.status(401).send();
    });
});

//authenticate based on the token set by header


router.get('/me', authenticate, (req, res) => {
    res.send(req.user);
});



/* router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('dummy')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
}); */
router.get('/searchdata', (req, res) => {
    searchdata.find()
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})


router.post('/getTranslate', (req, res) => {

    var body = _.pick(req.body, ['searchKey', 'searchTargetLang']);

    console.log(body)
    translate.translate(body.searchKey, { to: body.searchTargetLang }, function(err, result) {
        console.log(result, 'got translated');
        return res.status(result.code).json(result)
    });

})
router.post('/getDetect', (req, res) => {
    var body = _.pick(req.body, ['searchKey']);
    translate.detect(body.searchKey, function(err, result) {

        console.log(result, ' detect language');
        return res.status(result.code).json(result)
    });


})

module.exports = router;