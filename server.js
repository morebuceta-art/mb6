const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api.js');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Rutas API
app.use('/api', apiRoutes);

// Middleware para errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

module.exports = app; // Para testing

// Solo inicia el servidor si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
