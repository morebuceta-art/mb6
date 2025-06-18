const convertHandler = {
  getNum(input) {
    if (!input) return 1;
    
    // Busca números en el input (enteros, decimales o fracciones)
    const numRegex = /^(\d+\.?\d*|\d*\.?\d+)(?:\/(\d+\.?\d*|\d*\.?\d+))?/;
    const match = input.match(numRegex);
    
    if (!match) return 1; // Si no encuentra número, devuelve 1 por defecto
    
    // Si es una fracción (tiene /)
    if (match[2]) {
      if (match[0].includes('/') && match[0].match(/\//g).length > 1) {
        return 'invalid number'; // Doble fracción
      }
      return parseFloat(match[1]) / parseFloat(match[2]);
    }
    
    return parseFloat(match[0]) || 1;
  },

  getUnit(input) {
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    
    if (!match) return 'invalid unit';
    
    const unit = match[0].toLowerCase();
    
    // Caso especial para litros (puede venir como L o l)
    if (unit === 'l') return 'L';
    
    return units.includes(unit) ? unit : 'invalid unit';
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
    return unitPairs[initUnit];
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
    return unitNames[unit];
  },

  convert(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    switch (initUnit) {
      case 'gal':
        return initNum * galToL;
      case 'L':
        return initNum / galToL;
      case 'mi':
        return initNum * miToKm;
      case 'km':
        return initNum / miToKm;
      case 'lbs':
        return initNum * lbsToKg;
      case 'kg':
        return initNum / lbsToKg;
      default:
        return NaN;
    }
  },

  getString(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${returnNum.toFixed(5)} ${returnUnitString}`;
  }
};

module.exports = convertHandler;
