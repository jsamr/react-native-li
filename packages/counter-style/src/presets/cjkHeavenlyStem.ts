import { CJK_SUFFIX } from '../constants';
import CounterStyle from '../CounterStyle';

const cjkHeavenlyStem = CounterStyle.fixed(
  /* 甲 乙 丙 丁 戊 己 庚 辛 壬 癸 */
  '\u7532',
  '\u4E59',
  '\u4E19',
  '\u4E01',
  '\u620A',
  '\u5DF1',
  '\u5E9A',
  '\u8F9B',
  '\u58EC',
  '\u7678'
).withSuffix(CJK_SUFFIX);

export default cjkHeavenlyStem;
