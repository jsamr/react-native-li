import { CJK_SUFFIX } from '../constants';
import CounterStyle from '../CounterStyle';
import cjkDecimal from './cjkDecimal';

const japaneseFormal = CounterStyle.additive({
  /* 9000 九阡, 8000 八阡, 7000 七阡, 6000 六阡, 5000 伍阡, 4000 四阡,
     3000 参阡, 2000 弐阡, 1000 壱阡, 900 九百, 800 八百, 700 七百,
     600 六百, 500 伍百, 400 四百, 300 参百, 200 弐百, 100 壱百, 90 九拾,
     80 八拾, 70 七拾, 60 六拾, 50 伍拾, 40 四拾, 30 参拾, 20 弐拾, 10 壱拾,
     9 九, 8 八, 7 七, 6 六, 5 伍, 4 四, 3 参, 2 弐, 1 壱, 0 零 */
  9000: '\u4E5D\u9621',
  8000: '\u516B\u9621',
  7000: '\u4E03\u9621',
  6000: '\u516D\u9621',
  5000: '\u4F0D\u9621',
  4000: '\u56DB\u9621',
  3000: '\u53C2\u9621',
  2000: '\u5F10\u9621',
  1000: '\u58F1\u9621',
  900: '\u4E5D\u767E',
  800: '\u516B\u767E',
  700: '\u4E03\u767E',
  600: '\u516D\u767E',
  500: '\u4F0D\u767E',
  400: '\u56DB\u767E',
  300: '\u53C2\u767E',
  200: '\u5F10\u767E',
  100: '\u58F1\u767E',
  90: '\u4E5D\u62FE',
  80: '\u516B\u62FE',
  70: '\u4E03\u62FE',
  60: '\u516D\u62FE',
  50: '\u4F0D\u62FE',
  40: '\u56DB\u62FE',
  30: '\u53C2\u62FE',
  20: '\u5F10\u62FE',
  10: '\u58F1\u62FE',
  9: '\u4E5D',
  8: '\u516B',
  7: '\u4E03',
  6: '\u516D',
  5: '\u4F0D',
  4: '\u56DB',
  3: '\u53C2',
  2: '\u5F10',
  1: '\u58F1',
  0: '\u96F6'
})
  .withNegative('\u30DE\u30A4\u30CA\u30B9' /* マイナス */)
  .withRange(-9999, 9999)
  .withFallback(
    cjkDecimal.withNegative('\u30DE\u30A4\u30CA\u30B9' /* マイナス */)
  )
  .withSuffix(CJK_SUFFIX);

export default japaneseFormal;
