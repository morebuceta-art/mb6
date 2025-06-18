const express = require('express');
const ConvertHandler = require('../controllers/convertHandler.js');
const router = express.Router();
const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const input = req.query.input;
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  // Manejo de errores (DEVUELVE STRINGS DIRECTAMENTE)
  if (initNum === 'invalid number' && initUnit === 'invalid unit') {
    return res.send('invalid number and unit');
  }
  if (initNum === 'invalid number') {
    return res.send('invalid number');
  }
  if (initUnit === 'invalid unit') {
    return res.send('invalid unit');
  }

  // Caso válido (devuelve objeto JSON)
  const returnNum = convertHandler.convert(initNum, initUnit);
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

  res.json({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string
  });
});

module.exports = router;
