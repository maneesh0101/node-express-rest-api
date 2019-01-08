
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../global.config');
var User = require('../models/users.model');

// Retrieve and return all users from the database.
exports.login = function (req, res) {
    // Validate request
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Username and password is mandatory"
        });
    }
    User.findOne({ username: req.body.username, password: req.body.password }).then(data => {
        if (!data) {
            return res.send({
                message: "Username or password is incorrect"
            });
        }
        // create a token
        var token = jwt.sign({ id: data._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.send({ auth: true, token: token });
    }).catch(err => {
        return res.status(500).send({
            message: "Error while retrieving user"
        });
    });
};
