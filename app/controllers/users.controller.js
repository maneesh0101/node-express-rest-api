var User = require('../models/users.model');
var UserAdditionalInfo = require('../models/users-additional-info.model');

// Retrieve and return all users from the database.
exports.findAll = function (req, res) {
    User.find().then(data => {
        res.send({
            status: "success",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred"
        });
    });
};

// Retrieve and return a user by the userId from the database.
exports.findOne = function (req, res) {
    User.findById(req.params.id).then(data => {
        if (!data) {
            return res.status(404).send({
                status: "error",
                message: "User not found with id " + req.params.id
            });
        }
        res.send({
            status: "success",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred"
        });
    });
};

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            status: "error",
            message: "Username and Password is mandatory"
        });
    }
    // Create a User
    var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    };

    User.findOne({ username: req.body.username }).then(data => {
        if (data) {
            return res.send({
                status: "error",
                message: "Username already exists."
            });
        }
        // Save user in the database
        User.create(user).then(data => {
            res.send({
                status: "success",
                message: "User created successfully.",
                data: data
            });
        }).catch(err => {
            res.status(500).send({
                status: "error",
                message: err.message || "Some error occurred."
            });
        });
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred"
        });
    });

};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    };

    User.findOne({ username: req.body.username, _id: { $ne: req.params.id } }).then(data => {
        if (data) {
            return res.send({
                status: "error",
                message: "Username already exists."
            });
        }
        // Find note and update it with the request body
        User.updateOne({ _id: req.params.id }, user, { new: true }).then(data => {
            if (!data) {
                return res.status(404).send({
                    status: "error",
                    message: "User not found with id " + req.params.id
                });
            }
            res.send({
                status: "success",
                message: "User updated successfully."
            });
        }).catch(err => {
            res.status(500).send({
                status: "error",
                message: err.message || "Some error occurred"
            });
        });
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred"
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findOneAndDelete({ _id: req.params.id }).then(data => {
        if (!data) {
            return res.status(404).send({
                status: "error",
                message: "User not found with id " + req.params.id
            });
        }
        res.send({ message: "User deleted successfully!" });
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred"
        });
    });
};

// Username duplicate check
exports.findByUsername = (req, res) => {
    // Validate request
    if (!req.body.username) {
        return res.status(400).send({
            status: "error",
            message: "Username is mandatory"
        });
    }

    User.findOne({ username: req.body.username }).then(data => {
        if (!data) {
            return res.send({
                status: "success",
                message: "Username does not exist"
            });
        }
        res.send({
            status: "error",
            message: "Username already exists."
        });
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred"
        });
    });
};

// Create and Save a User's additional Information
exports.updateAdditionalInfo = (req, res) => {
    // Validate request
    if (!req.params.id) {
        return res.status(400).send({
            status: "error",
            message: "UserId is mandatory"
        });
    }

    var userAdditionalInfo = {
        "userId": req.params.id,
        "email": req.body.email,
        "org1": req.body.org1,
        "mobile1": req.body.mobile1,
        "myDate": req.body.myDate,
        "address": req.body.address,
        "education": req.body.education,
        "gender": req.body.gender
    };

    // Save data in the database
    UserAdditionalInfo.create(userAdditionalInfo).then(data => {
        res.send({
            status: "success",
            message: "User Info created successfully.",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred"
        });
    });
};

// Retrieve and return a user by the userId from the database.
exports.findOneAdditionalInfo = function (req, res) {
    UserAdditionalInfo.findById(req.params.id).then(data => {
        if (!data) {
            return res.status(404).send({
                status: "error",
                message: "User not found with id " + req.params.id
            });
        }
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred"
        });
    });
};
