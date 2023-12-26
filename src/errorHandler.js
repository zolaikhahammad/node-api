const Constants = require('./utils/constants');

module.exports = class ErrorHandler {
    
    static handleServerError(res, error) {
        console.error(error);
    
        const statusCode = error.statusCode || Constants.StatusCodes.SERVER_ERROR;
        const errorMessage = error.message || 'Internal Server Error';
    
        res.status(statusCode).json({ error: errorMessage });
      }
}