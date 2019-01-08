var Model = require('../models/employees.model');

// Retrieve and return all users from the database.
exports.findAll = function (req, res) {
    Model.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data."
        });
    });
};

// Retrieve and return a user by the userId from the database.
exports.findOne = function (req, res) {
    Model.findById(req.params.id).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
        }
        res.send(data);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
        });
    });
};

// Create and Save a new User
exports.create = (req, res) => {
    // Create a Model
    var postData = {
        name: req.body.name,
        gender: req.body.gender,
        country: req.body.country,
        project: req.body.project,
        location: req.body.location
    };

    // Save user in the database
    Model.create(postData).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    var postData = {
        name: req.body.name,
        gender: req.body.gender,
        country: req.body.country,
        project: req.body.project,
        location: req.body.location
    };

    // Find note and update it with the request body
    Model.findOneAndUpdate({_id: req.params.id}, postData, { new: true }).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
        }
        res.send(data);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.id
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    Model.findOneAndDelete({_id: req.params.id}).then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
        }
        res.send({ message: "Data deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Data not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.id
        });
    });
};