// models/planModel.js
const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  nombreplan: String,
  tipo: String,
  persona: String,
  fecha: Date,
});

module.exports = mongoose.model('Plan', planSchema);
    