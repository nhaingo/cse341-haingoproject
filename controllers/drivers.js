const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Drivers']
    try {
        const result = await mongodb.getDatabase().db().collection('drivers').find();
        const drivers = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            message: 'Drivers retrieved successfully',
            data: drivers
          });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error while retrieving drivers' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Drivers']
    try {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid driver id to find a driver');
      }
      const driverId = new ObjectId(req.params.id);
  
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('drivers')
        .findOne({ _id: driverId }); 
  
      if (!result) {
        return res.status(404).json({ error: 'Driver not found' });
      }
  
      const driverName = `${result.firstName} ${result.lastName}`; // Construct full name from driver data
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({
        success: true,
        message: `Driver ${driverName} retrieved successfully`,
        data: result
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error while retrieving driver' });
    }
  };

const createDriver = async (req, res) => {
    //#swagger.tags=['Drivers']
    try {
        // Basic validation
        if (!req.body.firstName || !req.body.lastName || !req.body.licenseNumber) {
            return res.status(400).json({ error: 'Missing required fields: firstName, lastName, and licenseNumber are required' });
        }

        const driver = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            licenseNumber: req.body.licenseNumber,
            experienceYears: req.body.experienceYears,
            email: req.body.email
        };
        
        const response = await mongodb.getDatabase().db().collection('drivers').insertOne(driver);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: 'Failed to create driver in database' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error while creating driver' });
    }
};

const updateDriver = async (req, res) => {
    //#swagger.tags=['Drivers']
    try {
      if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid driver id to update a driver.'); // Added return
      }
      const driverId = new ObjectId(req.params.id);
  
      const driver = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        licenseNumber: req.body.licenseNumber,
        experienceYears: req.body.experienceYears,
        email: req.body.email
      };
  
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('drivers')
        .replaceOne({ _id: driverId }, driver);
      console.log(response);
  
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Driver not found or no changes made' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error while updating driver' });
    }
  };

  const deleteDriver = async (req, res) => {
    //#swagger.tags=['Drivers']
    try {
      let driverId;
      try {
        driverId = new ObjectId(req.params.id);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid driver ID format' });
      }
  
      // Fetch the driver to get the name before deletion
      const driver = await mongodb
        .getDatabase()
        .db()
        .collection('drivers')
        .findOne({ _id: driverId });
  
      if (!driver) {
        return res.status(404).json({ error: 'Driver not found' });
      }
  
      const driverName = `${driver.firstName} ${driver.lastName}`; 
  
      // Perform the deletion
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('drivers')
        .deleteOne({ _id: driverId });
  
      if (response.deletedCount > 0) {
        res.status(200).json({
          success: true,
          message: `Driver ${driverName} successfully deleted`
        });
      } else {
        // only for consistency
        res.status(404).json({ error: 'Driver not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error while deleting driver' });
    }
  };
module.exports = { getAll, getSingle, createDriver, updateDriver, deleteDriver };


/*const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Drivers']
    const result = await mongodb.getDatabase().db().collection('drivers').find();
    result.toArray().then((drivers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(drivers)

    })  
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Drivers']
    const driverId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('drivers').find({_id: driverId});
    result.toArray().then((drivers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(drivers[0])
    });
};

const createDriver = async (req, res) => {
    //#swagger.tags=['Drivers]
    console.log('Request body:', req.body);
    const driver = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    licenseNumber: req.body.licenseNumber,
    experienceYears: req.body.experienceYears
    };
    const response = await mongodb.getDatabase().db().collection('drivers').insertOne(driver);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the driver.');
    }
};

const updateDriver = async (req, res) => {
    //#swagger.tags=['Drivers']
    const driverId = new ObjectId(req.params.id);
    const driver = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        licenseNumber: req.body.licenseNumber,
        experienceYears: req.body.experienceYears
    };
    const response = await mongodb.getDatabase().db().collection('drivers').replaceOne({_id: driverId}, driver);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the driver.');
    }
};

const deleteDriver = async (req, res) => {
    //#swagger.tags=['Drivers']
    const driverId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('drivers').deleteOne({_id: driverId});
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the driver.');
    }
};

module.exports ={ getAll, getSingle, createDriver, updateDriver, deleteDriver};*/
