var Cricket = require('../models/crickets.model');

// Retrieve and return all users from the database.
exports.findAll = function (req, res) {
    Cricket.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data."
        });
    });
};

// Retrieve and return a data by the id from the database.
exports.findOne = function (req, res) {
    Cricket.findById(req.params.id).then(data => {
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
            message: "Error retrieving Data with id " + req.params.id
        });
    });
};

// Create and Save a new Data
exports.create = (req, res) => {
    var postData = {
        "title": req.body.title,
        "date": req.body.date,
        "subtitle": req.body.subtitle,
        "team1": req.body.team1,
        "team1_score": req.body.team1_score,
        "team2": req.body.team2,
        "team2_score": req.body.team2_score
    };

    // Save data in the database
    Cricket.create(postData).then(data => {
        res.send({
            status: "success",
            message: "Record created successfully",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message || "Some error occurred while creating the data."
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    var putData = {
        "title": req.body.title,
        "date": req.body.date,
        "subtitle": req.body.subtitle,
        "team1": req.body.team1,
        "team1_score": req.body.team1_score,
        "team2": req.body.team2,
        "team2_score": req.body.team2_score
    };

    // Find note and update it with the request body
    Cricket.findOneAndUpdate({ _id: req.params.id }, putData, { new: true }).then(data => {
        if (!data) {
            return res.status(404).send({
                status: "error",
                message: "Data not found with id " + req.params.id
            });
        }
        res.send({
            status: "success",
            message: "Record updated successfully",
            data: data
        });
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                status: "error",
                message: "Data not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            status: "error",
            message: "Error updating data with id " + req.params.id
        });
    });
};

// Delete a data with the specified id in the request
exports.delete = (req, res) => {
    Cricket.findOneAndDelete({ _id: req.params.id }).then(data => {
        if (!data) {
            return res.status(404).send({
                status: "error",
                message: "Data not found with id " + req.params.id
            });
        }
        res.send({
            status: "success",
            message: "Data deleted successfully!"
        });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                status: "error",
                message: "Data not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            status: "error",
            message: "Could not delete data with id " + req.params.id
        });
    });
};
