const express = require('express');
const router = express.Router();


const vehicleController = require('../controllers/vehicles');
const { isAuthenticated } = require("../middleware/authenticate");
const validation = require('../middleware/validate')

router.get('/', vehicleController.getAll);

router.get('/:id', vehicleController.getSingle);

router.post('/', isAuthenticated, validation.saveVehicle, vehicleController.createVehicle);

router.put('/:id', isAuthenticated, validation.saveVehicle, vehicleController.updateVehicle);

router.delete('/:id', isAuthenticated, vehicleController.deleteVehicle);

module.exports = router;