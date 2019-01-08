var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    type: String,
    price: String,
    imageUrl: String
});
module.exports = mongoose.model('products', UserSchema);