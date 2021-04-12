import { DEFAULT_SUFFIX } from '../constants';
import CounterStyle from '../CounterStyle';

describe('CounterStyle', () => {
  test('::cyclic', () => {
    const counter = CounterStyle.cyclic('>').withSuffix(null);
    expect(counter.renderCounter(1)).toBe('>');
    expect(counter.renderCounter(5)).toBe('>');
  });

  test('::cyclic with multi-units codepoints', () => {
    const counter = CounterStyle.cyclic('👍').withSuffix(null);
    expect(counter.renderCounter(1)).toBe('👍');
    expect(counter.maxCounterLenInRange(1, 1)).toBe(1);
  });

  test('::fixed', () => {
    const counter = CounterStyle.fixed('x', 'y', 'z');
    expect(counter.renderCounter(1)).toBe('x');
    expect(counter.renderCounter(2)).toBe('y');
    expect(counter.renderCounter(3)).toBe('z');
    expect(counter.renderCounter(4)).toBe('4');
  });

  test('::fixed with multi-units codepoints', () => {
    const counter = CounterStyle.fixed('👍').withSuffix(null);
    expect(counter.renderCounter(1)).toBe('👍');
    expect(counter.maxCounterLenInRange(1, 1)).toBe(1);
  });

  test('::symbolic', () => {
    const counter = CounterStyle.symbolic('*', '&');
    expect(counter.renderCounter(1)).toBe('*');
    expect(counter.renderMarker(1)).toBe('*' + DEFAULT_SUFFIX);
    expect(counter.renderCounter(2)).toBe('&');
    expect(counter.renderCounter(3)).toBe('**');
    expect(counter.renderCounter(4)).toBe('&&');
    expect(counter.renderCounter(5)).toBe('***');
  });

  test('::symbolic with multi-units codepoints', () => {
    const counter = CounterStyle.symbolic('👍').withSuffix(null);
    expect(counter.renderCounter(1)).toBe('👍');
    expect(counter.maxCounterLenInRange(1, 1)).toBe(1);
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

  test('::additive', () => {
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
});
