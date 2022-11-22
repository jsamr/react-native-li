import {
  simpleChineseInformal,
  simpleChineseFormal,
  traditionalChineseInformal,
  traditionalChineseFormal
} from '../presets/chinese';

test('simpleChineseInformal', () => {
  const counter = simpleChineseInformal.withSuffix(null);
  expect(counter.renderMarker(-11)).toBe('负十一');
  expect(counter.renderMarker(-10)).toBe('负十');
  expect(counter.renderMarker(-9)).toBe('负九');

  expect(counter.renderMarker(0)).toBe('零');
  expect(counter.renderMarker(1)).toBe('一');
  expect(counter.renderMarker(2)).toBe('二');
  expect(counter.renderMarker(3)).toBe('三');
  expect(counter.renderMarker(4)).toBe('四');
  expect(counter.renderMarker(5)).toBe('五');
  expect(counter.renderMarker(6)).toBe('六');
  expect(counter.renderMarker(7)).toBe('七');
  expect(counter.renderMarker(8)).toBe('八');
  expect(counter.renderMarker(9)).toBe('九');

  expect(counter.renderMarker(10)).toBe('十');
  expect(counter.renderMarker(11)).toBe('十一');
  expect(counter.renderMarker(12)).toBe('十二');
  expect(counter.renderMarker(43)).toBe('四十三');
  expect(counter.renderMarker(80)).toBe('八十');
  expect(counter.renderMarker(99)).toBe('九十九');
  expect(counter.renderMarker(100)).toBe('一百');
  expect(counter.renderMarker(101)).toBe('一百零一');
  expect(counter.renderMarker(222)).toBe('二百二十二');
  expect(counter.renderMarker(540)).toBe('五百四十');
  expect(counter.renderMarker(999)).toBe('九百九十九');
  expect(counter.renderMarker(1000)).toBe('一千');
  expect(counter.renderMarker(1005)).toBe('一千零五');
  expect(counter.renderMarker(1060)).toBe('一千零六十');
  expect(counter.renderMarker(1065)).toBe('一千零六十五');
  expect(counter.renderMarker(1800)).toBe('一千八百');
  expect(counter.renderMarker(1860)).toBe('一千八百六十');
  expect(counter.renderMarker(1865)).toBe('一千八百六十五');
  expect(counter.renderMarker(5865)).toBe('五千八百六十五');
  expect(counter.renderMarker(7005)).toBe('七千零五');
  expect(counter.renderMarker(7800)).toBe('七千八百');
  expect(counter.renderMarker(7865)).toBe('七千八百六十五');
  expect(counter.renderMarker(9999)).toBe('九千九百九十九');
});

test('simpleChineseFormal', () => {
  const counter = simpleChineseFormal.withSuffix(null);
  expect(counter.renderMarker(-11)).toBe('负壹拾壹');
  expect(counter.renderMarker(-10)).toBe('负壹拾');
  expect(counter.renderMarker(-9)).toBe('负玖');

  expect(counter.renderMarker(0)).toBe('零');
  expect(counter.renderMarker(1)).toBe('壹');
  expect(counter.renderMarker(2)).toBe('贰');
  expect(counter.renderMarker(3)).toBe('叁');
  expect(counter.renderMarker(4)).toBe('肆');
  expect(counter.renderMarker(5)).toBe('伍');
  expect(counter.renderMarker(6)).toBe('陆');
  expect(counter.renderMarker(7)).toBe('柒');
  expect(counter.renderMarker(8)).toBe('捌');
  expect(counter.renderMarker(9)).toBe('玖');

  expect(counter.renderMarker(10)).toBe('壹拾');
  expect(counter.renderMarker(11)).toBe('壹拾壹');
  expect(counter.renderMarker(12)).toBe('壹拾贰');
  expect(counter.renderMarker(43)).toBe('肆拾叁');
  expect(counter.renderMarker(77)).toBe('柒拾柒');
  expect(counter.renderMarker(80)).toBe('捌拾');
  expect(counter.renderMarker(99)).toBe('玖拾玖');
  expect(counter.renderMarker(100)).toBe('壹佰');
  expect(counter.renderMarker(101)).toBe('壹佰零壹');
  expect(counter.renderMarker(222)).toBe('贰佰贰拾贰');
  expect(counter.renderMarker(540)).toBe('伍佰肆拾');
  expect(counter.renderMarker(999)).toBe('玖佰玖拾玖');
  expect(counter.renderMarker(1000)).toBe('壹仟');
  expect(counter.renderMarker(1005)).toBe('壹仟零伍');
  expect(counter.renderMarker(1060)).toBe('壹仟零陆拾');
  expect(counter.renderMarker(1065)).toBe('壹仟零陆拾伍');
  expect(counter.renderMarker(1800)).toBe('壹仟捌佰');
  expect(counter.renderMarker(1860)).toBe('壹仟捌佰陆拾');
  expect(counter.renderMarker(1865)).toBe('壹仟捌佰陆拾伍');
  expect(counter.renderMarker(5865)).toBe('伍仟捌佰陆拾伍');
  expect(counter.renderMarker(7005)).toBe('柒仟零伍');
  expect(counter.renderMarker(7800)).toBe('柒仟捌佰');
  expect(counter.renderMarker(7865)).toBe('柒仟捌佰陆拾伍');
  expect(counter.renderMarker(9999)).toBe('玖仟玖佰玖拾玖');
});

