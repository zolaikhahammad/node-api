const express = require('express');
const app = express();

module.exports = (error, req, res, next) => {
    console.log(error);
    return res.status(error.statusCode ? error.statusCode : 500).json({ "message": error.message });
}