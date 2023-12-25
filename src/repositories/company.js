require('dotenv').config()

const Base = require('../base');
const Company = require("../models/company");


module.exports = new class CompanyRepository extends Base {

    async add(companyData) {

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
                    this.error(Constants.StatusCodes.NOT_FOUND, "company not found");
                }
                else {
                    return this.res.status(Constants.StatusCodes.SUCCESS).json({
                        message: "company deleted",
                        response: null
                    });
                }
        }
        catch (error) {
            this.error(Constants.StatusCodes.SERVER_ERROR, "server error: " + error);
        }
    }

    async get(companyId) {
        try {
            const company = await Company.findOne({
                _id: companyId,
                is_deleted: false
            }).exec();

            return this.res.status(Constants.StatusCodes.SUCCESS).json({
                message: "company loaded",
                response: company
            });
        }
        catch (error) {
            this.error(Constants.StatusCodes.SERVER_ERROR, "server error: " + error);
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

