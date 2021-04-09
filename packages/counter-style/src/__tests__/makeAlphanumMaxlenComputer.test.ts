import makeAlphanumMaxlenComputer from '../makeAlphanumMaxlenComputer';

describe('makeAlphanumMaxlenComputer', () => {
  it('should work in numeric mode', () => {
    const base10MaxLenComputer = makeAlphanumMaxlenComputer(10, false);
    expect(base10MaxLenComputer(0, 9)).toBe(1);
    expect(base10MaxLenComputer(0, 10)).toBe(2);
    expect(base10MaxLenComputer(0, 1000)).toBe(4);
  });
  it('should work in alphabetic mode', () => {
    // "A, B, C"
    const base3MaxLenComputer = makeAlphanumMaxlenComputer(3, true);
    expect(base3MaxLenComputer(0, 1)).toBe(1);
    expect(base3MaxLenComputer(0, 2)).toBe(1);
    expect(base3MaxLenComputer(0, 3)).toBe(1);
    expect(base3MaxLenComputer(0, 4)).toBe(2);
    expect(base3MaxLenComputer(0, 3 * 3 + 1)).toBe(3);
    expect(base3MaxLenComputer(0, 3 * 3 * 3 + 1)).toBe(4);
  });
});
