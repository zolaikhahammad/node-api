require('dotenv').config()

const Company = require("../../models/company/company");
const Helper = require('../../util/helper');
const Constants = require('../../util/constants');
const Base = require('./base');
const Logs = require('../../models/logs/logs');

module.exports = new class CompanyHandler extends Base {

    constructor(_req, _res, _next) {
        super(_req, _res, _next);
    }

    async add() {
        try {
            let imageName;

            if (this.validateFileUpload()) {
                imageName = await this.uploadImage();
            }

            const company = new Company({
                name: this.req.body.name,
                logo: imageName,
                address: this.req.body.address,
                phone_number: this.req.body.phone_number,
                created_by: this.req.userId,
                created_at: Date.now(),
            });

            await company.save();

            return this.res.status(Constants.StatusCodes.SUCCESS).json({
                message: "company created",
                response: company
            });

        }
        catch (error) {
            this.error(Constants.StatusCodes.SERVER_ERROR, "server error: " + error);
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

    //#region Helper Methods

    validateFileUpload() {
        return this.req.files && this.req.files.length > 0
    }

    async uploadImage() {
        let imageName;

        const { image } = this.req.files;
        imageName = Helper.getCurrentISODateString() + "_" + image.name;

        image.mv(Helper.getFormattedImageName(process.env.FILE_PATH, imageName), (err) => {
            if (err) {

            }
        });

        return imageName;
    }

    //#endregion
}

