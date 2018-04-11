/*
 * This is an example Jest test case
 */

describe('Example Test', () => {
  test('Example Test 1', () => {
    expect(2 > 1).toBeTruthy();
  });
  test('Example Test 2', () => {
    expect(2 < 1).toBeFalsy();
  });
  test('Example Test 3', () => {
    const num = 1;
    expect(num.toString()).toBe('1');
  });
});
