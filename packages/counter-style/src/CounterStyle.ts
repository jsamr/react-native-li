import getAlphanumFromUnicodeRange from './getAlphanumFromUnicodeRange';
import makeAlphanumMaxlenComputer from './makeAlphanumMaxlenComputer';
import makeCSEngine from './makeCSEngine';
import makeCSRenderer from './makeCSRenderer';
import type {
  InitialCounterFormatter,
  CounterStyleStatic
} from './public-types';
import codepointLength from './utils/codepointLength';

const mod = (value: number, divisor: number) =>
  ((value % divisor) + divisor) % divisor;

function makeCSRendererFromFormatter(formatter: InitialCounterFormatter) {
  return makeCSRenderer(makeCSEngine(formatter));
}

function getMaxLenInSymbols(
  symbols: number[],
  fromIndex = 0,
  toIndex?: number
) {
  toIndex = typeof toIndex === 'number' ? toIndex : symbols.length;
  return symbols
    .slice(fromIndex, toIndex + 1)
    .reduce((p, c) => Math.max(p, c), 0);
}

/**
 * A static object to build counter style renderers.
 * See {@link CounterStyleStatic}.
 *
 * @public
 */
const CounterStyle: Readonly<CounterStyleStatic> = Object.freeze({
  raw: (formatter, lengthComputer) => {
    return lengthComputer
      ? makeCSRendererFromFormatter(formatter).withMaxLengthComputer(
          lengthComputer
        )
      : makeCSRendererFromFormatter(formatter);
  },
  cyclic: (...symbols) => {
    const symbolLenghts = symbols.map(codepointLength);
    const maxLen = getMaxLenInSymbols(symbolLenghts);
    const renderer =
      symbols.length === 1
        ? makeCSRendererFromFormatter(() => symbols[0])
        : makeCSRendererFromFormatter(
            (index) => symbols[mod(index - 1, symbols.length)]
          );
    return renderer.withMaxLengthComputer((min, max) => {
      return max - min + 1 >= symbols.length
        ? maxLen
        : getMaxLenInSymbols(symbolLenghts, min - 1, max - 1);
    });
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
    )
      .withRange(1, Infinity)
      .withMaxLengthComputer((min, max, defaultCmp) => {
        // Just iterate over the last n elements until max, with n the number
        // of symbols.
        return defaultCmp(
          max < symbols.length ? min : max - symbols.length,
          max
        );
      }),
  alphabetic: (...symbols) => {
    const formatter: InitialCounterFormatter = (index) => {
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
    const formatter: InitialCounterFormatter = (index) => {
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
    const formatter: InitialCounterFormatter = (index) =>
      getAlphanumFromUnicodeRange(index, originUnicode, base, false) as string;
    return makeCSRendererFromFormatter(formatter)
      .withMaxLengthComputer(makeAlphanumMaxlenComputer(base, false))
      .withNegative('-');
  },
  alphabeticFromUnicodeRange: (originUnicode: number, alphabetLen: number) => {
    const formatter: InitialCounterFormatter = (index) => {
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
    return style.withRange(
      0 in symbols ? 0 : Math.max(values.length - 1, 0),
      values.length ? Infinity : 0 in symbols ? 0 : -1
    );
  }
});

export default CounterStyle;
