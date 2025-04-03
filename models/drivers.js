const mongoose = require("mongoose");
 
const driverSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address: String,
    licenseNumber: String,
    experienceYears: Number
  }
);
 
const Driver = mongoose.model("Driver", driverSchema, "Driver"); // Specify the collection name
 
module.exports = Driver;