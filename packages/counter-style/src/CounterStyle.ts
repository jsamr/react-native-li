import { DEFAULT_SUFFIX } from './constants';
import getAlphanumFromUnicodeRange from './getAlphanumFromUnicodeRange';
import makeAlphanumMaxlenComputer from './makeAlphanumMaxlenComputer';

interface Engine {
  specs: Specifications;
  formatter: LoseCounterFormatter;
  maxLengthInRange: MaxCodepointLengthInRangeComputer;
  withSpecs: (spToMerge: Partial<Specifications>) => Engine;
  withMaxLengthInRange: (cp: MaxCodepointLengthInRangeComputer) => Engine;
}

interface Specifications {
  reversedMarker: boolean;
  reversedCounter: boolean;
  suffix: string | null;
  prefix: string | null;
  fallback: BaseCounterStyleRenderer;
  negative: null | {
    prefix: string;
    suffix: string;
  };
  range: {
    min: number;
    max: number;
  };
  padding: null | {
    right: boolean;
    char: string;
    length: number;
  };
}

/**
 * Internal implementation of CounterStyleRenderer
 */
interface CounterStyleRendererInt extends CounterStyleRenderer {
  engine: Engine;
  getAbsoluteMaxLenInRange(min: number, max: number, negative: boolean): number;
}

/**
 * A function which compute the maximum codepoint length of a formatter in a
 * given range.
 *
 * @param min - The inclusive non-negative minimum.
 * @param max - The inclusive non-negative maximum.
 *
 * @public
 */
export type MaxCodepointLengthInRangeComputer = (
  min: number,
  max: number
) => number;

/**
 * A function that renders an index into its counter representation.
 *
 * @public
 */
export type StrictCounterFormatter = (index: number) => string;

/**
 * A function that renders an index into its counter representation.
 *
 * It can return undefined to signal a fallback should be used instead.
 *
 * @public
 */
export type LoseCounterFormatter = (index: number) => string | undefined;

/**
 * @public
 */
export interface RtlOptions {
  /**
   * @defaultValue true
   */
  reversePrefix?: boolean;
  /**
   * @defaultValue true
   */
  reverseSuffix?: boolean;
  /**
   * @defaultValue false
   */
  reverseCounter?: boolean;
}

/**
 * @public
 */
export interface CounterStyleRenderer extends BaseCounterStyleRenderer {
  /**
   * Create a new renderer with a fallback used when the index is out of bounds.
   *
   * See https://www.w3.org/TR/css-counter-styles-3/#counter-style-fallback
   *
   * @param fallback - A fallback CounterStyleRenderer.
   */
  withFallback(fallback: BaseCounterStyleRenderer): CounterStyleRenderer;
  /**
   * Create a new renderer with a constrained range. When the index is out of
   * bounds, the counter representation is rendered with the provided fallback,
   * or the default fallback if none was provided.
   *
   * See https://www.w3.org/TR/css-counter-styles-3/#counter-style-range
   *
   * @param min - Minimum value (inclusive)
   * @param max - Maximum value (inclusive)
   * @param fallback - A fallback renderer to apply when the index is out of bounds.
   */
  withRange(
    min: number,
    max: number,
    fallback?: BaseCounterStyleRenderer
  ): CounterStyleRenderer;
  /**
   * Create a new renderer which will render negative values by prefixing and
   * suffixing the provided characters to the renderer function.
   *
   * See https://www.w3.org/TR/css-counter-styles-3/#counter-style-negative
   *
   * @param prefix - String prepended to counter representation.
   * @param suffix - String appended to counter representation.
   */
  withNegative(prefix: string, suffix?: string): CounterStyleRenderer;
  /**
   * Create a new renderer which adds padding to the left.
   *
   * See https://www.w3.org/TR/css-counter-styles-3/#counter-style-pad
   *
   * @param length - The total length to which padding should be added.
   * @param pad - The character to pad.
   */
  withPadLeft(length: number, pad: string): CounterStyleRenderer;
  /**
   * Create a new renderer which adds padding to the right.
   *
   * See https://www.w3.org/TR/css-counter-styles-3/#counter-style-pad
   *
   * @param length - The total length to which padding should be added.
   * @param pad - The character to pad.
   */
  withPadRight(length: number, pad: string): CounterStyleRenderer;

  /**
   * Create a new renderer which replaces or removes this renderer suffix.
   *
   * See https://www.w3.org/TR/css-counter-styles-3/#counter-style-suffix
   *
   * @param suffix - A suffix, or `null` to remove the default suffix.
   */
  withSuffix(suffix: string | null): CounterStyleRenderer;

