
const express = require('express');
const router = express.Router();
const convertHandler = require('../controllers/convertHandler');

router.get('/convert', (req, res) => {
  const input = req.query.input;
  
  if (!input) {
    return res.status(400).json({ error: 'No input provided' });
  }

  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  // Manejo de errores
  if (initNum === 'invalid number' && initUnit === 'invalid unit') {
    return res.json({ error: 'invalid number and unit' });
  }
  if (initNum === 'invalid number') {
    return res.json({ error: 'invalid number' });
  }
  if (initUnit === 'invalid unit') {
    return res.json({ error: 'invalid unit' });
  }

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
