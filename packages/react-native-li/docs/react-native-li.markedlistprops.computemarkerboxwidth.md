<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@jsamr/react-native-li](./react-native-li.md) &gt; [MarkedListProps](./react-native-li.markedlistprops.md) &gt; [computeMarkerBoxWidth](./react-native-li.markedlistprops.computemarkerboxwidth.md)

## MarkedListProps.computeMarkerBoxWidth property

A function to compute marker box width depending on the maximum length of the marker string in range.

<b>Signature:</b>

```typescript
computeMarkerBoxWidth?: (maxCodepointsLengthInRange: number, fontSize: number) => number;
```

## Remarks

- Font size is derived from `markerStyle` prop. - Will be ignored when [MarkedListProps.dynamicMarkerBoxWidth](./react-native-li.markedlistprops.dynamicmarkerboxwidth.md) is set to `false`<!-- -->.

