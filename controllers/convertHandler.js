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
    const unitMatch = input.match(/[a-zA-Z]+/);
    if (!unitMatch) return 'invalid unit';
    
    let unit = unitMatch[0].toLowerCase();
    if (unit === 'l') unit = 'L';
    
    return validUnits.includes(unit.toLowerCase()) ? unit : 'invalid unit';
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
    const unitMap = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return unitMap[unit] || 'invalid unit';
  };

  this.convert = function(initNum, initUnit) {
    const rates = {
      'gal': 3.78541,
      'l': 1/3.78541,
      'mi': 1.60934,
      'km': 1/1.60934,
      'lbs': 0.453592,
      'kg': 1/0.453592
    };
    
    const rate = rates[initUnit.toLowerCase()];
    if (!rate) return 'invalid unit';
    
    return parseFloat((initNum * rate).toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
