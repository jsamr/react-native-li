import { CJK_SUFFIX } from '../constants';
import CounterStyle from '../CounterStyle';

const katakanaIroha = CounterStyle.alphabetic(
  /* イ ロ ハ ニ ホ ヘ ト チ リ ヌ ル ヲ ワ カ ヨ タ レ ソ
     ツ ネ ナ ラ ム ウ ヰ ノ オ ク ヤ マ ケ フ コ エ テ
     ア サ キ ユ メ ミ シ ヱ ヒ モ セ ス */
  '\u30A4',
  '\u30ED',
  '\u30CF',
  '\u30CB',
  '\u30DB',
  '\u30D8',
  '\u30C8',
  '\u30C1',
  '\u30EA',
  '\u30CC',
  '\u30EB',
  '\u30F2',
  '\u30EF',
  '\u30AB',
  '\u30E8',
  '\u30BF',
  '\u30EC',
  '\u30BD',
  '\u30C4',
  '\u30CD',
  '\u30CA',
  '\u30E9',
  '\u30E0',
  '\u30A6',
  '\u30F0',
  '\u30CE',
  '\u30AA',
  '\u30AF',
  '\u30E4',
  '\u30DE',
  '\u30B1',
  '\u30D5',
  '\u30B3',
  '\u30A8',
  '\u30C6',
  '\u30A2',
  '\u30B5',
  '\u30AD',
  '\u30E6',
  '\u30E1',
  '\u30DF',
  '\u30B7',
  '\u30F1',
  '\u30D2',
  '\u30E2',
  '\u30BB',
  '\u30B9'
).withSuffix(CJK_SUFFIX);

export default katakanaIroha;
