import { DEFAULT_SUFFIX } from '../constants';
import CounterStyle from '../CounterStyle';
import decimal from '../presets/decimal';
import lowerGreek from '../presets/lowerGreek';
import lowerRoman from '../presets/lowerRoman';
import persian from '../presets/persian';

test('Custom cyclic counter', () => {
  const counter = CounterStyle.cyclic('>').withSuffix(null);
  expect(counter.renderCounter(1)).toBe('>');
  expect(counter.renderCounter(5)).toBe('>');
});

test('Custom fixed counter', () => {
  const counter = CounterStyle.fixed('x', 'y', 'z');
  expect(counter.renderCounter(1)).toBe('x');
  expect(counter.renderCounter(2)).toBe('y');
  expect(counter.renderCounter(3)).toBe('z');
  expect(counter.renderCounter(4)).toBe('4');
});

test('Custom symbolic counter', () => {
  const counter = CounterStyle.symbolic('*', '&');
  expect(counter.renderCounter(1)).toBe('*');
  expect(counter.renderMarker(1)).toBe('*' + DEFAULT_SUFFIX);
  expect(counter.renderCounter(2)).toBe('&');
  expect(counter.renderCounter(3)).toBe('**');
  expect(counter.renderCounter(4)).toBe('&&');
  expect(counter.renderCounter(5)).toBe('***');
});

test('Custom alphabetic counter', () => {
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

test('Custom numeric counter', () => {
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

test('Custom additive counter', () => {
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

test('Negative decorator', () => {
  const counter = decimal.withNegative('(', ')');
  expect(counter.renderCounter(-2)).toBe('(2)');
  expect(counter.renderCounter(-1)).toBe('(1)');
  expect(counter.renderMarker(-1)).toBe('(1)' + DEFAULT_SUFFIX);
  expect(counter.renderCounter(0)).toBe('0');
  expect(counter.renderCounter(1)).toBe('1');
  expect(counter.renderCounter(2)).toBe('2');
});

test('Left padding decorator', () => {
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

test('Right padding decorator', () => {
  const counter = decimal.withPadRight(3, ' ').withSuffix(null);
  expect(counter.renderCounter(1)).toBe('1  ');
  expect(counter.renderCounter(20)).toBe('20 ');
  expect(counter.renderCounter(300)).toBe('300');
  expect(counter.renderCounter(4000)).toBe('4000');
  expect(counter.renderCounter(-5)).toBe('-5 ');
});

test('Fallback', () => {
  const counter = lowerGreek.withRange(0, 10).withSuffix('  ');
  expect(counter.renderMarker(11)).toBe('11  ');
});

describe('CounterStylerenderCounterer::getMaxLenInRange', () => {
  it('should work with numeric styles', () => {
    const counter = decimal;
    expect(counter.maxMarkerLenInRange(1, 9)).toBe(1 + DEFAULT_SUFFIX.length);
    expect(counter.maxMarkerLenInRange(1, 10)).toBe(2 + DEFAULT_SUFFIX.length);
    expect(counter.maxMarkerLenInRange(0, 100)).toBe(3 + DEFAULT_SUFFIX.length);
  });
  it('should work with alphabetic styles', () => {
    const counter = lowerGreek;
    expect(counter.maxMarkerLenInRange(1, 2)).toBe(1 + DEFAULT_SUFFIX.length);
    expect(counter.maxMarkerLenInRange(1, 24)).toBe(1 + DEFAULT_SUFFIX.length);
    expect(counter.maxMarkerLenInRange(1, 25)).toBe(2 + DEFAULT_SUFFIX.length);
  });
  it('should work with cyclic styles', () => {
    const counter = CounterStyle.cyclic('<>');
    expect(counter.maxMarkerLenInRange(0, 100)).toBe(2 + DEFAULT_SUFFIX.length);
  });
  it('should work with fixed styles', () => {
    const counter = CounterStyle.fixed('x', 'y', 'z');
    expect(counter.maxMarkerLenInRange(1, 3)).toBe(1 + DEFAULT_SUFFIX.length);
    expect(counter.maxMarkerLenInRange(1, 10)).toBe(2 + DEFAULT_SUFFIX.length);
  });
  it('should work with additive styles', () => {
    const counter = lowerRoman;
    expect(counter.maxMarkerLenInRange(1, 100)).toBe(8 + DEFAULT_SUFFIX.length);
  });
  it('should account for padding', () => {
    const counter = decimal.withPadLeft(4, ' ');
    expect(counter.maxMarkerLenInRange(0, 9)).toBe(4 + DEFAULT_SUFFIX.length);
  });
  it('should account for negative', () => {
    const counter = persian;
    expect(counter.maxMarkerLenInRange(-9, -1)).toBe(2 + DEFAULT_SUFFIX.length);
    expect(counter.maxMarkerLenInRange(-9, 9)).toBe(2 + DEFAULT_SUFFIX.length);
    expect(counter.maxMarkerLenInRange(-1, 200)).toBe(
      3 + DEFAULT_SUFFIX.length
    );
  });
});
