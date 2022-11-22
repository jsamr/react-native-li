import CounterStyle from '../CounterStyle';
import { CJK_SUFFIX } from '../constants';

// REF: https://www.w3.org/TR/css-counter-styles-3/#limited-chinese
const constructor = (preset: number) =>
  ((markers: string[], informal: boolean) =>
    CounterStyle.raw((index) => {
      const ZERO = markers[0];
      // 1. If the counter value is 0, the representation is the character for 0 specified for the given counter style. Skip the rest of this algorithm.
      if (index === 0) {
        return ZERO;
      }

      // 2. Initially represent the counter value as a decimal number. For each digit that is not 0, append the appropriate digit marker to the digit. The ones digit has no marker.
      let digits = `${index}`.split('').map((digit, j, arr) =>
        +digit
          ? markers[+digit] +
            // 5. Replace the digits 0-9 with the appropriate character for the given counter style.
            ((j < arr.length - 1 && markers[arr.length - 1 + 9 - j]) || '')
          : digit
      );

      // 3. For the informal styles, if the counter value is between ten and nineteen, remove the tens digit (leave the digit marker).
      if (informal && index >= 10 && index <= 19) {
        digits[0] = markers[10];
      }

      // 4. Drop any trailing zeros and collapse any remaining zeros into a single zero digit.
      digits = digits.join('').replace(/0+$/, '').replace(/0+/, ZERO).split('');
      // 5. Return the resultant string as the representation of the counter value.
      return digits.join('');
    })
      .withNegative(markers[13])
      .withRange(-9999, 9999)
      .withSuffix(CJK_SUFFIX))(
    PRESETS.map((i) => i[preset]),
    !(preset % 2)
  );

const PRESETS = [
  [/* 零 */ '\u96F6', /* 零 */ '\u96F6', /* 零 */ '\u96F6', /* 零 */ '\u96F6'],
  [/* 一 */ '\u4e00', /* 壹 */ '\u58f9', /* 一 */ '\u4e00', /* 壹 */ '\u58f9'],
  [/* 二 */ '\u4e8c', /* 贰 */ '\u8d30', /* 二 */ '\u4e8c', /* 貳 */ '\u8cb3'],
  [/* 三 */ '\u4e09', /* 叁 */ '\u53c1', /* 三 */ '\u4e09', /* 參 */ '\u53c3'],
  [/* 四 */ '\u56db', /* 肆 */ '\u8086', /* 四 */ '\u56db', /* 肆 */ '\u8086'],
  [/* 五 */ '\u4e94', /* 伍 */ '\u4f0d', /* 五 */ '\u4e94', /* 伍 */ '\u4f0d'],
  [/* 六 */ '\u516d', /* 陆 */ '\u9646', /* 六 */ '\u516d', /* 陸 */ '\u9678'],
  [/* 七 */ '\u4e03', /* 柒 */ '\u67d2', /* 七 */ '\u4e03', /* 柒 */ '\u67d2'],
  [/* 八 */ '\u516b', /* 捌 */ '\u634c', /* 八 */ '\u516b', /* 捌 */ '\u634c'],
  [/* 九 */ '\u4e5d', /* 玖 */ '\u7396', /* 九 */ '\u4e5d', /* 玖 */ '\u7396'],
  [/* 十 */ '\u5341', /* 拾 */ '\u62fe', /* 十 */ '\u5341', /* 拾 */ '\u62fe'],
  [/* 百 */ '\u767e', /* 佰 */ '\u4f70', /* 百 */ '\u767e', /* 佰 */ '\u4f70'],
  [/* 千 */ '\u5343', /* 仟 */ '\u4edf', /* 千 */ '\u5343', /* 仟 */ '\u4edf'],
  [/* 负 */ '\u8d1f', /* 负 */ '\u8d1f', /* 負 */ '\u8ca0', /* 負 */ '\u8ca0']
];

export const simpleChineseInformal = constructor(0);
export const simpleChineseFormal = constructor(1);
export const traditionalChineseInformal = constructor(2);
export const traditionalChineseFormal = constructor(3);
