const mongoose = require('mongoose');
const {nodeJsConnection} = require('../database/database');
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

const Users = nodeJsConnection.model('Users', userSchema);
module.exports = Users;