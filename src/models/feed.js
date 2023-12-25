const mongoose = require('mongoose');
const { INTEGER } = require('sequelize');

const feedSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },    
    image:{
        type: String,
        required: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Feeds = mongoose.model('feeds', feedSchema);
module.exports = Feeds;