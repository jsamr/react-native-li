import { CJK_SUFFIX } from '../constants';
import CounterStyle from '../CounterStyle';

const katakana = CounterStyle.alphabetic(
  /* ア イ ウ エ オ カ キ ク ケ コ サ シ ス セ ソ タ チ ツ テ ト
     ナ ニ ヌ ネ ノ ハ ヒ フ ヘ ホ マ ミ ム メ モ ヤ ユ ヨ
     ラ リ ル レ ロ ワ ヰ ヱ ヲ ン */
  '\u30A2',
  '\u30A4',
  '\u30A6',
  '\u30A8',
  '\u30AA',
  '\u30AB',
  '\u30AD',
  '\u30AF',
  '\u30B1',
  '\u30B3',
  '\u30B5',
  '\u30B7',
  '\u30B9',
  '\u30BB',
  '\u30BD',
  '\u30BF',
  '\u30C1',
  '\u30C4',
  '\u30C6',
  '\u30C8',
  '\u30CA',
  '\u30CB',
  '\u30CC',
  '\u30CD',
  '\u30CE',
  '\u30CF',
  '\u30D2',
  '\u30D5',
  '\u30D8',
  '\u30DB',
  '\u30DE',
  '\u30DF',
  '\u30E0',
  '\u30E1',
  '\u30E2',
  '\u30E4',
  '\u30E6',
  '\u30E8',
  '\u30E9',
  '\u30EA',
  '\u30EB',
  '\u30EC',
  '\u30ED',
  '\u30EF',
  '\u30F0',
  '\u30F1',
  '\u30F2',
  '\u30F3'
).withSuffix(CJK_SUFFIX);

export default katakana;
