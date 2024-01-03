const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const config = require('./config');
require('dotenv').config();

const mongoURI = process.env.MONGOURI;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Server conectado a Mongo'))
  .catch(err => console.error('Error de conexión a MongoDB Atlas:', err));

const planRoutes = require('./routes/planRoutes');
app.use('/planes', planRoutes);

const Tarea = require('./models/Tarea');

const tareaRoutes = require('./routes/tarea');
app.use('/tareas', tareaRoutes);

app.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.render('index', { tareas });
  } catch (err) {
    console.error('Error al obtener tareas:', err);
    res.status(500).send('Error interno del servidor');
  }
});


app.use(express.static(__dirname + '/public'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en localhost:${PORT}`);
});
