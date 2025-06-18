router.get('/convert', (req, res) => {
  const input = req.query.input;
  if (!input) return res.send('invalid number and unit');
  
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  // Manejo de errores exacto
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
  
  // Asegurar formato de unidades (L mayúscula, resto minúsculas)
  const formattedInitUnit = initUnit.toLowerCase() === 'l' ? 'L' : initUnit.toLowerCase();
  const formattedReturnUnit = returnUnit.toLowerCase() === 'l' ? 'L' : returnUnit.toLowerCase();
  
  res.json({
    initNum: initNum,
    initUnit: formattedInitUnit,
    returnNum: returnNum,
    returnUnit: formattedReturnUnit,
    string: convertHandler.getString(initNum, formattedInitUnit, returnNum, formattedReturnUnit)
  });
});
