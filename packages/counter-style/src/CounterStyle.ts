import getAlphanumFromUnicodeRange from './getAlphanumFromUnicodeRange';
import makeAlphanumMaxlenComputer from './makeAlphanumMaxlenComputer';
import makeCSEngine from './makeCSEngine';
import makeCSRenderer from './makeCSRenderer';
import type {
  InitialCounterFormatter,
  CounterStyleStatic,
  CounterStyleRenderer
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

function numeric(renderer: CounterStyleRenderer, length: number) {
  return renderer
    .withMaxLengthComputer(makeAlphanumMaxlenComputer(length, false))
    .withNegative('-');
}

function alphabetic(renderer: CounterStyleRenderer, length: number) {
  return renderer
    .withMaxLengthComputer(makeAlphanumMaxlenComputer(length, true))
    .withRange(1, Infinity);
}

/**
 * A static object to build counter style renderers.
 * See {@link CounterStyleStatic}.
 *
 * @public
 */
const CounterStyle: Readonly<CounterStyleStatic> = Object.freeze({
  raw: (formatter) => {
    return makeCSRendererFromFormatter(formatter);
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
      return maxLen === 1 || max - min + 1 >= symbols.length
        ? maxLen
        : getMaxLenInSymbols(symbolLenghts, min - 1, max - 1);
    });
  },
  fixed: (...symbols) => {
    const symbolLenghts = symbols.map(codepointLength);
    const maxLen = getMaxLenInSymbols(symbolLenghts);
    return makeCSRendererFromFormatter((index) => symbols[index - 1])
      .withRange(1, symbols.length)
      .withMaxLengthComputer((min, max) => {
        return maxLen === 1
          ? maxLen
          : getMaxLenInSymbols(symbolLenghts, min - 1, max - 1);
      });
  },
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
    return alphabetic(
      makeCSRendererFromFormatter((index) => {
        let result = '';
        while (index > 0) {
          index--;
          result = symbols[mod(index, symbols.length)] + result;
          index = Math.floor(index / symbols.length);
        }
        return result;
      }),
      symbols.length
    );
  },
  numeric: (...symbols) => {
    return numeric(
      makeCSRendererFromFormatter((index) => {
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
      }),
      symbols.length
    );
  },
  numericFromUnicodeRange: (originUnicode: number, base: number) => {
    return numeric(
      makeCSRendererFromFormatter(
        (index) =>
          getAlphanumFromUnicodeRange(
            index,
            originUnicode,
            base,
            false
          ) as string
      ),
      base
    );
  },
  alphabeticFromUnicodeRange: (originUnicode: number, alphabetLen: number) => {
    return alphabetic(
      makeCSRendererFromFormatter((index) => {
        return getAlphanumFromUnicodeRange(
          index,
          originUnicode,
          alphabetLen,
          true
        );
      }),
      alphabetLen
    );
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
