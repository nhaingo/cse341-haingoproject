const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Temples']
    const result = await mongodb.getDatabase().db().collection('temples').find();
    result.toArray().then((temples) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(temples)

    })  
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Temples']
    const templeId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('temples').find({_id: templeId});
    result.toArray().then((temples) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(temples[0])
    });
};

const createTemple = async (req, res) => {
    //#swagger.tags=['Temples]
    console.log('Request body:', req.body);
    const temple = {
    temple_id: req.body.temple_id,
    additionalInfo: req.body.additionalInfo,
    name: req.body.name,
    location: req.body.location,
    dedicated: req.body.dedicated
    };
    const response = await mongodb.getDatabase().db().collection('temples').insertOne(temple);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the temple.');
    }
};

const updateTemple = async (req, res) => {
    //#swagger.tags=['temples]
    const templeId = new ObjectId(req.params.id);
    const temple = {
    temple_id: req.body.temple_id,
    additionalInfo: req.body.additionalInfo,
    name: req.body.name,
    location: req.body.location,
    dedicated: req.body.dedicated
    };
    const response = await mongodb.getDatabase().db().collection('temples').replaceOne({_id: templeId}, temple);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the temple.');
    }
};

const deleteTemple = async (req, res) => {
    //#swagger.tags=['Temples']
    const templeId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('temples').deleteOne({_id: templeId});
    if (response.deleteCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the temple.');
    }
};

module.exports ={ getAll, getSingle, createTemple, updateTemple, deleteTemple};
