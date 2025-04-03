const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Vehicles']
    try {
        const result = await mongodb.getDatabase().db().collection('vehicles').find();
        const vehicles = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            message: 'Vehicles retrieved successfully',
            data: vehicles
          });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error while retrieving vehicles' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Drivers']
    try {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid vehicle id to find a vehicle');
      }
      const vehicleId = new ObjectId(req.params.id);
  
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('vehicles')
        .findOne({ _id: vehicleId }); 
  
      if (!result) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
  
      const vehicle = `${result.modelVehicle}, ${result.licensePlate}`; // Construct full name from driver data
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({
        success: true,
        message: `Vehicle ${vehicle} retrieved successfully`,
        data: result
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error while retrieving driver' });
    }
  };

const createVehicle = async (req, res) => {
    //#swagger.tags=['Vehicles']
    try {
        // Basic validation
        if (!req.body.modelVehicle || !req.body.manufacturer || !req.body.licensePlate) {
            return res.status(400).json({ error: 'Missing required fields: modelVehicle, manufacturer, horsePower, licensePlate, and lastMaintenanceDate are required' });
        }

        const vehicle = {
            modelVehicle: req.body.modelVehicle,
            manufacturer: req.body.manufacturer,
            yearVehicle: req.body.yearVehicle,
            horsePower: req.body.horsePower,
            licensePlate: req.body.licensePlate,
            lastMaintenanceDate: req.body.lastMaintenanceDate
        };
        
        const response = await mongodb.getDatabase().db().collection('vehicles').insertOne(vehicle);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: 'Failed to create vehicle in database' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error while creating vehicle' });
    }
};

const updateVehicle = async (req, res) => {
    //#swagger.tags=['Vehicles']  
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid driver id to update a driver.'); // Added return
          }
        const vehicleId = new ObjectId(req.params.id);

        const vehicleModel = {
            modelVehicle: req.body.modelVehicle,
            manufacturer: req.body.manufacturer,
            yearVehicle: req.body.yearVehicle,
            horsePower: req.body.horsePower,
            licensePlate: req.body.licensePlate,
            lastMaintenanceDate: req.body.lastMaintenanceDate
        };
        
        const response = await mongodb
            .getDatabase()
            .db()
            .collection('vehicles')
            .replaceOne({ _id: vehicleId }, vehicleModel);
        console.log(response);

        if(!response) {
            return res.status(404).json({error: 'Vehicle not found or no change made'});
        }

        const vehicle = `${response.modelVehicle}, ${response.licensePlate}`; 
        
        if (response.modifiedCount > 0) {
       
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                success: true,
                message: `Vehicle ${vehicle} updated successfully`,
                data: response
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error while updating vehicle' });
    }
};

const deleteVehicle = async (req, res) => {
    //#swagger.tags=['Vehicles']  
    try {
        let vehicleId;
        try {
            vehicleId = new ObjectId(req.params.id);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid vehicle ID format' });
        }

        const response = await mongodb.getDatabase().db().collection('vehicles').deleteOne({ _id: vehicleId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Vehicle not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error while deleting vehicle' });
    }
};

module.exports = { getAll, getSingle, createVehicle, updateVehicle, deleteVehicle };

/*const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Vehicles']
    const result = await mongodb.getDatabase().db().collection('vehicles').find();
    result.toArray().then((vehicles) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(vehicles)

    })  
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Vehicles']
    const vehicleId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('vehicles').find({_id: vehicleId});
    result.toArray().then((vehicles) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(vehicles[0])
    });
};

const createVehicle = async (req, res) => {
    //#swagger.tags=['Vehicles']
    console.log('Request body:', req.body);
    const vehicle = {
    modelVehicle: req.body.modelVehicle,
    manufacturer: req.body.manufacturer,
    yearVehicle: req.body.yearVehicle,
    horsePower: req.body.horsePower,
    licensePlate: req.body.licensePlate,
    lastMaintenanceDate: req.body.lastMaintenanceDate
    };
    const response = await mongodb.getDatabase().db().collection('vehicles').insertOne(vehicle);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the vehicle.');
    }
};

const updateVehicle = async (req, res) => {
    //#swagger.tags=['Vehicles]
    const vehicleId = new ObjectId(req.params.id);
    const vehicle = {
        modelVehicle: req.body.modelVehicle,
        manufacturer: req.body.manufacturer,
        yearVehicle: req.body.yearVehicle,
        horsePower: req.body.horsePower,
        licensePlate: req.body.licensePlate,
        lastMaintenanceDate: req.body.lastMaintenanceDate
    };
    const response = await mongodb.getDatabase().db().collection('vehicles').replaceOne({_id: vehicleId}, vehicle);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the vehicle.');
    }
};

const deleteVehicle = async (req, res) => {
    //#swagger.tags=['Vehicles]
    const vehicleId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('vehicles').deleteOne({_id: vehicleId});
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the vehicle.');
    }
};

module.exports ={ getAll, getSingle, createVehicle, updateVehicle, deleteVehicle};*/
