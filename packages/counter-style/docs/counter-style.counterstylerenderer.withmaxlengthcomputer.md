<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@jsamr/counter-style](./counter-style.md) &gt; [CounterStyleRenderer](./counter-style.counterstylerenderer.md) &gt; [withMaxLengthComputer](./counter-style.counterstylerenderer.withmaxlengthcomputer.md)

## CounterStyleRenderer.withMaxLengthComputer() method

Create a new renderer with a (hopefuly) cost-effective max codepoint length computer.

<b>Signature:</b>

```typescript
withMaxLengthComputer(computer: (min: number, max: number, defaultComputer: MaxCodepointLengthInRangeComputer) => number): CounterStyleRenderer;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  computer | (min: number, max: number, defaultComputer: [MaxCodepointLengthInRangeComputer](./counter-style.maxcodepointlengthinrangecomputer.md)<!-- -->) =&gt; number | A function to compute the max codepoints length produced by the underlying formatter given a range. |

<b>Returns:</b>

[CounterStyleRenderer](./counter-style.counterstylerenderer.md)

## Remarks

The computer function must not handle negative numbers.

