var User = require('../models/products.model');

// Retrieve and return all users from the database.
exports.findAll = function (req, res) {
    User.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data."
        });
    });
};

// Retrieve and return a user by the userId from the database.
exports.findOne = function (req, res) {
    User.findById(req.params.id).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(data);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
        });
    });
};