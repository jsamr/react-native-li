import React from 'react';
import { I18nManager } from 'react-native';
import Marker from './Marker';
import { MarkerListLineProps } from './MarkerListLine';
import { MarkerListProps } from './shared-types';

const defaultRenderMarker: NonNullable<MarkerListProps['renderMarker']> = (
  props
) => React.createElement(Marker, props);

/**
 * @public
 */
export default function useMarkerList({
  counterRenderer,
  startIndex = 1,
  lineStyle,
  rtl = false,
  rtlReverseMarker = true,
  markerStyle,
  length = 0,
  renderMarker = defaultRenderMarker
}: MarkerListProps & { length: number }): Omit<MarkerListLineProps, 'index'> {
  const maxNumOfCodePoints = counterRenderer.getMaxLenInRange(
    startIndex,
    length
  );
  const markerWidth = maxNumOfCodePoints * (markerStyle?.fontSize ?? 14) * 0.6;
  const syntheticIsRtl = !I18nManager.isRTL && rtl;
  const syntheticMarkerStyle = {
    flexGrow: 0,
    flexShrink: 0,
    width: markerWidth,
    fontSize: 14,
    textAlign: syntheticIsRtl ? 'left' : 'right',
    ...markerStyle
  } as const;
  return {
    maxNumOfCodePoints,
    isRtl: syntheticIsRtl,
    markerStyle: syntheticMarkerStyle,
    renderMarker,
    reverseMarker: rtlReverseMarker && syntheticIsRtl,
    counterRenderer,
    startIndex,
    style: lineStyle
  };
}
