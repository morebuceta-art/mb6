const express = require('express');
const router = express.Router(); // <-- Esta línea faltaba
const ConvertHandler = require('../controllers/convertHandler');
const convertHandler = new ConvertHandler();

// Ruta GET /api/convert
router.get('/convert', (req, res) => {
  const input = req.query.input;
  
  if (!input) return res.send('invalid number and unit');

  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  // Manejo de errores
  if (initNum === 'invalid number' && initUnit === 'invalid unit') {
    return res.send('invalid number and unit');
  }
  if (initNum === 'invalid number') {
    return res.send('invalid number');
  }
  if (initUnit === 'invalid unit') {
    return res.send('invalid unit');
  }

  // Normalización de unidades
  const formattedInitUnit = initUnit.toLowerCase() === 'l' ? 'L' : initUnit.toLowerCase();
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const formattedReturnUnit = returnUnit.toLowerCase() === 'l' ? 'L' : returnUnit.toLowerCase();

  const returnNum = convertHandler.convert(initNum, initUnit);

  res.json({
    initNum,
    initUnit: formattedInitUnit,
    returnNum,
    returnUnit: formattedReturnUnit,
    string: convertHandler.getString(initNum, formattedInitUnit, returnNum, formattedReturnUnit)
  });
});

module.exports = router; // <-- Exportar el router
