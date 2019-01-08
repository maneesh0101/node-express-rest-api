var mongoose = require('mongoose');
var Schema = new mongoose.Schema({
    name: String,
    gender: String,
    country: String,
    project: String,
    location: String
});
module.exports = mongoose.model('employees', Schema);