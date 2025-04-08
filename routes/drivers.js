const express = require('express');
const router = express.Router();


const driverController = require('../controllers/drivers');
const { isAuthenticated } = require("../middleware/authenticate");
const validation = require('../middleware/validate');

router.get('/', driverController.getAll);

router.get('/:id', driverController.getSingle);

router.post('/', isAuthenticated, validation.saveDriver, driverController.createDriver);

router.put('/:id', isAuthenticated, validation.saveDriver, driverController.updateDriver);

router.delete('/:id', isAuthenticated, driverController.deleteDriver);

module.exports = router;