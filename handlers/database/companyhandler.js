require('dotenv').config()

const Company = require("../../models/company/company");
const Helper = require('../../util/helper');
const Constants = require('../../util/constants');
const Base = require('./base');
module.exports = new class CompanyHandlerDb extends Base {

    constructor(_req, _res, _next) {
        super(_req, _res, _next);
    }

    async add() {
        try {
            let imageName;

            const { image } = this.req.files;
            imageName = Helper.getCurrentISODateString() + "_" + image.name;

            image.mv(Helper.getFormattedImageName(process.env.FILE_PATH, imageName), (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
            });

            const company = new Company({
                name: this.req.body.name,
                logo: imageName,
                address: this.req.body.address,
                phone_number: this.req.body.phone_number,
                created_by: this.req.userId
            });

            await company.save();

            return this.res.status(Constants.StatusCodes.SUCCESS).json({
                message: "company created",
                response: company
            });

        }
        catch (error) {
            error.statusCode = 500;
            this.next(error);
        }
    }
}