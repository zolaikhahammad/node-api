
const companyHandler = require('../../handlers/database/companyhandler');

exports.postRegisterCompany = async (req, res, next) => {
    try {

        const handler = new companyHandler.constructor(req, res, next);
        return await handler.add();
    }
    catch (error) {
        error.statusCode = 500;
        next(error);
    }

}