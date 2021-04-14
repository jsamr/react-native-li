import { CJK_SUFFIX } from '../constants';
import japaneseFormal from '../presets/japaneseFormal';

test('Japanese formal', () => {
  const counter = japaneseFormal;
  expect(counter.renderMarker(0)).toBe('零' + CJK_SUFFIX);
  expect(counter.renderMarker(9000)).toBe('九阡' + CJK_SUFFIX);
  expect(counter.maxCounterLenInRange(9000, 9000)).toBe(2);
  expect(counter.renderMarker(10000)).toBe('一〇〇〇〇' + CJK_SUFFIX);
});
