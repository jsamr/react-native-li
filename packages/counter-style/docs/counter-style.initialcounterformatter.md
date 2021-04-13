<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@jsamr/counter-style](./counter-style.md) &gt; [InitialCounterFormatter](./counter-style.initialcounterformatter.md)

## InitialCounterFormatter type

A function that renders an index into its [initial counter representation](https://www.w3.org/TR/css-counter-styles-3/#initial-representation-for-the-counter-value)<!-- -->.

As specified in CSS, this function must not render negative signs, add padding or prefixes and suffixes.

<b>Signature:</b>

```typescript
export declare type InitialCounterFormatter = (index: number) => string | undefined;
```

## Remarks

It can return undefined to signal a fallback should be used instead.
