<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@jsamr/counter-style](./counter-style.md) &gt; [CounterStyleRenderer](./counter-style.counterstylerenderer.md) &gt; [withPadRight](./counter-style.counterstylerenderer.withpadright.md)

## CounterStyleRenderer.withPadRight() method

Create a new renderer which adds padding to the right.

See [CSS Counter Styles Level 3, Zero-Padding and Constant-Width Representations: the pad descriptor](https://www.w3.org/TR/css-counter-styles-3/#counter-style-pad)<!-- -->.

<b>Signature:</b>

```typescript
withPadRight(length: number, pad: string): CounterStyleRenderer;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  length | number | The total length to which padding should be added. |
|  pad | string | The character to pad. |

<b>Returns:</b>

[CounterStyleRenderer](./counter-style.counterstylerenderer.md)

## Remarks

If you need to pad with spaces, beware on React Native you should use non-breaking spaces on iOS (<!-- -->\\<!-- -->u00A0) or the padding might get trimmed.

