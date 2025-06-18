'use strict';
const express = require('express');
const cors = require('cors');
const app = express();

// Configuración básica
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Frontend
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use(express.static(__dirname + '/public'));

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).type('text').send('Not Found');
});

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
}
