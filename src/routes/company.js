
//#region Imports

const express  = require('express');
const router  = express.Router();
const isAuth = require('../middlewares/auth-guard');
const companyController = require('../controllers/company');

//#endregion

//#region Routes

router.delete("/delete/:companyId",isAuth, companyController.deleteCompany);

router.get("/get/:companyId",isAuth, companyController.getCompanyById);
router.get("/getall/:status",isAuth, companyController.getAllCompaniesByStatus);

router.post("/add",isAuth, companyController.addCompany);

router.put("/updatestatus/:companyId/:status",isAuth, companyController.updateStatus);
router.put("/update/:companyId",isAuth, companyController.updateCompany);

//#endregion

module.exports = router;