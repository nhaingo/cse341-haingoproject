const mongoose = require("mongoose");
 
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  favoriteColor: { type: String },
  birthday: { type: String },
});
 
const Contact = mongoose.model("contacts", contactSchema);
 
module.exports = Contact;