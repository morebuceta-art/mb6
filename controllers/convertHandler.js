const convertHandler = {
  getNum(input) {
    if (!input) return 1;
    const numRegex = /^(\d+\.?\d*|\d*\.?\d+)(?:\/(\d+\.?\d*|\d*\.?\d+))?/;
    const match = input.match(numRegex);
    
    if (!match) return 1;
    
    // Handle double fractions
    if ((input.match(/\//g) || []).length > 1) return 'invalid number';
    
    if (match[2]) {
      return parseFloat(match[1]) / parseFloat(match[2]);
    }
    return parseFloat(match[0]) || 1;
  },

  getUnit(input) {
    const validUnits = ['gal','l','mi','km','lbs','kg'];
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    
    if (!match) return 'invalid unit';
    
    let unit = match[0].toLowerCase();
    if (unit === 'l') unit = 'L';
    
    return validUnits.includes(unit) ? unit : 'invalid unit';
  },

  getReturnUnit(initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    return unitMap[initUnit];
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
    const conversions = {
      gal: 3.78541,
      L: 1/3.78541,
      mi: 1.60934,
      km: 1/1.60934,
      lbs: 0.453592,
      kg: 1/0.453592
    };
    
    const result = initNum * conversions[initUnit];
    return parseFloat(result.toFixed(5));
  },

  getString(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  }
};
