function ConvertHandler() {
  this.getNum = function(input) {
    if (!input) return 1;
    
    const unitIndex = input.split('').findIndex(char => /[a-zA-Z]/.test(char));
    const numStr = unitIndex === -1 ? input : input.slice(0, unitIndex);

    if (!numStr) return 1;

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
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    const unit = initUnit.toLowerCase();
    let result;
    
    switch(unit) {
      case 'gal': result = initNum * galToL; break;
      case 'l': result = initNum / galToL; break;
      case 'mi': result = initNum * miToKm; break;
      case 'km': result = initNum / miToKm; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg': result = initNum / lbsToKg; break;
      default: return null;
    }
    
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
