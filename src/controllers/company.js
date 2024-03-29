const ErrorHandler = require('../errorHandler');
const CompanyService = require('../services/company');

class CompanyController {

    async addCompany(req, res) {
        try {

            const companyRequest = {
                name: req.body.name,
                file: req.files,
                address: req.body.address,
                phone_number: req.body.phone_number,
                created_by: req.userId,
            }
            return await CompanyService.addCompany(companyRequest, res);
        }
        catch (error) {
            ErrorHandler.handleServerError(res, error);
        }
    }

    async deleteCompany(req, res) {
        try {
            const companyID = req.params.companyId;

            return await CompanyService.deleteCompany(companyID, res);
        }
        catch (error) {
            ErrorHandler.handleServerError(res, error);
        }
    }

    async getAllCompaniesByStatus(req, res) {
        try {
            const status = req.params.status;

            return await CompanyService.getAllCompaniesByStatus(status, res);
        }
        catch (error) {
            ErrorHandler.handleServerError(res, error);
        }
    }

    async getCompanyById(req, res) {
        try {
            const companyID = req.params.companyId;

            return await CompanyService.getCompanyByID(companyID, res);
        }
        catch (error) {
            ErrorHandler.handleServerError(res, error);
        }
    }

    async updateStatus(req, res) {
        try {
            const companyID = req.params.companyId
            const status = req.params.status;

            return await CompanyService.updateStatus(companyID, status, res);
        }
        catch (error) {
            ErrorHandler.handleServerError(res, error);
        }
    }

    async updateCompany(req, res) {
        try {
            const companyRequest = {
                companyID: req.params.companyId,
                name: req.body.name,
                file: req.files,
                address: req.body.address,
                phone_number: req.body.phone_number,
                created_by: req.userId,
            }

            return await CompanyService.updateCompany(companyRequest, res);
        }
        catch (error) {
            ErrorHandler.handleServerError(res, error);
        }
    }
}


module.exports = new CompanyController();

// exports.addCompany = async (req, res, next) => {
//     try {

//         const handler = new companyHandler.constructor(req, res, next);
//         return await handler.add();
//     }
//     catch (error) {
//         error.statusCode = 500;

//         next(error);
//     }
// }

// exports.deleteCompany = async (req, res, next) => {
//     try {
//         const companyID  = req.params.companyId
//         const handler = new companyHandler.constructor(req, res, next);

//         return await handler.delete(companyID);
//     }
//     catch (error) {
//         error.statusCode = 500;

//         next(error);
//     }
// }

// exports.getCompanies = async (req, res, next) => {
//     try {
//         const status = req.params.status;
//         const handler = new companyHandler.constructor(req, res, next);

//         return await handler.getAll(status);
//     }
//     catch (error) {
//         error.statusCode = 500;

//         next(error);
//     }
// }

// exports.getCompanyById = async (req, res, next) => {
//     try {
//         const companyID  = req.params.companyId
//         const handler = new companyHandler.constructor(req, res, next);

//         return await handler.get(companyID);
//     }
//     catch (error) {
//         error.statusCode = 500;

//         next(error);
//     }
// }

// exports.updateStatus = async (req, res, next) => {
//     try {
//         const companyID  = req.params.companyId
//         const status = req.params.status;
//         const handler = new companyHandler.constructor(req, res, next);

//         return await handler.updateStatus(companyID);
//     }
//     catch (error) {
//         error.statusCode = 500;

//         next(error);
//     }
// }

// exports.updateCompany = async (req, res, next) => {
//     try {
//         const companyID  = req.params.companyId
//         const handler = new companyHandler.constructor(req, res, next);

//         return await handler.update(companyID);
//     }
//     catch (error) {
//         error.statusCode = 500;

//         next(error);
//     }
// }
