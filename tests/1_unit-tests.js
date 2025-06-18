const chai = require('chai');
const assert = chai.assert;
const convertHandler = require('../controllers/convertHandler.js');

suite('Unit Tests', function() {
  // getNum tests
  test('Whole number input', function() {
    assert.strictEqual(convertHandler.getNum('10L'), 10);
  });

  test('Decimal number input', function() {
    assert.strictEqual(convertHandler.getNum('5.5kg'), 5.5);
  });

  test('Fractional input', function() {
    assert.approximately(convertHandler.getNum('1/2mi'), 0.5, 0.001);
  });

  test('Fractional input with decimal', function() {
    assert.approximately(convertHandler.getNum('2.5/5km'), 0.5, 0.001);
  });

  test('Double fraction input', function() {
    assert.strictEqual(convertHandler.getNum('3/2/3lbs'), 'invalid number');
  });

  test('No numerical input', function() {
    assert.strictEqual(convertHandler.getNum('kg'), 1);
  });

  // getUnit tests
  test('Valid input unit', function() {
    assert.strictEqual(convertHandler.getUnit('10L'), 'L');
    assert.strictEqual(convertHandler.getUnit('5.5kg'), 'kg');
    assert.strictEqual(convertHandler.getUnit('1/2mi'), 'mi');
  });

  test('Invalid input unit', function() {
    assert.strictEqual(convertHandler.getUnit('10g'), 'invalid unit');
  });

  // getReturnUnit tests
  test('Return unit for valid input unit', function() {
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
    assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  // spellOutUnit tests
  test('Spelled-out string unit', function() {
    assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
    assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
    assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  // Conversion tests
  test('Convert gal to L', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.001);
  });

  test('Convert L to gal', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.001);
  });

  test('Convert mi to km', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.001);
  });

  test('Convert km to mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.001);
  });

  test('Convert lbs to kg', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.001);
  });

  test('Convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.001);
  });
});
