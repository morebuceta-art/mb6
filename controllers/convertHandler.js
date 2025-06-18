const convertHandler = {
  getNum(input) {
    if (!input) return 1;
    
    // Regex mejorado para números
    const numRegex = /^([\d.\/]+)/;
    const match = input.match(numRegex);
    
    if (!match) return 1;
    
    const numStr = match[0];
    // Verificar fracciones dobles
    if ((numStr.match(/\//g) || []).length > 1) return 'invalid number';
    
    // Evaluar fracciones y decimales
    const parts = numStr.split('/');
    if (parts.length === 2) {
      const num1 = parseFloat(parts[0]);
      const num2 = parseFloat(parts[1]);
      if (isNaN(num1) || isNaN(num2)) return 'invalid number';
      return num1 / num2;
    }
    
    const num = parseFloat(numStr);
    return isNaN(num) ? 'invalid number' : num;
  },

  getUnit(input) {
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    
    if (!match) return 'invalid unit';
    
    const unit = match[0].toLowerCase();
    // Liter siempre en mayúscula
    if (unit === 'l') return 'L';
    
    return validUnits.includes(unit) ? unit : 'invalid unit';
  },

  getReturnUnit(initUnit) {
    const unitPairs = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return unitPairs[initUnit.toLowerCase()] || 'invalid unit';
  },

  spellOutUnit(unit) {
    const unitNames = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    return unitNames[unit.toLowerCase()] || 'invalid unit';
  },

  convert(initNum, initUnit) {
    const conversions = {
      gal: 3.78541,
      l: 3.78541, // Para manejar 'l' en minúscula
      mi: 1.60934,
      km: 0.621371,
      lbs: 0.453592,
      kg: 2.20462
    };
    
    const unit = initUnit.toLowerCase();
    const result = initNum * conversions[unit];
    return parseFloat(result.toFixed(5));
  },

  getString(initNum, initUnit, returnNum, returnUnit) {
    return {
      initNum,
      initUnit: initUnit === 'l' ? 'L' : initUnit, // Asegurar 'L' mayúscula
      returnNum,
      returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    };
  }
};