  /**
   * Create a new renderer which replaces or removes this renderer prefix.
   *
   * See https://www.w3.org/TR/css-counter-styles-3/#counter-style-prefix
   *
   * @param prefix - A prefix, or `null` to remove this renderer suffix.
   */
  withPrefix(prefix: string | null): CounterStyleRenderer;

  /**
   * Create a new renderer with a (hopefuly) cost-effective max codepoint
   * length computer.
   *
   * @remarks The computer function must not handle negative numbers.
   *
   * @param computer - A function to compute the max codepoints length
   * produced by the underlying formatter given a range.
   */
  withMaxLengthComputer(
    computer: MaxCodepointLengthInRangeComputer
  ): CounterStyleRenderer;

  /**
   * Create a new renderer which renders Right-to-left.
   *
   * @remarks By default:
   * - The order of prefix, counter representation and suffix will be reversed when rendering marker.
   * - The letter ordering of prefix and suffix will be reversed when rendering marker, prefix and suffix.
   * - The letter ordering of counter representation will not be reversed when rendering marker and counter.
   */
  withRtl(options?: RtlOptions): CounterStyleRenderer;
}

/**
 * @public
 */
export interface BaseCounterStyleRenderer {
  /**
   * Render an index into its corresponding marker string.
   * See {@link https://www.w3.org/TR/css-lists-3/#text-markers | CSS Lists Level 3, Text-based Markers}.
   *
   * @param index - The counter value to render.
   */
  renderMarker(index: number): string;

  /**
   * Render an index into its counter representation, equivalent to CSS `counter` function.
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#generate-a-counter | CSS Counter Styles Level 3, Counter Styles}.
   *
   * @param index - The counter value to render.
   */
  renderCounter(index: number): string;

  /**
   * Get the maximum marker string length given an index range. If a fallback
   * is defined, it will be used for values outside the range boundaries of
   * this renderer.
   *
   * @remarks This method doesn't take into account
   * {@link https://www.w3.org/TR/css-text-3/#grapheme-cluster | unicode grapheme clusters}.
   *
   * @param min - The minimum inclusive value.
   * @param max - The maximum inclusive value.
   */
  maxMarkerLenInRange(min: number, max: number): number;

  /**
   * Get the maximum counter representation length given an index range. If a
   * fallback is defined, it will be used for values outside the range
   * boundaries of this renderer.
   *
   * @remarks This method doesn't take into account
   * {@link https://www.w3.org/TR/css-text-3/#grapheme-cluster | unicode grapheme clusters}.
   *
   * @param min - The minimum inclusive value.
   * @param max - The maximum inclusive value.
   */
  maxCounterLenInRange(min: number, max: number): number;
}

const defaultRtlOptions: Required<RtlOptions> = {
  reverseCounter: false,
  reversePrefix: true,
  reverseSuffix: true
};

function codeunitLength(source?: string | null) {
  return (source && source.length) || 0;
}

function codepointLength(source?: string | null) {
  // get codepoints length instead of UTF16 code units with the string Iterator.
  return (source && [...source].length) || 0;
}

function reverseString(source: string) {
  return Array.from(source).reverse().join('');
}

const _mod = (value: number, divisor: number) =>
  ((value % divisor) + divisor) % divisor;

