import { DEFAULT_SUFFIX } from '../constants';
import CounterStyle from '../CounterStyle';
import decimal from '../presets/decimal';
import lowerGreek from '../presets/lowerGreek';
import lowerRoman from '../presets/lowerRoman';
import persian from '../presets/persian';

test('Custom cyclic counter', () => {
  const counter = CounterStyle.cyclic('>').withSuffix(null);
  expect(counter.render(1)).toBe('>');
  expect(counter.render(5)).toBe('>');
});

test('Custom fixed counter', () => {
  const counter = CounterStyle.fixed('x', 'y', 'z').withSuffix(null);
  expect(counter.render(1)).toBe('x');
  expect(counter.render(2)).toBe('y');
  expect(counter.render(3)).toBe('z');
  expect(counter.render(4)).toBe('4. ');
});

test('Custom symbolic counter', () => {
  const counter = CounterStyle.symbolic('*', '&').withSuffix(null);
  expect(counter.render(1)).toBe('*');
  expect(counter.render(2)).toBe('&');
  expect(counter.render(3)).toBe('**');
  expect(counter.render(4)).toBe('&&');
  expect(counter.render(5)).toBe('***');
});

test('Custom alphabetic counter', () => {
  const counter = CounterStyle.alphabetic('T', 'F').withSuffix('');
  expect(counter.render(1)).toBe('T');
  expect(counter.render(2)).toBe('F');
  expect(counter.render(3)).toBe('TT');
  expect(counter.render(4)).toBe('TF');
  expect(counter.render(5)).toBe('FT');
  expect(counter.render(6)).toBe('FF');
  expect(counter.render(7)).toBe('TTT');
});

test('Custom numeric counter', () => {
  const counter = CounterStyle.numeric('0', '1', '2').withSuffix(null);
  expect(counter.render(0)).toBe('0');
  expect(counter.render(1)).toBe('1');
  expect(counter.render(2)).toBe('2');
  expect(counter.render(3)).toBe('10');
  expect(counter.render(4)).toBe('11');
  expect(counter.render(5)).toBe('12');
  expect(counter.render(6)).toBe('20');
});

test('Custom additive counter', () => {
  const counter = CounterStyle.additive({
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6'
  }).withSuffix(null);
  expect(counter.render(1)).toBe('1');
  expect(counter.render(2)).toBe('2');
  expect(counter.render(3)).toBe('3');
  expect(counter.render(11)).toBe('65');
  expect(counter.render(12)).toBe('66');
  expect(counter.render(13)).toBe('661');
});

test('Negative decorator', () => {
  const counter = decimal.withNegative('(', ')').withSuffix(null);
  expect(counter.render(-2)).toBe('(2)');
  expect(counter.render(-1)).toBe('(1)');
  expect(counter.render(0)).toBe('0');
  expect(counter.render(1)).toBe('1');
  expect(counter.render(2)).toBe('2');
});

test('Left padding decorator', () => {
  const counter = decimal
    .withPadLeft(3, '0')
    .withNegative('-')
    .withSuffix('..');
  expect(counter.render(1)).toBe('001..');
  expect(counter.render(20)).toBe('020..');
  expect(counter.render(300)).toBe('300..');
  expect(counter.render(4000)).toBe('4000..');
  expect(counter.render(-5)).toBe('-05..');
});

test('Right padding decorator', () => {
  const counter = decimal.withPadRight(3, ' ').withSuffix(null);
  expect(counter.render(1)).toBe('1  ');
  expect(counter.render(20)).toBe('20 ');
  expect(counter.render(300)).toBe('300');
  expect(counter.render(4000)).toBe('4000');
  expect(counter.render(-5)).toBe('-5 ');
});

test('Fallback', () => {
  const counter = lowerGreek.withRange(0, 10).withSuffix('  ');
  expect(counter.render(11)).toBe('11. ');
});

describe('CounterStyleRenderer::getMaxLenInRange', () => {
  it('should work with numeric styles', () => {
    const counter = decimal;
    expect(counter.getMaxLenInRange(1, 9)).toBe(1 + DEFAULT_SUFFIX.length);
    expect(counter.getMaxLenInRange(1, 10)).toBe(2 + DEFAULT_SUFFIX.length);
    expect(counter.getMaxLenInRange(0, 100)).toBe(3 + DEFAULT_SUFFIX.length);
  });
  it('should work with alphabetic styles', () => {
    const counter = lowerGreek;
    expect(counter.getMaxLenInRange(1, 2)).toBe(1 + DEFAULT_SUFFIX.length);
    expect(counter.getMaxLenInRange(1, 24)).toBe(1 + DEFAULT_SUFFIX.length);
    expect(counter.getMaxLenInRange(1, 25)).toBe(2 + DEFAULT_SUFFIX.length);
  });
  it('should work with cyclic styles', () => {
    const counter = CounterStyle.cyclic('<>');
    expect(counter.getMaxLenInRange(0, 100)).toBe(2 + DEFAULT_SUFFIX.length);
  });
  it('should work with fixed styles', () => {
    const counter = CounterStyle.fixed('x', 'y', 'z');
    expect(counter.getMaxLenInRange(1, 3)).toBe(1 + DEFAULT_SUFFIX.length);
    expect(counter.getMaxLenInRange(1, 10)).toBe(2 + DEFAULT_SUFFIX.length);
  });
  it('should work with additive styles', () => {
    const counter = lowerRoman;
    expect(counter.getMaxLenInRange(1, 100)).toBe(8 + DEFAULT_SUFFIX.length);
  });
  it('should account for padding', () => {
    const counter = decimal.withPadLeft(4, ' ');
    expect(counter.getMaxLenInRange(0, 9)).toBe(4 + DEFAULT_SUFFIX.length);
  });
  it('should account for negative', () => {
    const counter = persian;
    expect(counter.getMaxLenInRange(-9, -1)).toBe(2 + DEFAULT_SUFFIX.length);
    expect(counter.getMaxLenInRange(-9, 9)).toBe(2 + DEFAULT_SUFFIX.length);
    expect(counter.getMaxLenInRange(-1, 200)).toBe(3 + DEFAULT_SUFFIX.length);
  });
});
