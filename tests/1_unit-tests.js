const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler();

describe('Unit Tests', function() {
  // Test 1: Lectura de números enteros
  it('convertHandler should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  // Test 2: Lectura de números decimales
  it('convertHandler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('3.2mi'), 3.2);
  });

  // Test 3: Lectura de fracciones
  it('convertHandler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('1/2kg'), 0.5);
  });

  // Test 4: Lectura de fracciones decimales
  it('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('2.5/5km'), 0.5);
  });

  // Test 5: Error en fracción doble
  it('convertHandler should correctly return an error on a double-fraction', function() {
    assert.equal(convertHandler.getNum('3/2/3gal'), 'invalid number');
  });

  // Test 6: Valor por defecto 1
  it('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('lbs'), 1);
  });

  // Test 7: Lectura de unidades válidas
  it('convertHandler should correctly read each valid input unit', function() {
    assert.equal(convertHandler.getUnit('32gal'), 'gal');
    assert.equal(convertHandler.getUnit('32L'), 'L');
    assert.equal(convertHandler.getUnit('32mi'), 'mi');
    assert.equal(convertHandler.getUnit('32km'), 'km');
    assert.equal(convertHandler.getUnit('32lbs'), 'lbs');
    assert.equal(convertHandler.getUnit('32kg'), 'kg');
  });

  // Test 8: Error en unidad inválida
  it('convertHandler should correctly return an error for an invalid input unit', function() {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });

  // Test 9: Retorno de unidad correcta
  it('convertHandler should return the correct return unit for each valid input unit', function() {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  // Test 10: Escritura correcta de unidades
  it('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  // Test 11: Conversión gal a L
  it('convertHandler should correctly convert gal to L', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
  });

  // Test 12: Conversión L a gal
  it('convertHandler should correctly convert L to gal', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
  });

  // Test 13: Conversión mi a km
  it('convertHandler should correctly convert mi to km', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
  });

  // Test 14: Conversión km a mi
  it('convertHandler should correctly convert km to mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
  });

  // Test 15: Conversión lbs a kg
  it('convertHandler should correctly convert lbs to kg', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.00001);
  });

  // Test 16: Conversión kg a lbs
  it('convertHandler should correctly convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
  });
});
