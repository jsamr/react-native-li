import codepointLength from '../utils/codepointLength';

describe('getAlphanumFromUnicodeRange', () => {
  it('should handle null and undefined values', () => {
    expect(codepointLength(null)).toBe(0);
  });
  it('should handle multi-units UTF-16 codepoints', () => {
    expect(codepointLength('👍')).toBe(1);
  });
});
