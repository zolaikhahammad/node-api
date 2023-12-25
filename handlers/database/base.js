module.exports = class Base {
    constructor(_req, _res, _next) {
        this.req = _req,
        this.res = _res;
        this.next = _next;
    }

    error(statusCode, message) {
        const error = new Error();
        error.statusCode = statusCode;
        error.message = message;
        this.next(error);
    }
}