const stylePrototype: Omit<CounterStyleRendererInt, 'engine'> = {
  getAbsoluteMaxLenInRange(
    this: CounterStyleRendererInt,
    normMin,
    normMax,
    negative
  ) {
    const specs = this.engine.specs;
    const supportedRange = specs.range;
    const supportedMin = Math.max(normMin, supportedRange.min);
    const supportedMax = Math.min(normMax, supportedRange.max);
    const lenMiddle = Math.max(
      this.engine.maxLengthInRange(
        negative ? Math.abs(supportedMax) : supportedMin,
        negative ? Math.abs(supportedMin) : supportedMax
      ) +
        (negative && specs.negative
          ? codeunitLength(specs.negative.prefix) +
            codeunitLength(specs.negative.suffix)
          : 0),
      specs?.padding?.length || 0
    );
    const lenLeft =
      supportedMin > normMin
        ? specs.fallback.maxCounterLenInRange(normMin, supportedMin - 1)
        : 0;
    const lenRight =
      supportedMax < normMax
        ? specs.fallback.maxCounterLenInRange(supportedMax + 1, normMax)
        : 0;
    return Math.max(lenLeft, lenMiddle, lenRight);
  },
  maxCounterLenInRange(this: CounterStyleRendererInt, min, max) {
    if (min >= 0) {
      return this.getAbsoluteMaxLenInRange(min, max, false);
    }
    if (max <= 0) {
      return this.getAbsoluteMaxLenInRange(min, max, true);
    }
    return Math.max(
      this.getAbsoluteMaxLenInRange(min, -1, true),
      this.getAbsoluteMaxLenInRange(0, max, false)
    );
  },
  maxMarkerLenInRange(this: CounterStyleRendererInt, min, max) {
    return (
      this.maxCounterLenInRange(min, max) +
      codeunitLength(this.engine.specs.suffix) +
      codeunitLength(this.engine.specs.prefix)
    );
  },
  renderCounter(this: CounterStyleRendererInt, index) {
    const formatter = this.engine.formatter;
    const sp = this.engine.specs;
    const negative = sp.negative;
    let res;
    if (index < sp.range.min || index > sp.range.max) {
      return sp.fallback.renderCounter(index);
    }
    const decoratorL =
      negative && index < 0
        ? codeunitLength(negative.prefix) + codeunitLength(negative.suffix)
        : 0;
    res = formatter(Math.sign(index) * index);
    if (typeof res === 'undefined') {
      return sp.fallback.renderCounter(index);
    }
    if (sp.padding) {
      const lenWithDecorator = codepointLength(res) + decoratorL;
      if (lenWithDecorator < sp.padding.length) {
        const padChar = sp.padding.char.repeat(
          sp.padding.length - lenWithDecorator
        );
        res = sp.padding.right ? res + padChar : padChar + res;
      }
    }
    if (index < 0 && negative) {
      if (typeof res === 'string') {
        res = negative.prefix + res + negative.suffix;
      }
    }
    return sp.reversedCounter ? reverseString(res) : res;
  },
  renderMarker(this: CounterStyleRendererInt, index) {
    const sp = this.engine.specs;
    const elements = [
      sp.prefix || '',
      this.renderCounter(index),
      sp.suffix || ''
    ];
    return sp.reversedMarker ? elements.reverse().join('') : elements.join('');
  },
  withFallback(this: CounterStyleRendererInt, fallback) {
    return makeRaw(this.engine.withSpecs({ fallback }));
  },
  withRange(this: CounterStyleRendererInt, min, max, fallback) {
    const result = makeRaw(
      this.engine.withSpecs({
        range: {
          min,
          max
        }
      })
    );
    return fallback ? result.withFallback(fallback) : result;
  },
  withNegative(this: CounterStyleRendererInt, prefix, suffix = '') {
    return makeRaw(
      this.engine.withSpecs({
        negative: {
          prefix,
          suffix
        }
      })
    );
  },
  withPadLeft(this: CounterStyleRendererInt, length, pad) {
    return makeRaw(
      this.engine.withSpecs({
        padding: {
          right: false,
          char: pad,
          length
        }
      })
    );
  },
  withPadRight(this: CounterStyleRendererInt, length, pad) {
    return makeRaw(
      this.engine.withSpecs({
        padding: {
          right: true,
          char: pad,
          length
        }
      })
    );
  },
  withSuffix(this: CounterStyleRendererInt, suffix) {
    return makeRaw(
      this.engine.withSpecs({
        suffix
      })
    );
  },
  withPrefix(this: CounterStyleRendererInt, prefix) {
    return makeRaw(
      this.engine.withSpecs({
        prefix
      })
    );
  },
  withRtl(this: CounterStyleRendererInt, options) {
    const synthOptions = Object.assign({}, defaultRtlOptions, options);
    const sp = this.engine.specs;
    return makeRaw(
      this.engine.withSpecs({
        reversedMarker: true,
        reversedCounter: synthOptions.reverseCounter,
        suffix:
          synthOptions.reverseSuffix && sp.suffix
            ? reverseString(sp.suffix)
            : sp.suffix,
        prefix:
          synthOptions.reversePrefix && sp.prefix
            ? reverseString(sp.prefix)
            : sp.prefix
      })
    );
  },
  withMaxLengthComputer(this: CounterStyleRendererInt, computer) {
    return makeRaw(this.engine.withMaxLengthInRange(computer));
  }
};

function makeRaw(engine: Engine): CounterStyleRenderer {
  const target = Object.create(stylePrototype) as CounterStyleRendererInt;
  target.engine = engine;
  return Object.freeze(target);
}

function makeRawFromFormatter(formatter: LoseCounterFormatter) {
  return makeRaw(makeStyleEngine(formatter));
}

/**
 * @public
 */
