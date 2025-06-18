const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler');
const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const input = req.query.input;
  
  if (input === undefined || input === '') {
    return res.send('invalid number and unit');
  }

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

  const formattedInitUnit = initUnit.toLowerCase() === 'l' ? 'L' : initUnit.toLowerCase();
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const formattedReturnUnit = returnUnit.toLowerCase() === 'l' ? 'L' : returnUnit.toLowerCase();

  const returnNum = convertHandler.convert(initNum, initUnit);

  res.json({
    initNum: initNum === 1 && !input.match(/\d/) ? 1 : initNum,
    initUnit: formattedInitUnit,
    returnNum: returnNum,
    returnUnit: formattedReturnUnit,
    string: convertHandler.getString(
      initNum === 1 && !input.match(/\d/) ? 1 : initNum,
      formattedInitUnit,
      returnNum,
      formattedReturnUnit
    )
  });
});

module.exports = router;
