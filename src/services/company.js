const CompanyRepository = require("../repositories/company");
const ErrorHandler = require('../errorHandler');
const Helper = require('../utils/helper');
const Constants = require('../utils/constants');

class CompanyService {

  async addCompany(companyObj, res) {

    try {
      let imageName;

      if (this.validateFileUpload(companyObj.file)) {
        imageName = await this.uploadImage(companyObj.file);
      }

      const company = await CompanyRepository.add({
        name: companyObj.name,
        imageName: imageName,
        address: companyObj.address,
        phone_number: companyObj.phone_number,
        created_by: companyObj.created_by
      });

      return res.status(Constants.StatusCodes.SUCCESS).json({
        message: "Company created",
        response: company
      });

    }
    catch (error) {
      ErrorHandler.handleServerError(res, error);
    }
  }

  async deleteCompany(companyId, res) {
    try {

      const company = await CompanyRepository.delete(companyId);

      return res.status(Constants.StatusCodes.SUCCESS).json({
        message: "Company deleted",
        response: company
      });
    }
    catch (error) {
      ErrorHandler.handleServerError(res, error);
    }
  }

  async getCompanyByID(companyId, res) {
    try {

      const company = await CompanyRepository.get(companyId);

      return res.status(Constants.StatusCodes.SUCCESS).json({
        message: "Company loaded",
        response: company
      });
    }
    catch (error) {
      ErrorHandler.handleServerError(res, error);
    }
  }

  //#region Helper Methods

  validateFileUpload(file) {
    return file && file.length > 0
  }

  async uploadImage(file) {
    let imageName;

    const { image } = file;
    imageName = Helper.getCurrentISODateString() + "_" + image.name;

    image.mv(Helper.getFormattedImageName(process.env.FILE_PATH, imageName), (err) => {
      if (err) {

      }
    });

    return imageName;
  }

  //#endregion
}

module.exports = new CompanyService();