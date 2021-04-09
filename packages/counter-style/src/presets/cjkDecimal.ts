import { CJK_SUFFIX } from '../constants';
import CounterStyle from '../CounterStyle';

const cjkDecimal = CounterStyle.numeric(
  /* 〇 一 二 三 四 五 六 七 八 九 */
  '\u3007',
  '\u4E00',
  '\u4E8C',
  '\u4E09',
  '\u56DB',
  '\u4E94',
  '\u516D',
  '\u4E03',
  '\u516B',
  '\u4E5D'
).withSuffix(CJK_SUFFIX);

export default cjkDecimal;
