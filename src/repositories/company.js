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

            return this.res.status(Constants.StatusCodes.SUCCESS).json({
                message: "companies loaded",
                response: company
            });
        }
        catch (error) {
            this.error(Constants.StatusCodes.SERVER_ERROR, "server error: " + error);
        }
    }

    async updateStatus(companyId, status) {
        try {
            const company = await Company.findByIdAndUpdate(companyId,
                {
                    is_active: Boolean(status)
                },
                {
                    new: true
                });

            return this.res.status(Constants.StatusCodes.SUCCESS).json({
                message: "company status updated",
                response: company
            });
        }
        catch (error) {
            this.error(Constants.StatusCodes.SERVER_ERROR, "server error: " + error);
        }
    }

    async update(companyid) {
        try {
            let imageName;

            if (this.validateFileUpload()) {
                imageName = await this.uploadImage();
            }

            const company = await Company.findByIdAndUpdate(companyid,
                {
                    name: this.req.body.name,
                    logo: imageName,
                    address: this.req.body.address,
                    phone_number: this.req.body.phone_number,
                    updated_by: this.req.userId,
                    updated_at: Date.now(),
                },
                {
                    new: true
                });

            const companyNotFound = !company;
            if (companyNotFound) {
                this.error(Constants.StatusCodes.NOT_FOUND, "company not found");
            }
            else {
                return this.res.status(Constants.StatusCodes.SUCCESS).json({
                    message: "company updated",
                    response: company
                });
            }
        }
        catch (error) {
            this.error(Constants.StatusCodes.SERVER_ERROR, "server error: " + error);
        }
    }


}

