import CounterStyle from '../CounterStyle';

const hebrew = CounterStyle.additive({
  /* Hebrew numerals from draft.csswg.org are not included here for
     reference, because Visual Studio Code fails to display them in
     the correct word order. */
  /* This system manually specifies the values for 19-15 to force
     the correct display of 15 and 16, which are commonly rewritten
     to avoid a close resemblance to the Tetragrammaton. */
  10000: '\u05D9\u05F3',
  9000: '\u05D8\u05F3',
  8000: '\u05D7\u05F3',
  7000: '\u05D6\u05F3',
  6000: '\u05D5\u05F3',
  5000: '\u05D4\u05F3',
  4000: '\u05D3\u05F3',
  3000: '\u05D2\u05F3',
  2000: '\u05D1\u05F3',
  1000: '\u05D0\u05F3',
  900: '\u05E5',
  800: '\u05E3',
  700: '\u05DF',
  600: '\u05DD',
  500: '\u05DA',
  400: '\u05EA',
  300: '\u05E9',
  200: '\u05E8',
  100: '\u05E7',
  90: '\u05E6',
  80: '\u05E4',
  70: '\u05E2',
  60: '\u05E1',
  50: '\u05E0',
  40: '\u05DE',
  30: '\u05DC',
  20: '\u05DB',
  19: '\u05D9\u05D8',
  18: '\u05D9\u05D7',
  17: '\u05D9\u05D6',
  16: '\u05D8\u05D6',
  15: '\u05D8\u05D5',
  10: '\u05D9',
  9: '\u05D8',
  8: '\u05D7',
  7: '\u05D6',
  6: '\u05D5',
  5: '\u05D4',
  4: '\u05D3',
  3: '\u05D2',
  2: '\u05D1',
  1: '\u05D0'
}).withRange(1, 10999);

export default hebrew;
