import lowerAlpha from '../presets/lowerAlpha';

test('lowerAlpha', () => {
  const counter = lowerAlpha.withSuffix(null);
  expect(counter.render(1)).toBe('a');
  expect(counter.render(27)).toBe('aa');
  expect(counter.render(0)).toBe('0. ');
});
