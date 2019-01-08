var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    "title" : String,
    "date" : String,
    "subtitle" : String,
    "team1" : String,
    "team1_score" : String,
    "team2" : String,
    "team2_score" : String
});
module.exports = mongoose.model('crickets', schema);