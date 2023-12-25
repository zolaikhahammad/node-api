
const companyHandler = require('../../handlers/database/companyhandler');

exports.addCompany = async (req, res, next) => {
    try {

        const handler = new companyHandler.constructor(req, res, next);
        return await handler.add();
    }
    catch (error) {
        error.statusCode = 500;

        next(error);
    }
}

exports.deleteCompany = async (req, res, next) => {
    try {
        const companyID  = req.params.companyId
        const handler = new companyHandler.constructor(req, res, next);

        return await handler.delete(companyID);
    }
    catch (error) {
        error.statusCode = 500;

        next(error);
    }
}

exports.getCompanies = async (req, res, next) => {
    try {
        const status = req.params.status;
        const handler = new companyHandler.constructor(req, res, next);

        return await handler.getAll(status);
    }
    catch (error) {
        error.statusCode = 500;

        next(error);
    }
}

exports.getCompanyById = async (req, res, next) => {
    try {
        const companyID  = req.params.companyId
        const handler = new companyHandler.constructor(req, res, next);

        return await handler.get(companyID);
    }
    catch (error) {
        error.statusCode = 500;

        next(error);
    }
}

exports.updateStatus = async (req, res, next) => {
    try {
        const companyID  = req.params.companyId
        const status = req.params.status;
        const handler = new companyHandler.constructor(req, res, next);

        return await handler.updateStatus(companyID);
    }
    catch (error) {
        error.statusCode = 500;

        next(error);
    }
}

exports.updateCompany = async (req, res, next) => {
    try {
        const companyID  = req.params.companyId
        const handler = new companyHandler.constructor(req, res, next);

        return await handler.update(companyID);
    }
    catch (error) {
        error.statusCode = 500;

        next(error);
    }
}
