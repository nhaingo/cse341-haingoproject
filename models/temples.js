const mongoose = require("mongoose");
 
const templeSchema = new mongoose.Schema(
  {
    temple_id: Number,
    name: String,
    location: String,
    dedicated: String,
    additionalInfo: Boolean,
  },
  { timestamps: true }
);
 
const Temple = mongoose.model("Temple", templeSchema, "Temple"); // Specify the collection name
 
module.exports = Temple;