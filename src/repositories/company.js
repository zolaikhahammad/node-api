require('dotenv').config()

const Constants = require('../utils/constants');
const Company = require("../models/company");
const ErrorHandler = require('../errorHandler');

module.exports = new class CompanyRepository {

    async add(companyData) {

        try {
            const company = new Company({
                name: companyData.name,
                logo: companyData.imageName,
                address: companyData.address,
                phone_number: companyData.phone_number,
                created_by: companyData.created_by,
                created_at: Date.now(),
            });

            await company.save();
            return company;
        }
        catch (error) {
            throw new Error('Error in CompanyRepository.add: ' + error.message);
        }
    }

    async delete(companyId) {
        try {
            const company = await Company.findByIdAndUpdate(companyId,
                {
                    is_deleted: true
                },
                {
                    new: true
                });
            const companyNotFound = !company;
            if (companyNotFound) {
                const error = new Error("company not found");
                error.statusCode = Constants.StatusCodes.NOT_FOUND;
                throw error;
            }
            return company;
        }
        catch (error) {
            throw new Error('Error in CompanyRepository.delete: ' + error.message);
        }
    }

    async get(companyId) {
        try {
            const company = await Company.findOne({
                _id: companyId,
                is_deleted: false
            }).exec();

            return company;
        }
        catch (error) {
            throw new Error('Error in CompanyRepository.get: ' + error.message);
        }
    }

    async getAll(status) {
        try {
            const company = await Company.find({
                is_deleted: false,
                is_active: Boolean(status.toLowerCase())
            }).exec();

            return company;
        }
        catch (error) {
            throw new Error('Error in CompanyRepository.getAll: ' + error.message);
        }
    }

    async updateCompany(companyData) {
        try {

            const company = await Company.findByIdAndUpdate(companyData.companyID,
                {
                    name: companyData.name,
                    logo: companyData.imageName,
                    address: companyData.address,
                    phone_number: companyData.phone_number,
                    updated_by: companyData.userId,
                    updated_at: Date.now(),
                },
                {
                    new: true
                });

            const companyNotFound = !company;
            if (companyNotFound) {
                const error = new Error("company not found");
                error.statusCode = Constants.StatusCodes.NOT_FOUND;
                throw error;
            }
            return company;
        }
        catch (error) {
            throw new Error('Error in CompanyRepository.update: ' + error.message);
        }
    }

    async updateStatus(companyId, status) {
        try {
            const company = await Company.findOneAndUpdate(
                {
                    _id: mongoose.Types.ObjectId(companyId)
                },
                {
                    $set:{
                        is_active: Boolean(status)
                    },
                },
                
                {
                    new: true
                });

            return company;
        }
        catch (error) {
            throw new Error('Error in CompanyRepository.updateStatus: ' + error.message);
        }
    }


}

