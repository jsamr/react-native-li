<h1 align="center">@jsamr/counter-style</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@jsamr/counter-style"
    ><img
      src="https://img.shields.io/npm/v/@jsamr/counter-style"
      alt="npm"
  /></a>
  <a href="https://semver.org/spec/v2.0.0.html"
    ><img
      src="https://img.shields.io/badge/semver-2.0.0-e10079.svg"
      alt="semver"
  /></a>
  <a href="https://codecov.io/gh/jsamr/react-native-li?flag=counter-style"
    ><img
      src="https://codecov.io/gh/jsamr/react-native-li/branch/master/graph/badge.svg?flag=counter-style"
      alt="codecov"
  /></a>
  <a
    href="https://github.com/jsamr/react-native-li/actions?query=branch%3Amaster+workflow%3Acounter-style"
    ><img
      src="https://github.com/jsamr/react-native-li/workflows/counter-style/badge.svg?branch=master"
      alt="CI"
  /></a>
  <a href="https://www.npmjs.com/package/@jsamr/counter-style">
    <img
      src="https://img.shields.io/npm/dm/@jsamr/counter-style.svg"
      alt="DL/month"
    />
  </a>
</p>

<p align="center">
  A slim <a href="https://drafts.csswg.org/css-counter-styles-3">CSS Counter Styles Level 3 compliant</a> library with <a href="./src/presets">47 presets</a> including<br> <b>Arabic</b>, <b>Persian</b>, <b>Thai</b>, <b>Hebrew</b>, <b>Roman</b>, <b>Katana</b>...<br><br>
  The core is less than 1.7kB minified and gzipped.<br>
  Each preset is distributed as a separate module.<br>
  Available in both CommonJS and ECMAScript modules. <br>
  Targets ECMAScript 2015.<br>
  Optimized for metro (React Native) and Webpack bundlers.<br>
  Based on <a href="https://github.com/beanandbean/counter-style">prior work from Whang Shuwei</a>.
</p>

<hr/>

### Install

```sh
npm add --save @jsamr/counter-style
```

```sh
yarn add @jsamr/counter-style
```

### Using presets

**This library exports 47 presets. [Find your preset here.](./src/presets)** Each preset is accessible in a separate module to limit bundle size.

```js
import arabicIndic from '@jsamr/counter-style/presets/arabicIndic';

expect(arabicIndic.renderMarker(78)).toBe('٧٨. ');
```

> PRs are welcomed to support other presets. Very easy to implement thanks to [this W3C resource](https://www.w3.org/TR/predefined-counter-styles/).


<a name="custom-style-renderers">

### Creating custom style renderers

The API follows closely the specs for CSS `@counter-style` at rule. The default export ([CounterStyle](./docs/counter-style.counterstyle.md)) is a static object with methods to build [CounterStyleRenderer](./docs/counter-style.counterstylerenderer.md).

#### Example 1: a lower Russian alphabet renderer

In the
below example, we're using [the alphabetic counter system](https://www.w3.org/TR/css-counter-styles-3/#alphabetic-system) and `alphabeticFromUnicodeRange` builder which allows to specify a contiguous unicode range. For non-contiguous ranges, use the `alphabetic` builder.

```js
import CounterStyle from '@jsamr/counter-style';

const lowerRussian = CounterStyle.alphabeticFromUnicodeRange(
  0x430, // а
  28
).withSuffix(') ');

// Expect comes from jest testing framework.
// Just a showcase of expected returned values.
expect(lowerRussian.renderCounter(1)).toBe('а');
expect(lowerRussian.renderMarker(1)).toBe('а) ');
expect(lowerRussian.renderCounter(2)).toBe('б');
expect(lowerRussian.renderCounter(3)).toBe('в');
expect(lowerRussian.renderMarker(4)).toBe('г) ');
expect(lowerRussian.renderMarker(5)).toBe('д) ');
expect(lowerRussian.renderCounter(29)).toBe('аа');
expect(lowerRussian.maxMarkerLenInRange(1, 5)).toBe(3);
expect(lowerRussian.maxCounterLenInRange(1, 5)).toBe(1);
```
Reference: [W3C Ready-made Counter Styles: Cyrillic styles](https://www.w3.org/TR/predefined-counter-styles/#cyrillic-styles).

#### Example 2: a "Funky" symbolic renderer

In the
below example, we're using [the symbolic counter system](https://www.w3.org/TR/css-counter-styles-3/#symbolic-system).
Note that `withSuffix(null)` removes default suffix.

```js
import CounterStyle from '@jsamr/counter-style';

// Default suffix is ". ", as per the specs.
const funky = CounterStyle.symbolic('*', '&').withSuffix(null);

// Expect comes from jest testing framework.
// Just a showcase of expected returned values.
expect(funky.renderMarker(1)).toBe('*');
expect(funky.renderMarker(2)).toBe('&');
expect(funky.renderMarker(3)).toBe('**');
expect(funky.renderMarker(4)).toBe('&&');
expect(funky.renderMarker(5)).toBe('***');
expect(funky.maxMarkerLenInRange(1, 5)).toBe(3);
expect(funky.maxCounterLenInRange(1, 5)).toBe(3);
```

All renderers can be chained to create variants, such as `withSuffix`,
`withPaddingLeft`, ... See [available methods in the docs.](./docs/counter-style.counterstylerenderer.md)

### API reference

**The API reference [is available here](./docs/counter-style.md).**

### Caveats

- Instead of a normal space character, a non-breaking space is used for default
  prefixes. This is because this library primary usage is for React Native. On
  iOS, `Text` elements get trimmed of normal space characters.
- In **numeric** and **alphabetic** systems , one UTF-16 code unit per symbol
  must be used. Otherwise, length computation will be erroneous. If you really
  need multi code units per symbol however, you can still set a custom length
  computer via `withMaxLenComputer`.
- When using padding (`withPadding`) and negative (`withNegative`) symbols, one
  UTF-16 code unit per symbol must be used. Otherwise, length computation will
  be erroneous.
- Never use combining characters. [Grapheme
  clusters](https://www.w3.org/TR/css-text-3/#grapheme-cluster) will be
  considered distinct characters. Beware that is the case for some emojis, see
  [this SO thread](https://stackoverflow.com/q/54369513/2779871).
- Don't define incomplete additive systems which have holes in their range
  coverage. For example, an additive system which has no representation for "1"
  will not translate odd indexes.

### Limitations

- `speakAs` hasn't been implemented yet.
- [Chinese renderers](https://www.w3.org/TR/css-counter-styles-3/#limited-chinese)
  haven't been implemented, requiring custom logic. PRs welcomed!
- Only textual symbols are supported. Images are not.
