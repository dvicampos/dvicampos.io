const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');

router.post('/eliminar/:id', async (req, res) => {
  try {
    const tareaEliminada = await Tarea.findByIdAndRemove(req.params.id);
    if (!tareaEliminada) {
      return res.status(404).send('Tarea no encontrada');
    }
    res.redirect('/');
  } catch (err) {
    console.error('Error al eliminar la tarea:', err);
    res.status(500).send('Error interno del servidor');
  }
});

router.post('/crear', async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const nuevaTarea = new Tarea({ titulo, descripcion, completada: false });
    await nuevaTarea.save();
    res.redirect('/'); 
  } catch (err) {
    console.error('Error al crear una nueva tarea:', err);
    res.status(500).send('Error interno del servidor');
  }
});


router.get('/editar/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).send('Tarea no encontrada');
    }
    res.render('editar', { tarea });
  } catch (err) {
    console.error('Error al editar la tarea:', err);
    res.status(500).send('Error interno del servidor');
  }
});

router.post('/actualizar/:id', async (req, res) => {
  try {
    const { titulo, descripcion, completada } = req.body;
    const tareaActualizada = await Tarea.findByIdAndUpdate(req.params.id, {
      titulo,
      descripcion,
      completada: !!completada,
    });
    if (!tareaActualizada) {
      return res.status(404).send('Tarea no encontrada');
    }
    res.redirect('/');
  } catch (err) {
    console.error('Error al actualizar la tarea:', err);
    res.status(500).send('Error interno del servidor');
  }
});


module.exports = router;