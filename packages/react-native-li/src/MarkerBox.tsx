import React from 'react';
import { Text } from 'react-native';
import { MarkerBoxProps } from './shared-types';

/**
 * Default component to render the list marker.
 *
 * See {@link https://www.w3.org/TR/css-lists-3/#marker-pseudo | CSS Lists and Counters Module Level 3, Markers}
 *
 * @public
 */
export default function MarkerBox({ style, markerString }: MarkerBoxProps) {
  return (
    <Text testID="marker-box" style={style}>
      {markerString}
    </Text>
  );
}
