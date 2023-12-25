const mongoose = require('mongoose');
const { INTEGER, BOOLEAN, DATE } = require('sequelize');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone_number: {
        type: String,
        require: true
    },
    logo: {
        type: String,
        require: true
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    is_address_public: {
        type: Boolean,
        default: false,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    created_at: {
        type: Date
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    updated_at: {
        type: Date
    },
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;