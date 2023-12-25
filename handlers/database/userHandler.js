require('dotenv').config()
const Helper = require('../../util/helper');
const Constants = require('../../util/constants');
const Base = require('./base');
const User = require('../../models/user');
module.exports = class UserHandler extends Base {
    
    constructor(_req, _res, _next) {
        super(_req, _res, _next);
    }

}