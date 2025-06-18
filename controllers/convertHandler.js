const convertHandler = {
  getNum(input) {
    if (!input) return 1;
    
    const numRegex = /^([\d.\/]+)/;
    const match = input.match(numRegex);
    
    if (!match) return 1;
    
    const numStr = match[0];
    if ((numStr.match(/\//g) || []).length > 1) return 'invalid number';
    
    const parts = numStr.split('/');
    if (parts.length === 2) {
      const num1 = parseFloat(parts[0]);
      const num2 = parseFloat(parts[1]);
      return isNaN(num1) || isNaN(num2) ? 'invalid number' : num1 / num2;
    }
    
    const num = parseFloat(numStr);
    return isNaN(num) ? 'invalid number' : num;
  },

  getUnit(input) {
    const validUnits = ['gal','l','mi','km','lbs','kg'];
    const unitRegex = /[a-zA-Z]+$/;
    const match = input.match(unitRegex);
    
    if (!match) return 'invalid unit';
    
    let unit = match[0].toLowerCase();
    return validUnits.includes(unit) ? (unit === 'l' ? 'L' : unit) : 'invalid unit';
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
    return unitMap[initUnit] || 'invalid unit';
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
    return unitNames[unit] || 'invalid unit';
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
    
    return parseFloat((initNum * conversions[initUnit]).toFixed(5));
  },

  getString(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  }
};

module.exports = convertHandler;