export interface CounterStyleStatic {
  /**
   * Create a renderer from a formatter function.
   *
   * @remarks The formatter function should not add decorations. Especially:
   *
   * - should not handle negative numbers. Use {@link CounterStyleRenderer.withNegative} instead to specify which negative symbol should be rendered.
   * - should not add padding. Use {@link CounterStyleRenderer.withPadLeft} and {@link CounterStyleRenderer.withPadRight} instead.
   *
   * If the formatter function doesn't cover the [-Infinity, Infinity] range,
   * you must specify the supported range. See
   * {@link CounterStyleRenderer.withRange}.
   *
   * @param formatter - A formatter function which takes a non-negative
   * integer and returns its counter representation, or undefined when there is
   * no representation for this index. If that is the case, the renderer will
   * use the specified fallback function (see
   * {@link CounterStyleRenderer.withFallback}), or the default fallback.
   *
   * @param maxLengthComputer - A function which takes a non-negative range and
   * returns the maximum formatter length for this range in codepoints. Default
   * implementation is slow as it iterates over all values in range.
   * See {@link MaxCodepointLengthInRangeComputer}.
   *
   * @returns A style renderer.
   */
  raw: (
    formatter: LoseCounterFormatter,
    maxLengthComputer?: MaxCodepointLengthInRangeComputer
  ) => CounterStyleRenderer;

  /**
   * See https://www.w3.org/TR/css-counter-styles-3/#cyclic-system
   *
   * @param symbols - A suite of repeated symbols.
   * @returns - A cyclic renderer with default range of [-Infinity, Infinity]
   */
  cyclic: (...symbols: string[]) => CounterStyleRenderer;

  /**
   * See https://www.w3.org/TR/css-counter-styles-3/#fixed-system
   *
   * @param symbols - The suite of fixed symbols
   * @returns - A fixed renderer with default range of [1, symbols.length]
   */
  fixed: (...symbols: string[]) => CounterStyleRenderer;

  /**
   * See https://www.w3.org/TR/css-counter-styles-3/#symbolic-system
   *
   * @param symbols - The suite of repeated symbols.
   * @returns - A symbolic renderer with default range of [1, Infinity]
   */
  symbolic: (...symbols: string[]) => CounterStyleRenderer;

  /**
   * See https://www.w3.org/TR/css-counter-styles-3/#alphabetic-system
   *
   * @param symbols - The suite of alphabetic symbols.
   * @returns - An alphabetic renderer with default range of [1, Infinity]
   */
  alphabetic: (...symbols: string[]) => CounterStyleRenderer;

  /**
   * See https://www.w3.org/TR/css-counter-styles-3/#numeric-system
   *
   * @param symbols - The suite of numeric symbols.
   * @returns - An numeric renderer with default range of [-Infinity, Infinity]
   * and default negative symbol "-".
   */
  numeric: (...symbols: string[]) => CounterStyleRenderer;

  /**
   * See https://www.w3.org/TR/css-counter-styles-3/#additive-system
   *
   * @remarks Additive systems might have "holes" in their range coverage. For
   * example, an additive system which has no representation for "1" will not
   * translate odd indexes. This edge-case is not guaranteed to work with this library.
   *
   * @param symbols - A record which indexes are non-negative numbers and values their
   * corresponding representations, each pair forming an additive tuple.
   * @returns - An additive renderer with default range of [0, Infinity] if a 0
   * additive tupple was specified, [1, Infinity] otherwise.
   */
  additive: (symbols: Record<number, string>) => CounterStyleRenderer;

  /**
   * Create a numeric multiplicative renderer from a unicode and a base. The
   * set of numerals for this range will be generated by incrementing
   * `originUnicode` with every integer in range [0, `base` - 1].
   *
   * See https://www.w3.org/TR/css-counter-styles-3/#numeric-system.
   *
   * @param originUnicode - The unicode number representation of index "0".
   * @param base - The number of numerals in the multiplicative system.
   */
  numericFromUnicodeRange: (
    originUnicode: number,
    base: number
  ) => CounterStyleRenderer;

