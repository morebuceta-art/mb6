'use strict';
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use((req, res) => {
  res.status(404).type('text').send('Not Found');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
