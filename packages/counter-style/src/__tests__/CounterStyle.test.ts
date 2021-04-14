import { DEFAULT_SUFFIX } from '../constants';
import CounterStyle from '../CounterStyle';
import { CounterStyleRendererInt } from '../internal-types';
import lowerRoman from '../presets/lowerRoman';

describe('CounterStyle', () => {
  describe('::cyclic', () => {
    it('should comply with specs', () => {
      const counter = CounterStyle.cyclic('>').withSuffix(null);
      expect(counter.renderCounter(1)).toBe('>');
      expect(counter.renderCounter(5)).toBe('>');
    });

    test('with multiple symbols', () => {
      const counter = CounterStyle.cyclic('>', '<>', '<');
      expect(counter.renderCounter(1)).toBe('>');
      expect(counter.renderCounter(2)).toBe('<>');
      expect(counter.renderCounter(3)).toBe('<');
      expect(counter.maxCounterLenInRange(2, 2)).toBe(2);
      expect(counter.maxCounterLenInRange(1, 3)).toBe(2);
      expect(counter.maxCounterLenInRange(2, 3)).toBe(2);
      expect(counter.maxCounterLenInRange(3, 3)).toBe(1);
      expect(counter.maxCounterLenInRange(1, 1000)).toBe(2);
    });

    test('with multi-units codepoints', () => {
      const counter = CounterStyle.cyclic('👍').withSuffix(null);
      expect(counter.renderCounter(1)).toBe('👍');
      expect(counter.maxCounterLenInRange(1, 1)).toBe(1);
    });
  });

  test('with multiple symbols', () => {
    const counter = CounterStyle.cyclic('a', 'b', 'c').withSuffix(null);
    expect(counter.renderCounter(1)).toBe('a');
  });

  describe('::fixed', () => {
    it('should comply with specs', () => {
      const counter = CounterStyle.fixed('x', 'xy', 'xyz');
      expect(counter.renderCounter(1)).toBe('x');
      expect(counter.renderCounter(2)).toBe('xy');
      expect(counter.renderCounter(3)).toBe('xyz');
      expect(counter.renderCounter(4)).toBe('4');
      expect(counter.maxCounterLenInRange(1, 3)).toBe(3);
      expect(counter.maxCounterLenInRange(2, 3)).toBe(3);
      expect(counter.maxCounterLenInRange(3, 3)).toBe(3);
    });

    test('with multi-units codepoints', () => {
      const counter = CounterStyle.fixed('👍').withSuffix(null);
      expect(counter.renderCounter(1)).toBe('👍');
      expect(counter.maxCounterLenInRange(1, 1)).toBe(1);
    });
  });

  describe('::symbolic', () => {
    it('should comply with the specs', () => {
      const counter = CounterStyle.symbolic('*', '⁑', '††', '‡');
      expect(counter.renderCounter(1)).toBe('*');
      expect(counter.renderCounter(2)).toBe('⁑');
      expect(counter.renderCounter(3)).toBe('††');
      expect(counter.renderCounter(4)).toBe('‡');
      expect(counter.renderCounter(5)).toBe('**');
      expect(counter.renderCounter(6)).toBe('⁑⁑');
      expect(counter.renderCounter(7)).toBe('††††');
      expect(counter.maxCounterLenInRange(1, 3)).toBe(2);
      expect(counter.maxCounterLenInRange(1, 7)).toBe(4);
      expect(counter.maxCounterLenInRange(3, 5)).toBe(2);
      expect(counter.maxCounterLenInRange(1, 3)).toBe(2);
    });
    test('with multi-units codepoints', () => {
      const counter = CounterStyle.symbolic('👍').withSuffix(null);
      expect(counter.renderCounter(1)).toBe('👍');
      expect(counter.maxCounterLenInRange(1, 1)).toBe(1);
    });
  });

  test('::alphabetic', () => {
    const counter = CounterStyle.alphabetic('T', 'F');
    expect(counter.renderCounter(1)).toBe('T');
    expect(counter.renderMarker(1)).toBe('T' + DEFAULT_SUFFIX);
    expect(counter.renderCounter(2)).toBe('F');
    expect(counter.renderCounter(3)).toBe('TT');
    expect(counter.renderCounter(4)).toBe('TF');
    expect(counter.renderCounter(5)).toBe('FT');
    expect(counter.renderCounter(6)).toBe('FF');
    expect(counter.renderCounter(7)).toBe('TTT');
  });

  test('::alphabeticFromUnicodeRange', () => {
    const counter = CounterStyle.alphabeticFromUnicodeRange(97, 26).withRange(
      0,
      Infinity
    );
    expect(counter.renderCounter(0)).toBe('0');
    expect(counter.renderCounter(1)).toBe('a');
  });

  test('::numeric', () => {
    const counter = CounterStyle.numeric('0', '1', '2');
    expect(counter.renderCounter(0)).toBe('0');
    expect(counter.renderMarker(0)).toBe('0' + DEFAULT_SUFFIX);
    expect(counter.renderCounter(1)).toBe('1');
    expect(counter.renderCounter(2)).toBe('2');
    expect(counter.renderCounter(3)).toBe('10');
    expect(counter.renderCounter(4)).toBe('11');
    expect(counter.renderCounter(5)).toBe('12');
    expect(counter.renderCounter(6)).toBe('20');
  });

  describe('::additive', () => {
    it('should render counters such as defined in CSS', () => {
      const counter = CounterStyle.additive({
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6'
      });
      expect(counter.renderCounter(1)).toBe('1');
      expect(counter.renderMarker(1)).toBe('1' + DEFAULT_SUFFIX);
      expect(counter.renderCounter(2)).toBe('2');
      expect(counter.renderCounter(3)).toBe('3');
      expect(counter.renderCounter(11)).toBe('65');
      expect(counter.renderCounter(12)).toBe('66');
      expect(counter.renderCounter(13)).toBe('661');
    });
    it('should infer range from symbols', () => {
      expect(
        (CounterStyle.additive({}) as CounterStyleRendererInt).engine.specs
          .range
      ).toMatchObject({ min: 0, max: -1 });
      expect(
        (CounterStyle.additive({ 0: '0' }) as CounterStyleRendererInt).engine
          .specs.range
      ).toMatchObject({ min: 0, max: 0 });
      expect(
        (CounterStyle.additive({ 1: '0', 2: '1' }) as CounterStyleRendererInt)
          .engine.specs.range
      ).toMatchObject({ min: 1, max: Infinity });
      expect(
        (CounterStyle.additive({ 1: '0', 2: '1' }) as CounterStyleRendererInt)
          .engine.specs.range
      ).toMatchObject({ min: 1, max: Infinity });
    });
    it('should render fallback when incomplete symbols where specified', () => {
      const incompleteRenderer = CounterStyle.additive({ 0: '*', 2: 'x' });
      expect(incompleteRenderer.renderCounter(0)).toBe('*');
      expect(incompleteRenderer.renderCounter(1)).toBe('1');
      expect(incompleteRenderer.renderCounter(2)).toBe('x');
      expect(incompleteRenderer.renderCounter(3)).toBe('3');
    });
    it('should have correct counter length computation', () => {
      const counter = lowerRoman;
      // 1 = i
      expect(counter.maxCounterLenInRange(1, 1)).toBe(1);
      // 3 = iii
      expect(counter.maxCounterLenInRange(2, 4)).toBe(3);
      // 88 = lxxxviii
      expect(counter.maxCounterLenInRange(88, 88)).toBe(8);
      // 89 = lxxxix
      expect(counter.maxCounterLenInRange(89, 100)).toBe(6);
      // 90 = xc
      expect(counter.maxCounterLenInRange(90, 90)).toBe(2);
    });
  });
});
