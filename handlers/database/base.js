module.exports = class Base {
    constructor(_req, _res, _next) {
        this.req = _req,
        this.res = _res;
        this.next = _next;
    }
}