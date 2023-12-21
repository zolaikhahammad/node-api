const express  = require('express');
const router  = express.Router();

const isAuth = require('../middleware/auth-guard');
const companyController = require('../controller/company/company');

router.post("/add",isAuth, companyController.postRegisterCompany);

module.exports = router;