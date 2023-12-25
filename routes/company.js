const express  = require('express');
const router  = express.Router();

const isAuth = require('../middleware/auth-guard');
const companyController = require('../controller/company/company');

router.delete("/delete/:companyId",isAuth, companyController.deleteCompany);

router.get("/get/:companyId",isAuth, companyController.getCompanyById);
router.get("/getall/:status",isAuth, companyController.getCompanies);

router.post("/add",isAuth, companyController.addCompany);

router.put("/updatestatus/:companyId/:status",isAuth, companyController.updateStatus);
router.put("/update/:companyId",isAuth, companyController.updateCompany);


module.exports = router;