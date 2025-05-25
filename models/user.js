const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userDB')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String
});


const user = mongoose.model('user', userSchema);

module.exports = user;
// This code defines a Mongoose schema for a user model with fields for name, email, and image.