const mongoose = require('mongoose');

const mongooseConnect = (callback) => {
    mongoose.connect('mongodb://127.0.0.1:27017/nodejs')
    .then(() => {
        console.log('Connected to MongoDB');
        callback();
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
};

module.exports = mongooseConnect;
