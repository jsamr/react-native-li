import codepointLength from './utils/codepointLength';
import codeunitLength from './utils/codeunitLength';
import { CounterStyleRendererInt, Engine } from './internal-types';
import { CounterStyleRenderer, RtlOptions } from './public-types';
import reverseString from './utils/reverseString';

const defaultRtlOptions: Required<RtlOptions> = {
  reverseCounter: false,
  reversePrefix: true,
  reverseSuffix: true
};

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
    if (max < min) {
      return 0;
    }
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
    if (max < min) {
      return 0;
    }
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
      res = negative.prefix + res + negative.suffix;
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
  renderPrefix(this: CounterStyleRendererInt) {
    return this.engine.specs.prefix || '';
  },
  renderSuffix(this: CounterStyleRendererInt) {
    return this.engine.specs.suffix || '';
  },
  withFallback(this: CounterStyleRendererInt, fallback) {
    return makeCSRenderer(this.engine.withSpecs({ fallback }));
  },
  withRange(this: CounterStyleRendererInt, min, max, fallback) {
    const result = makeCSRenderer(
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
    return makeCSRenderer(
      this.engine.withSpecs({
        negative: {
          prefix,
          suffix
        }
      })
    );
  },
  withPadLeft(this: CounterStyleRendererInt, length, pad) {
    return makeCSRenderer(
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
    return makeCSRenderer(
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
    return makeCSRenderer(
      this.engine.withSpecs({
        suffix
      })
    );
  },
  withPrefix(this: CounterStyleRendererInt, prefix) {
    return makeCSRenderer(
      this.engine.withSpecs({
        prefix
      })
    );
  },
  withRtl(this: CounterStyleRendererInt, options) {
    const synthOptions = Object.assign({}, defaultRtlOptions, options);
    const sp = this.engine.specs;
    return makeCSRenderer(
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
    return makeCSRenderer(
      this.engine.withMaxLengthInRange((min, max) =>
        computer(min, max, this.engine.maxLengthInRange.bind(this.engine))
      )
    );
  }
};

export default function makeCSRenderer(engine: Engine): CounterStyleRenderer {
  const target = Object.create(stylePrototype) as CounterStyleRendererInt;
  target.engine = engine;
  return Object.freeze(target);
}
