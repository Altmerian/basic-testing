import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    expect(result).toBe(3);
  }, 30000);

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: Action.Subtract });
    expect(result).toBe(3);
  }, 30000);

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 4, action: Action.Multiply });
    expect(result).toBe(12);
  }, 30000);

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 2, action: Action.Divide });
    expect(result).toBe(5);
  }, 30000);

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  }, 30000);

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 1, b: 2, action: 'invalid' });
    expect(result).toBeNull();
  }, 30000);

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 'invalid', b: 2, action: Action.Add });
    expect(result).toBeNull();
  }, 30000);
});
