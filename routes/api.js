const express = require('express');
const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler');
const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const input = req.query.input;
  
  if (!input) return res.send('invalid number and unit');

  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  if (initNum === 'invalid number' && initUnit === 'invalid unit') {
    return res.send('invalid number and unit');
  }
  if (initNum === 'invalid number') {
    return res.send('invalid number');
  }
  if (initUnit === 'invalid unit') {
    return res.send('invalid unit');
  }

  const returnNum = convertHandler.convert(initNum, initUnit);
  const returnUnit = convertHandler.getReturnUnit(initUnit);

  res.json({
    initNum: initNum,
    initUnit: initUnit,
    returnNum: returnNum,
    returnUnit: returnUnit,
    string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
  });
});

module.exports = router;

module.exports = router;
