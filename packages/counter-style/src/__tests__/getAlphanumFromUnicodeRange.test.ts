import getAlphanumFromUnicodeRange from '../getAlphanumFromUnicodeRange';

describe('getAlphanumFromUnicodeRange', () => {
  it('should support alphabetic mode', () => {
    expect(getAlphanumFromUnicodeRange(1, 97, 26, true)).toEqual('a');
    expect(getAlphanumFromUnicodeRange(2, 97, 26, true)).toEqual('b');
    expect(getAlphanumFromUnicodeRange(1 + 26, 97, 26, true)).toEqual('aa');
    expect(getAlphanumFromUnicodeRange(1 + 26 * 8, 97, 26, true)).toEqual('ha');
    expect(getAlphanumFromUnicodeRange(1 + 27, 97, 26, true)).toEqual('ab');
    expect(getAlphanumFromUnicodeRange(1 + 26 * 2 + 2, 97, 26, true)).toEqual(
      'bc'
    );
    expect(getAlphanumFromUnicodeRange(1 + 26 * 27, 97, 26, true)).toEqual(
      'aaa'
    );
  });
  it('should support numeric mode', () => {
    expect(getAlphanumFromUnicodeRange(0, 48, 10, false)).toEqual('0');
    expect(getAlphanumFromUnicodeRange(1, 48, 10, false)).toEqual('1');
    expect(getAlphanumFromUnicodeRange(2, 48, 10, false)).toEqual('2');
    expect(getAlphanumFromUnicodeRange(10000, 48, 10, false)).toEqual('10000');
  });
});