  /**
   * Create an alphabetic renderer from a unicode and an alphabet length. The
   * set of symbols for this alphabetic system will be generated by
   * incrementing `originUnicode` with every integer in range
   * [0, `alphabetLength` - 1].
   *
   * https://www.w3.org/TR/css-counter-styles-3/#alphabetic-system.
   *
   * @param originUnicode - The unicode number representation of index "1".
   * @param alphabetLength - The number of characters in this alphabet.
   */
  alphabeticFromUnicodeRange: (
    originUnicode: number,
    alphabetLength: number
  ) => CounterStyleRenderer;
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
      return makeRawFromFormatter(formatter).withMaxLengthComputer(
        lengthComputer
      );
    }
    return makeRawFromFormatter(formatter);
  },
  cyclic: (...symbols) => {
    if (symbols.length === 1) {
      return makeRawFromFormatter(() => symbols[0]);
    } else {
      return makeRawFromFormatter(
        (index) => symbols[_mod(index - 1, symbols.length)]
      );
    }
  },
  fixed: (...symbols) =>
    makeRawFromFormatter((index) => symbols[index - 1]).withRange(
      1,
      symbols.length
    ),
  symbolic: (...symbols) =>
    makeRawFromFormatter((index) =>
      symbols[_mod(index - 1, symbols.length)].repeat(
        Math.ceil(index / symbols.length)
      )
    ).withRange(1, Infinity),
  alphabetic: (...symbols) => {
    const formatter: StrictCounterFormatter = (index) => {
      let result = '';
      while (index > 0) {
        index--;
        result = symbols[_mod(index, symbols.length)] + result;
        index = Math.floor(index / symbols.length);
      }
      return result;
    };
    return makeRawFromFormatter(formatter)
      .withMaxLengthComputer(makeAlphanumMaxlenComputer(symbols.length, true))
      .withRange(1, Infinity);
  },
  numeric: (...symbols) => {
    const formatter: StrictCounterFormatter = (index) => {
      if (index === 0) {
        return symbols[0];
      } else {
        let result = '';
        while (index > 0) {
          result = symbols[_mod(index, symbols.length)] + result;
          index = Math.floor(index / symbols.length);
        }
        return result;
      }
    };
    return makeRawFromFormatter(formatter)
      .withMaxLengthComputer(makeAlphanumMaxlenComputer(symbols.length, false))
      .withNegative('-');
  },

  numericFromUnicodeRange: (originUnicode: number, base: number) => {
    const formatter: StrictCounterFormatter = (index) =>
      getAlphanumFromUnicodeRange(index, originUnicode, base, false);
    return makeRawFromFormatter(formatter)
      .withMaxLengthComputer(makeAlphanumMaxlenComputer(base, false))
      .withNegative('-');
  },
  alphabeticFromUnicodeRange: (originUnicode: number, alphabetLen: number) => {
    const formatter: LoseCounterFormatter = (index) => {
      if (index > 0) {
        return getAlphanumFromUnicodeRange(
          index,
          originUnicode,
          alphabetLen,
          true
        );
      }
      return;
    };
    return makeRawFromFormatter(formatter)
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
    const style = makeRawFromFormatter((index) => {
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

const DEFAULT_SPECS: Specifications = {
  suffix: DEFAULT_SUFFIX,
  prefix: null,
  reversedMarker: false,
  reversedCounter: false,
  fallback: {
    renderMarker: (index) => index.toString() + DEFAULT_SUFFIX,
    renderCounter: (index) => index.toString(),
    maxCounterLenInRange(min, max) {
      return Math.max(
        this.renderCounter(min).length,
        this.renderCounter(max).length
      );
    },
    maxMarkerLenInRange(min, max) {
      return this.maxCounterLenInRange(min, max) + DEFAULT_SUFFIX.length;
    }
  },
  negative: null,
  range: {
    min: -Infinity,
    max: Infinity
  },
  padding: null
};

const styleEngineProto: Pick<
  Engine,
  'maxLengthInRange' | 'withSpecs' | 'withMaxLengthInRange'
> = {
  // Cost-inefficient since it requires iterating over the whole range.
  maxLengthInRange(this: Engine, min, max) {
    let len = 0;
    for (let i = Math.max(0, min); i <= max; i++) {
      const val = this.formatter(i);
      if (typeof val === 'string') {
        len = Math.max(codepointLength(val), len);
      }
    }
    return len;
  },
  withSpecs(this: Engine, spToMerge) {
    const next = Object.create(this) as Engine;
    next.specs = Object.assign({}, this.specs, spToMerge);
    return next;
  },
  withMaxLengthInRange(this: Engine, cp) {
    const next = Object.create(this) as Engine;
    next.maxLengthInRange = cp;
    return next;
  }
};

function makeStyleEngine(
  renderer: LoseCounterFormatter = () => '',
  specs: Specifications = DEFAULT_SPECS
): Engine {
  const eng = Object.create(styleEngineProto) as Engine;
  eng.specs = specs;
  eng.formatter = renderer;
  return eng;
}

export default CounterStyle;
