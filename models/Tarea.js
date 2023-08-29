// models/Tarea.js
const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  completada: Boolean,
});

module.exports = mongoose.model('Tarea', tareaSchema);
