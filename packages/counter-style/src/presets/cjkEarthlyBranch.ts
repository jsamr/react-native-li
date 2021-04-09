import { CJK_SUFFIX } from '../constants';
import CounterStyle from '../CounterStyle';

const cjkEarthlyBranch = CounterStyle.fixed(
  /* 子 丑 寅 卯 辰 巳 午 未 申 酉 戌 亥 */
  '\u5B50',
  '\u4E11',
  '\u5BC5',
  '\u536F',
  '\u8FB0',
  '\u5DF3',
  '\u5348',
  '\u672A',
  '\u7533',
  '\u9149',
  '\u620C',
  '\u4EA5'
).withSuffix(CJK_SUFFIX);

export default cjkEarthlyBranch;
