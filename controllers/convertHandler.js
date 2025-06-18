const ConvertHandler = function() {
  // ... (mantén tus otras funciones igual)

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592; // Ajustado a 6 decimales
    const miToKm = 1.60934;  // Ajustado a 5 decimales
    
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
    
    // Redondeo a exactamente 5 decimales
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // Formato exacto que espera freeCodeCamp
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
};
