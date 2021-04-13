import React, { useMemo } from 'react';
import { I18nManager } from 'react-native';
import MarkerBox from './MarkerBox';
import { MarkedListItemProps } from './MarkedListItem';
import { MarkedListProps } from './shared-types';

const defaultRenderMarker: NonNullable<MarkedListProps['renderMarker']> = (
  props
) => React.createElement(MarkerBox, props);

const defaultComputeMarkerBoxWidth: NonNullable<
  MarkedListProps['computeMarkerBoxWidth']
> = (maxNumOfCodepoints, fontSize) => maxNumOfCodepoints * fontSize * 0.6;

/**
 * A hook to reuse MarkedList logic to render custom lists components in
 * combination with {@link MarkedListItem}.
 *
 * @public
 */
export default function useMarkedList({
  counterRenderer,
  startIndex = 1,
  lineStyle,
  rtlLineReversed = false,
  rtlMarkerReversed = false,
  markerStyle,
  length = 0,
  renderMarker = defaultRenderMarker,
  computeMarkerBoxWidth = defaultComputeMarkerBoxWidth
}: MarkedListProps & { length: number }): Omit<MarkedListItemProps, 'index'> {
  const maxNumOfCodepoints = useMemo(
    () =>
      counterRenderer.maxMarkerLenInRange(startIndex, startIndex + length - 1),
    [counterRenderer, length, startIndex]
  );
  const syntheticRtlLineReversed = !I18nManager.isRTL && rtlLineReversed;
  const markerWidth = useMemo(
    () =>
      computeMarkerBoxWidth(maxNumOfCodepoints, markerStyle?.fontSize ?? 14),
    [computeMarkerBoxWidth, markerStyle?.fontSize, maxNumOfCodepoints]
  );
  const renderer = useMemo(
    () =>
      rtlMarkerReversed
        ? counterRenderer.withRtl(
            rtlMarkerReversed === true ? undefined : rtlMarkerReversed
          )
        : counterRenderer,
    [counterRenderer, rtlMarkerReversed]
  );
  const syntheticMarkerStyle = {
    flexGrow: 0,
    flexShrink: 0,
    width: markerWidth,
    fontSize: 14,
    textAlign: syntheticRtlLineReversed ? 'left' : 'right',
    ...markerStyle
  } as const;
  return {
    maxNumOfCodepoints,
    rtlLineReversed: syntheticRtlLineReversed,
    markerStyle: syntheticMarkerStyle,
    renderMarker,
    counterRenderer: renderer,
    startIndex,
    style: lineStyle
  };
}
