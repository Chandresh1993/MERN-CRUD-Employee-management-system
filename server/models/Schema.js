const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: Number,
    unique: true,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  department: {
    type: String,
  },
});

const employeeDetails = mongoose.model("employeeDetails", employeeSchema);

module.exports = employeeDetails;
