import { CJK_SUFFIX } from '../constants';
import japaneseFormal from '../presets/japaneseFormal';

test('arabic indic', () => {
  const counter = japaneseFormal.withSuffix(null);
  expect(counter.render(0)).toBe('零');
  expect(counter.render(9000)).toBe('九阡');
  expect(counter.render(10000)).toBe('一〇〇〇〇' + CJK_SUFFIX);
});
