router.get('/convert', (req, res) => {
  const input = req.query.input;
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  // Manejo de errores (igual que antes)
  if (initNum === 'invalid number' && initUnit === 'invalid unit') {
    return res.send('invalid number and unit');
  }
  if (initNum === 'invalid number') {
    return res.send('invalid number');
  }
  if (initUnit === 'invalid unit') {
    return res.send('invalid unit');
  }

  // NORMALIZACIÓN DE UNIDADES (AÑADE ESTO)
  const formattedInitUnit = initUnit.toLowerCase() === 'l' ? 'L' : initUnit.toLowerCase();
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const formattedReturnUnit = returnUnit.toLowerCase() === 'l' ? 'L' : returnUnit.toLowerCase();

  const returnNum = convertHandler.convert(initNum, initUnit);
  
  res.json({
    initNum,
    initUnit: formattedInitUnit, // Usa la versión normalizada
    returnNum,
    returnUnit: formattedReturnUnit, // Usa la versión normalizada
    string: convertHandler.getString(initNum, formattedInitUnit, returnNum, formattedReturnUnit)
  });
});
