// routes/planRoutes.js
const express = require('express');
const router = express.Router();
const Plan = require('../models/planModel');

router.get('/', async (req, res) => {
  try {
    const planes = await Plan.find();
    res.render('plan', { planes }); // Updated to use 'plan.ejs'
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', async (req, res) => {
  try {
    const newPlan = new Plan(req.body);
    await newPlan.save();
    res.redirect('/planes');
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/edit/:id', async (req, res) => {
    try {
      const plan = await Plan.findById(req.params.id);
      if (!plan) {
        return res.status(404).send('Tarea no encontrada');
      }
      res.render('edit', { plan });
    } catch (err) {
      console.error('Error al editar la tarea:', err);
      res.status(500).send('Error interno del servidor');
    }
  });
  
  router.post('/actualizar/:id', async (req, res) => {
    try {
      const { nombreplan, tipo, persona ,fecha } = req.body;
      const planActualizada = await Plan.findByIdAndUpdate(req.params.id, {
        nombreplan,
        tipo,
        persona,
        fecha
      });
      if (!planActualizada) {
        return res.status(404).send('plan no encontrada');
      }
      res.redirect('/planes');
    } catch (err) {
      console.error('Error al actualizar la plan:', err);
      res.status(500).send('Error interno del servidor');
    }
  });
  
  router.post('/eliminar/:id', async (req, res) => {
    try {
      const planEliminada = await Plan.findByIdAndRemove(req.params.id);
      if (!planEliminada) {
        return res.status(404).send('plan no encontrada');
      }
      res.redirect('/planes');
    } catch (err) {
      console.error('Error al eliminar la plan:', err);
      res.status(500).send('Error interno del servidor');
    }
  });

module.exports = router;
