import React from 'react';
import { Text } from 'react-native';
import { RenderMarkerBoxProps } from './shared-types';

/**
 * @public
 */
export default function MarkerBox({
  style,
  markerString
}: Omit<RenderMarkerBoxProps, 'maxNumOfCodePoints' | 'reverseMarker'>) {
  return <Text style={style}>{markerString}</Text>;
}
