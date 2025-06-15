const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  department: String,
  salary: Number,
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);