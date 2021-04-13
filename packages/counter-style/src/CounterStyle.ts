import getAlphanumFromUnicodeRange from './getAlphanumFromUnicodeRange';
import makeAlphanumMaxlenComputer from './makeAlphanumMaxlenComputer';
import makeCSEngine from './makeCSEngine';
import makeCSRenderer from './makeCSRenderer';
import type { LoseCounterFormatter, CounterStyleStatic } from './public-types';

const mod = (value: number, divisor: number) =>
  ((value % divisor) + divisor) % divisor;

function makeCSRendererFromFormatter(formatter: LoseCounterFormatter) {
  return makeCSRenderer(makeCSEngine(formatter));
}

/**
 * A static object to build counter style renderers.
 * See {@link CounterStyleStatic}.
 *
 * @public
 */
const CounterStyle: Readonly<CounterStyleStatic> = Object.freeze({
  raw: (formatter, lengthComputer) => {
    if (lengthComputer) {
      return makeCSRendererFromFormatter(formatter).withMaxLengthComputer(
        lengthComputer
      );
    }
    return makeCSRendererFromFormatter(formatter);
  },
  cyclic: (...symbols) => {
    if (symbols.length === 1) {
      return makeCSRendererFromFormatter(() => symbols[0]);
    } else {
      return makeCSRendererFromFormatter(
        (index) => symbols[mod(index - 1, symbols.length)]
      );
    }
  },
  fixed: (...symbols) =>
    makeCSRendererFromFormatter((index) => symbols[index - 1]).withRange(
      1,
      symbols.length
    ),
  symbolic: (...symbols) =>
    makeCSRendererFromFormatter((index) =>
      symbols[mod(index - 1, symbols.length)].repeat(
        Math.ceil(index / symbols.length)
      )
    ).withRange(1, Infinity),
  alphabetic: (...symbols) => {
    const formatter: LoseCounterFormatter = (index) => {
      let result = '';
      while (index > 0) {
        index--;
        result = symbols[mod(index, symbols.length)] + result;
        index = Math.floor(index / symbols.length);
      }
      return result;
    };
    return makeCSRendererFromFormatter(formatter)
      .withMaxLengthComputer(makeAlphanumMaxlenComputer(symbols.length, true))
      .withRange(1, Infinity);
  },
  numeric: (...symbols) => {
    const formatter: LoseCounterFormatter = (index) => {
      if (index === 0) {
        return symbols[0];
      } else {
        let result = '';
        while (index > 0) {
          result = symbols[mod(index, symbols.length)] + result;
          index = Math.floor(index / symbols.length);
        }
        return result;
      }
    };
    return makeCSRendererFromFormatter(formatter)
      .withMaxLengthComputer(makeAlphanumMaxlenComputer(symbols.length, false))
      .withNegative('-');
  },
  numericFromUnicodeRange: (originUnicode: number, base: number) => {
    const formatter: LoseCounterFormatter = (index) =>
      getAlphanumFromUnicodeRange(index, originUnicode, base, false) as string;
    return makeCSRendererFromFormatter(formatter)
      .withMaxLengthComputer(makeAlphanumMaxlenComputer(base, false))
      .withNegative('-');
  },
  alphabeticFromUnicodeRange: (originUnicode: number, alphabetLen: number) => {
    const formatter: LoseCounterFormatter = (index) => {
      return getAlphanumFromUnicodeRange(
        index,
        originUnicode,
        alphabetLen,
        true
      );
    };
    return makeCSRendererFromFormatter(formatter)
      .withMaxLengthComputer(makeAlphanumMaxlenComputer(alphabetLen, true))
      .withRange(1, Infinity);
  },
  additive: (symbols: { [value: number]: string }) => {
    const values = Object.keys(symbols)
      .map((value) => parseInt(value, 10))
      .filter((value) => value > 0);
    values.sort((a, b) => b - a);
    const symbolList = values.map((value) => ({
      value,
      symbol: symbols[value]
    }));
    const style = makeCSRendererFromFormatter((index) => {
      if (index === 0) {
        return symbols[0];
      } else {
        let result = '';
        for (const { value, symbol } of symbolList) {
          if (index >= value) {
            const repeat = Math.floor(index / value);
            result += symbol.repeat(repeat);
            index -= repeat * value;
          }
        }
        return index === 0 ? result : undefined;
      }
    });
    if (0 in symbols) {
      return style.withRange(0, Infinity);
    } else {
      return style.withRange(1, Infinity);
    }
  }
});

export default CounterStyle;
