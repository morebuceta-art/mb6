function ConvertHandler() {
  
  this.getNum = function(input) {
    if (!input) return 1;
    
    // Encontrar índice donde comienza la unidad
    const unitIndex = input.split('').findIndex(char => /[a-zA-Z]/.test(char));
    const numStr = unitIndex === -1 ? input : input.slice(0, unitIndex);

    if (!numStr) return 1;

    // Validar fracciones
    const fractions = numStr.split('/');
    if (fractions.length > 2) return 'invalid number';
    
    try {
      const num = fractions.length === 1 
        ? parseFloat(numStr) 
        : parseFloat(fractions[0]) / parseFloat(fractions[1]);
      return isNaN(num) ? 'invalid number' : num;
    } catch {
      return 'invalid number';
    }
  };

  this.getUnit = function(input) {
    if (!input) return 'invalid unit';
    
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const unitMatch = input.match(/[a-zA-Z]/);
    if (!unitMatch) return 'invalid unit';
    
    let unit = input.slice(unitMatch.index).toLowerCase();
    if (unit === 'l') unit = 'L';
    
    return validUnits.includes(unit.toLowerCase()) || unit === 'L' 
      ? unit 
      : 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    const unit = initUnit.toLowerCase();
    const conversions = {
      'gal': 'L',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return conversions[unit] || 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    const unitLower = unit.toLowerCase();
    const spellings = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spellings[unitLower] || 'invalid unit';
  };

  this.convert = function(initNum, initUnit) {
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return 'invalid number and unit';
    }
    if (initNum === 'invalid number') return initNum;
    if (initUnit === 'invalid unit') return initUnit;

    const conversionRates = {
      'gal': 3.78541,   // gal to L
      'l': 1/3.78541,   // L to gal
      'mi': 1.60934,    // mi to km
      'km': 1/1.60934,  // km to mi
      'lbs': 0.453592,  // lbs to kg
      'kg': 1/0.453592  // kg to lbs
    };

    const rate = conversionRates[initUnit.toLowerCase()];
    if (!rate) return 'invalid unit';
    
    const result = initNum * rate;
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
