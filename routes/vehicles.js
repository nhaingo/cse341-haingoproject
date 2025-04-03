const express = require('express');
const router = express.Router();


const vehicleController = require('../controllers/vehicles');
const validation = require('../middleware/validate')

router.get('/', vehicleController.getAll);

router.get('/:id', vehicleController.getSingle);

router.post('/', validation.saveVehicle, vehicleController.createVehicle);

router.put('/:id', validation.saveVehicle, vehicleController.updateVehicle);

router.delete('/:id', vehicleController.deleteVehicle);

module.exports = router;