var User = require('./../models/users').users;
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();

        }


        req.user = _.pick(user, ['_id', 'email', 'name']);
        req.token = token;
        // console.log(token, 'valid token');
        next();

    }).catch((e) => {
        console.log('not valid');
        res.status(401).send();
    });
};

module.exports = { authenticate: authenticate };