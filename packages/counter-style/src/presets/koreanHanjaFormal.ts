import { CJK_SUFFIX } from '../constants';
import CounterStyle from '../CounterStyle';

const koreanHanjaFormal = CounterStyle.additive({
  /* 9000 九仟, 8000 八仟, 7000 七仟, 6000 六仟, 5000 五仟, 4000 四仟,
     3000 參仟, 2000 貳仟, 1000 壹仟, 900 九百, 800 八百, 700 七百,
     600 六百, 500 五百, 400 四百, 300 參百, 200 貳百, 100 壹百, 90 九拾,
     80 八拾, 70 七拾, 60 六拾, 50 五拾, 40 四拾, 30 參拾, 20 貳拾, 10 壹拾,
     9 九, 8 八, 7 七, 6 六, 5 五, 4 四, 3 參, 2 貳, 1 壹, 0 零 */
  9000: '\u4E5D\u4EDF',
  8000: '\u516B\u4EDF',
  7000: '\u4E03\u4EDF',
  6000: '\u516D\u4EDF',
  5000: '\u4E94\u4EDF',
  4000: '\u56DB\u4EDF',
  3000: '\u53C3\u4EDF',
  2000: '\u8CB3\u4EDF',
  1000: '\u58F9\u4EDF',
  900: '\u4E5D\u767E',
  800: '\u516B\u767E',
  700: '\u4E03\u767E',
  600: '\u516D\u767E',
  500: '\u4E94\u767E',
  400: '\u56DB\u767E',
  300: '\u53C3\u767E',
  200: '\u8CB3\u767E',
  100: '\u58F9\u767E',
  90: '\u4E5D\u62FE',
  80: '\u516B\u62FE',
  70: '\u4E03\u62FE',
  60: '\u516D\u62FE',
  50: '\u4E94\u62FE',
  40: '\u56DB\u62FE',
  30: '\u53C3\u62FE',
  20: '\u8CB3\u62FE',
  10: '\u58F9\u62FE',
  9: '\u4E5D',
  8: '\u516B',
  7: '\u4E03',
  6: '\u516D',
  5: '\u4E94',
  4: '\u56DB',
  3: '\u53C3',
  2: '\u8CB3',
  1: '\u58F9',
  0: '\u96F6'
})
  .withNegative('\uB9C8\uC774\uB108\uC2A4 ' /* 마이너스 (space) */)
  .withRange(-9999, 9999)
  .withSuffix(CJK_SUFFIX);

export default koreanHanjaFormal;
