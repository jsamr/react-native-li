import { CJK_SUFFIX } from '../constants';
import CounterStyle from '../CounterStyle';

const hiragana = CounterStyle.alphabetic(
  /* あ い う え お か き く け こ さ し す せ そ た ち つ て と
     な に ぬ ね の は ひ ふ へ ほ ま み む め も や ゆ よ
     ら り る れ ろ わ ゐ ゑ を ん */
  '\u3042',
  '\u3044',
  '\u3046',
  '\u3048',
  '\u304A',
  '\u304B',
  '\u304D',
  '\u304F',
  '\u3051',
  '\u3053',
  '\u3055',
  '\u3057',
  '\u3059',
  '\u305B',
  '\u305D',
  '\u305F',
  '\u3061',
  '\u3064',
  '\u3066',
  '\u3068',
  '\u306A',
  '\u306B',
  '\u306C',
  '\u306D',
  '\u306E',
  '\u306F',
  '\u3072',
  '\u3075',
  '\u3078',
  '\u307B',
  '\u307E',
  '\u307F',
  '\u3080',
  '\u3081',
  '\u3082',
  '\u3084',
  '\u3086',
  '\u3088',
  '\u3089',
  '\u308A',
  '\u308B',
  '\u308C',
  '\u308D',
  '\u308F',
  '\u3090',
  '\u3091',
  '\u3092',
  '\u3093'
).withSuffix(CJK_SUFFIX);

export default hiragana;
