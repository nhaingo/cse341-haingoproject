const express = require('express');
const router = express.Router();


const driverController = require('../controllers/drivers');
const validation = require('../middleware/validate')

router.get('/', driverController.getAll);

router.get('/:id', driverController.getSingle);

router.post('/', validation.saveDriver, driverController.createDriver);

router.put('/:id', validation.saveDriver, driverController.updateDriver);

router.delete('/:id', driverController.deleteDriver);

module.exports = router;