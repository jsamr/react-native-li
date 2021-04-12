import { DEFAULT_SUFFIX } from '../constants';
import arabicIndic from '../presets/arabicIndic';

test('arabic indic', () => {
  const counter = arabicIndic;
  expect(counter.renderCounter(0)).toBe('٠');
  expect(counter.renderCounter(10)).toBe('١٠');
  expect(counter.renderCounter(20)).toBe('٢٠');
  expect(counter.renderCounter(300)).toBe('٣٠٠');
  expect(counter.renderCounter(4000)).toBe('٤٠٠٠');
  expect(counter.renderCounter(-5)).toBe('-٥');
  expect(counter.renderMarker(20)).toBe('٢٠' + DEFAULT_SUFFIX);
});
