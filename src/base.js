const Constants = require('../src/utils/constants');

module.exports = class Base {

    handleServerError(next) {
        const error = new Error("Internal server error");
        error.statusCode = Constants.StatusCodes.SERVER_ERROR;
        next(error);
    }
}