test('traditionalChineseInformal', () => {
  const counter = traditionalChineseInformal.withSuffix(null);
  expect(counter.renderMarker(-11)).toBe('負十一');
  expect(counter.renderMarker(-10)).toBe('負十');
  expect(counter.renderMarker(-9)).toBe('負九');

  expect(counter.renderMarker(0)).toBe('零');
  expect(counter.renderMarker(1)).toBe('一');
  expect(counter.renderMarker(2)).toBe('二');
  expect(counter.renderMarker(3)).toBe('三');
  expect(counter.renderMarker(4)).toBe('四');
  expect(counter.renderMarker(5)).toBe('五');
  expect(counter.renderMarker(6)).toBe('六');
  expect(counter.renderMarker(7)).toBe('七');
  expect(counter.renderMarker(8)).toBe('八');
  expect(counter.renderMarker(9)).toBe('九');

  expect(counter.renderMarker(10)).toBe('十');
  expect(counter.renderMarker(11)).toBe('十一');
  expect(counter.renderMarker(12)).toBe('十二');
  expect(counter.renderMarker(43)).toBe('四十三');
  expect(counter.renderMarker(77)).toBe('七十七');
  expect(counter.renderMarker(80)).toBe('八十');
  expect(counter.renderMarker(99)).toBe('九十九');
  expect(counter.renderMarker(100)).toBe('一百');
  expect(counter.renderMarker(101)).toBe('一百零一');
  expect(counter.renderMarker(222)).toBe('二百二十二');
  expect(counter.renderMarker(540)).toBe('五百四十');
  expect(counter.renderMarker(999)).toBe('九百九十九');
  expect(counter.renderMarker(1000)).toBe('一千');
  expect(counter.renderMarker(1005)).toBe('一千零五');
  expect(counter.renderMarker(1060)).toBe('一千零六十');
  expect(counter.renderMarker(1065)).toBe('一千零六十五');
  expect(counter.renderMarker(1800)).toBe('一千八百');
  expect(counter.renderMarker(1860)).toBe('一千八百六十');
  expect(counter.renderMarker(1865)).toBe('一千八百六十五');
  expect(counter.renderMarker(5865)).toBe('五千八百六十五');
  expect(counter.renderMarker(7005)).toBe('七千零五');
  expect(counter.renderMarker(7800)).toBe('七千八百');
  expect(counter.renderMarker(7865)).toBe('七千八百六十五');
  expect(counter.renderMarker(9999)).toBe('九千九百九十九');
});

test('traditionalChineseFormal', () => {
  const counter = traditionalChineseFormal.withSuffix(null);
  expect(counter.renderMarker(-11)).toBe('負壹拾壹');
  expect(counter.renderMarker(-10)).toBe('負壹拾');
  expect(counter.renderMarker(-9)).toBe('負玖');

  expect(counter.renderMarker(0)).toBe('零');
  expect(counter.renderMarker(1)).toBe('壹');
  expect(counter.renderMarker(2)).toBe('貳');
  expect(counter.renderMarker(3)).toBe('參');
  expect(counter.renderMarker(4)).toBe('肆');
  expect(counter.renderMarker(5)).toBe('伍');
  expect(counter.renderMarker(6)).toBe('陸');
  expect(counter.renderMarker(7)).toBe('柒');
  expect(counter.renderMarker(8)).toBe('捌');
  expect(counter.renderMarker(9)).toBe('玖');

  expect(counter.renderMarker(10)).toBe('壹拾');
  expect(counter.renderMarker(11)).toBe('壹拾壹');
  expect(counter.renderMarker(12)).toBe('壹拾貳');
  expect(counter.renderMarker(43)).toBe('肆拾參');
  expect(counter.renderMarker(77)).toBe('柒拾柒');
  expect(counter.renderMarker(80)).toBe('捌拾');
  expect(counter.renderMarker(99)).toBe('玖拾玖');
  expect(counter.renderMarker(100)).toBe('壹佰');
  expect(counter.renderMarker(101)).toBe('壹佰零壹');
  expect(counter.renderMarker(222)).toBe('貳佰貳拾貳');
  expect(counter.renderMarker(540)).toBe('伍佰肆拾');
  expect(counter.renderMarker(999)).toBe('玖佰玖拾玖');
  expect(counter.renderMarker(1000)).toBe('壹仟');
  expect(counter.renderMarker(1005)).toBe('壹仟零伍');
  expect(counter.renderMarker(1060)).toBe('壹仟零陸拾');
  expect(counter.renderMarker(1065)).toBe('壹仟零陸拾伍');
  expect(counter.renderMarker(1800)).toBe('壹仟捌佰');
  expect(counter.renderMarker(1860)).toBe('壹仟捌佰陸拾');
  expect(counter.renderMarker(1865)).toBe('壹仟捌佰陸拾伍');
  expect(counter.renderMarker(5865)).toBe('伍仟捌佰陸拾伍');
  expect(counter.renderMarker(7005)).toBe('柒仟零伍');
  expect(counter.renderMarker(7800)).toBe('柒仟捌佰');
  expect(counter.renderMarker(7865)).toBe('柒仟捌佰陸拾伍');
  expect(counter.renderMarker(9999)).toBe('玖仟玖佰玖拾玖');
});
