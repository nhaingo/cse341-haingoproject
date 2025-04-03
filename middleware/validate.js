const validator = require('../helpers/validate');

const saveDriver = (req, res, next) => {
    const validationRule = {
      firstName: 'required|string',
      lastName: 'required|string',
      phoneNumber: 'required|string|regex:/^\\(\\d{3}\\)\\d{3}-\\d{4}$/',
      address: 'required|string',
      licenseNumber: 'required|string|regex:/^[A-Z0-9-]{6,12}$/',
      experienceYears: 'required|numeric|min:1',
      email: 'email'
    };
  
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const saveVehicle = (req, res, next) => {
    const validationRule = {
      modelVehicle: 'required|string',
      manufacturer: 'required|string',
      yearVehicle: 'required|numeric|regex:/^\\d{4}$/', // Years 1900-2099
      horsePower: 'required|numeric|min:1|max:2000',
      licensePlate: 'required|string|regex:/^[A-Z0-9-]{6,12}$/', // 1-10 alphanumeric characters, fixed space
      lastMaintenanceDate: 'required|string|regex:/^\\d{4}-\\d{2}-\\d{2}$/' // YYYY-MM-DD format, fixed escaping
    };
  
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
  saveDriver, saveVehicle
};