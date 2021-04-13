import type {
  InitialCounterFormatter,
  MaxCodepointLengthInRangeComputer,
  FallbackRenderer,
  CounterStyleRenderer
} from './public-types';

export interface Engine {
  specs: Specifications;
  formatter: InitialCounterFormatter;
  maxLengthInRange: MaxCodepointLengthInRangeComputer;
  withSpecs: (spToMerge: Partial<Specifications>) => Engine;
  withMaxLengthInRange: (cp: MaxCodepointLengthInRangeComputer) => Engine;
}

export interface Specifications {
  reversedMarker: boolean;
  reversedCounter: boolean;
  suffix: string | null;
  prefix: string | null;
  fallback: FallbackRenderer;
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
export interface CounterStyleRendererInt extends CounterStyleRenderer {
  engine: Engine;
  getAbsoluteMaxLenInRange(min: number, max: number, negative: boolean): number;
}
