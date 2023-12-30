const mongoose = require('mongoose');
const {nodeJsConnection} = require('../database/database');
const logsSchema = new mongoose.Schema({
    error: {
        type: String
    },
    collection_name: {
        type: String
    },
    method_name: {
        type: String
    },
    class_name: {
        type: String
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        default: null,
    },
    created_at: {
        type: Date
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        default: null,
    },
    updated_at: {
        type: Date
    },
});

const Logs = nodeJsConnection.model('Logs', logsSchema);
module.exports = Logs;