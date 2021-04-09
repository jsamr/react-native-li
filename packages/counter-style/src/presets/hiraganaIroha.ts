import { CJK_SUFFIX } from '../constants';
import CounterStyle from '../CounterStyle';

const hiraganaIroha = CounterStyle.alphabetic(
  /* い ろ は に ほ へ と ち り ぬ る を わ か よ た れ そ
     つ ね な ら む う ゐ の お く や ま け ふ こ え て
     あ さ き ゆ め み し ゑ ひ も せ す */
  '\u3044',
  '\u308D',
  '\u306F',
  '\u306B',
  '\u307B',
  '\u3078',
  '\u3068',
  '\u3061',
  '\u308A',
  '\u306C',
  '\u308B',
  '\u3092',
  '\u308F',
  '\u304B',
  '\u3088',
  '\u305F',
  '\u308C',
  '\u305D',
  '\u3064',
  '\u306D',
  '\u306A',
  '\u3089',
  '\u3080',
  '\u3046',
  '\u3090',
  '\u306E',
  '\u304A',
  '\u304F',
  '\u3084',
  '\u307E',
  '\u3051',
  '\u3075',
  '\u3053',
  '\u3048',
  '\u3066',
  '\u3042',
  '\u3055',
  '\u304D',
  '\u3086',
  '\u3081',
  '\u307F',
  '\u3057',
  '\u3091',
  '\u3072',
  '\u3082',
  '\u305B',
  '\u3059'
).withSuffix(CJK_SUFFIX);

export default hiraganaIroha;
