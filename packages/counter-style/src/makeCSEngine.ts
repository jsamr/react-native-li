import codepointLength from './utils/codepointLength';
import { DEFAULT_SUFFIX } from './constants';
import { Specifications, Engine } from './internal-types';
import { InitialCounterFormatter } from './public-types';

const DEFAULT_SPECS: Specifications = {
  suffix: DEFAULT_SUFFIX,
  prefix: null,
  reversedMarker: false,
  reversedCounter: false,
  fallback: {
    renderCounter: (index) => index.toString(),
    maxCounterLenInRange(min, max) {
      return Math.max(
        this.renderCounter(min).length,
        this.renderCounter(max).length
      );
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
      len = Math.max(codepointLength(val), len);
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

export default function makeCSEngine(
  formatter: InitialCounterFormatter,
  specs: Specifications = DEFAULT_SPECS
): Engine {
  const eng = Object.create(styleEngineProto) as Engine;
  eng.specs = specs;
  eng.formatter = formatter;
  return eng;
}
