const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },    
    password:{
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Users = mongoose.model('users', userSchema);
module.exports = Users;