import { DEFAULT_SUFFIX } from '../constants';
import CounterStyle from '../CounterStyle';
import decimal from '../presets/decimal';
import lowerGreek from '../presets/lowerGreek';
import lowerRoman from '../presets/lowerRoman';
import persian from '../presets/persian';
import arabicIndic from '../presets/arabicIndic';

describe('CounterStyleRenderer', () => {
  test('::withNegative', () => {
    const counter = decimal.withNegative('(', ')');
    expect(counter.renderCounter(-2)).toBe('(2)');
    expect(counter.renderCounter(-1)).toBe('(1)');
    expect(counter.renderMarker(-1)).toBe('(1)' + DEFAULT_SUFFIX);
    expect(counter.renderCounter(0)).toBe('0');
    expect(counter.renderCounter(1)).toBe('1');
    expect(counter.renderCounter(2)).toBe('2');
  });

  test('::withPadLeft', () => {
    const counter = decimal
      .withPadLeft(3, '0')
      .withNegative('-')
      .withSuffix('..');
    expect(counter.renderMarker(1)).toBe('001..');
    expect(counter.renderMarker(20)).toBe('020..');
    expect(counter.renderMarker(300)).toBe('300..');
    expect(counter.renderMarker(4000)).toBe('4000..');
    expect(counter.renderMarker(-5)).toBe('-05..');
  });

  test('::withPadRight', () => {
    const counter = decimal.withPadRight(3, ' ').withSuffix(null);
    expect(counter.renderCounter(1)).toBe('1  ');
    expect(counter.renderCounter(20)).toBe('20 ');
    expect(counter.renderCounter(300)).toBe('300');
    expect(counter.renderCounter(4000)).toBe('4000');
    expect(counter.renderCounter(-5)).toBe('-5 ');
  });

  test('It should fall back to a decimal renderer when out of bounds preserving prefixes and suffixes', () => {
    const counter = lowerGreek
      .withRange(0, 10)
      .withSuffix('  ')
      .withPrefix('|');
    expect(counter.renderMarker(11)).toBe('|11  ');
    expect(counter.renderCounter(11)).toBe('11');
  });

  test('::withRtl', () => {
    const counter = arabicIndic.withPrefix(') ');
    expect(counter.withRtl().renderCounter(10)).toBe('١٠');
    expect(counter.withRtl({ reversePrefix: false }).renderMarker(10)).toBe(
      ' .١٠) '
    );
    expect(counter.withRtl({ reverseCounter: true }).renderCounter(10)).toBe(
      '٠١'
    );
  });

  describe('::maxMarkerLenInRange', () => {
    it('should work with numeric styles', () => {
      const counter = decimal;
      expect(counter.maxMarkerLenInRange(1, 9)).toBe(1 + DEFAULT_SUFFIX.length);
      expect(counter.maxMarkerLenInRange(1, 10)).toBe(
        2 + DEFAULT_SUFFIX.length
      );
      expect(counter.maxMarkerLenInRange(0, 100)).toBe(
        3 + DEFAULT_SUFFIX.length
      );
    });
    it('should work with alphabetic styles', () => {
      const counter = lowerGreek;
      expect(counter.maxMarkerLenInRange(1, 2)).toBe(1 + DEFAULT_SUFFIX.length);
      expect(counter.maxMarkerLenInRange(1, 24)).toBe(
        1 + DEFAULT_SUFFIX.length
      );
      expect(counter.maxMarkerLenInRange(1, 25)).toBe(
        2 + DEFAULT_SUFFIX.length
      );
    });
    it('should work with cyclic styles', () => {
      const counter = CounterStyle.cyclic('<>');
      expect(counter.maxMarkerLenInRange(0, 100)).toBe(
        2 + DEFAULT_SUFFIX.length
      );
    });
    it('should work with fixed styles', () => {
      const counter = CounterStyle.fixed('x', 'y', 'z');
      expect(counter.maxMarkerLenInRange(1, 3)).toBe(1 + DEFAULT_SUFFIX.length);
      expect(counter.maxMarkerLenInRange(1, 10)).toBe(
        2 + DEFAULT_SUFFIX.length
      );
    });
    it('should work with additive styles', () => {
      const counter = lowerRoman;
      expect(counter.maxMarkerLenInRange(1, 100)).toBe(
        8 + DEFAULT_SUFFIX.length
      );
    });
    it('should account for padding', () => {
      const counter = decimal.withPadLeft(4, ' ');
      expect(counter.maxMarkerLenInRange(0, 9)).toBe(4 + DEFAULT_SUFFIX.length);
    });
    it('should account for negative', () => {
      const counter = persian;
      expect(counter.maxMarkerLenInRange(-9, -1)).toBe(
        2 + DEFAULT_SUFFIX.length
      );
      expect(counter.maxMarkerLenInRange(-9, 9)).toBe(
        2 + DEFAULT_SUFFIX.length
      );
      expect(counter.maxMarkerLenInRange(-1, 200)).toBe(
        3 + DEFAULT_SUFFIX.length
      );
    });
  });
});
