import React from 'react';
import { Text, TextProps, View } from 'react-native';
import { MarkerBoxProps } from './shared-types';

const markerClipConfig: Partial<TextProps> = {
  numberOfLines: 1,
  ellipsizeMode: 'clip'
};

/**
 * Default component to render the list marker.
 *
 * See {@link https://www.w3.org/TR/css-lists-3/#marker-pseudo | CSS Lists and Counters Module Level 3, Markers}
 *
 * @public
 */
export default function MarkerBox({
  style,
  counterRenderer,
  counterIndex,
  markerTextStyle,
  markerTextWidth,
  enableMarkerClipping
}: MarkerBoxProps) {
  const markerStyle =
    typeof markerTextWidth === 'number'
      ? [markerTextStyle, { width: markerTextWidth }]
      : markerTextStyle;
  return (
    <View style={style}>
      <Text
        {...(enableMarkerClipping ? markerClipConfig : null)}
        testID="marker-box"
        style={markerStyle}>
        {counterRenderer.renderMarker(counterIndex)}
      </Text>
    </View>
  );
}
