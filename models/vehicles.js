const mongoose = require("mongoose");
 
const vehicleSchema = new mongoose.Schema({
  modelVehicle: { type: String, required: true },
  manufacturer: { type: String, required: true },
  yearVehicle: { type: Number, required: true, unique: true },
  horsePower: { type: String },
  licensePlate: { type: String },
  lastMaintenanceDate: {type: Date }
});
 
const Vehicle = mongoose.model("vehicles", vehicleSchema);
 
module.exports = Vehicle;