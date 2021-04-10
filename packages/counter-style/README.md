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
  <!-- <a href="https://discord.gg/3B9twTMEzb">
      <img
      src="https://img.shields.io/discord/736906960041148476?label=discord"
      alt="Discord"
    />
  </a> -->
</p>

<p align="center">
  A slim <a href="https://drafts.csswg.org/css-counter-styles-3">CSS Counter Styles Level 3 compliant</a> library with 47 presets including<br> <b>Arabic</b>, <b>Persian</b>, <b>Thai</b>, <b>Hebrew</b>, <b>Roman</b>, <b>Katana</b>...<br><br>
  <sup>The core is 1.4kB minified and gzipped. Each preset is distributed as a separate module.<br>Available in both CommonJS and ECMAScript modules. <br>Optimized for metro (React Native) and Webpack bundlers.<br>
  Based on <a href="https://github.com/beanandbean/counter-style">prior work from Whang Shuwei</a>
  </sup>
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

expect(arabicIndic.render(78)).toBe('٧٨. ');
```

### Creating custom style renderers

The API follows closely the specs for CSS `@counter-style` at rule. The default export ([CounterStyle](./docs/counter-style.counterstyle.md)) is a static object with methods to build [CounterStyleRenderer](./docs/counter-style.counterstylerenderer.md). In the
below example, we're using [the symbolic counter system](https://www.w3.org/TR/css-counter-styles-3/#symbolic-system).

```js
import CounterStyle from '@jsamr/counter-style';

// Default suffix is ". ", as per the specs.
const funky = CounterStyle.symbolic('*', '&').withSuffix(null);

// Expect comes from jest testing framework.
// Just a showcase of expected returned values.
expect(funky.render(1)).toBe('*');
expect(funky.render(2)).toBe('&');
expect(funky.render(3)).toBe('**');
expect(funky.render(4)).toBe('&&');
expect(funky.render(5)).toBe('***');
expect(funky.getMaxLenInRange(1, 5)).toBe(3);
```

All renderers can be chained to create variants, such as `withSuffix`,
`withPaddingLeft`, ... See [available methods in the docs.](./docs/counter-style.counterstylerenderer.md)

### API reference

**The API reference [is available here](./docs/counter-style.md).**

### Limitations

- `speakAs` hasn't been implemented yet.
- Only `disk`, `circle` and `square` symbolic presets are provided.
- [Chinese styles](https://www.w3.org/TR/css-counter-styles-3/#limited-chinese)
  haven't been implemented, requiring custom logic. PRs welcomed!
- Only textual representations are supported. Images are not.
- Additive systems might have "holes" in their range coverage. For
  example, an additive system which has no representation for "1" will not
  translate odd indexes. This library behavior for such edge cases is unspecified.
- `getMaxLenInRange` method doesn't take into account [unicode graphemes clusters](https://www.unicode.org/reports/tr29/tr29-37.html#Grapheme_Cluster_Boundaries).
