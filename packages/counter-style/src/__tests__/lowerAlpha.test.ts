import lowerAlpha from '../presets/lowerAlpha';

test('lowerAlpha', () => {
  const counter = lowerAlpha.withSuffix(null);
  expect(counter.renderMarker(1)).toBe('a');
  expect(counter.renderMarker(27)).toBe('aa');
  expect(counter.renderMarker(0)).toBe('0');
});
