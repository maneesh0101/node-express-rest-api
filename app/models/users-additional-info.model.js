var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    "userId": String,
    "email": String,
    "org1": String,
    "mobile1": String,
    "myDate": String,
    "address": String,
    "education": String,
    "gender": String
});
module.exports = mongoose.model('users-additional-infos', UserSchema);