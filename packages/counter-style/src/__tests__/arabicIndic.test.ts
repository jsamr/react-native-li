import arabicIndic from '../presets/arabicIndic';

test('arabic indic', () => {
  const counter = arabicIndic.withSuffix(null);
  expect(counter.render(0)).toBe('٠');
  expect(counter.render(10)).toBe('١٠');
  expect(counter.render(20)).toBe('٢٠');
  expect(counter.render(300)).toBe('٣٠٠');
  expect(counter.render(4000)).toBe('٤٠٠٠');
  expect(counter.render(-5)).toBe('-٥');
});
