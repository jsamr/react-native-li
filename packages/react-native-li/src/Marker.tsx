import React from 'react';
import { Text } from 'react-native';
import { RenderMarkerProps } from './shared-types';

/**
 * @public
 */
export default function Marker({
  style,
  reverseMarker,
  counterStyle
}: Omit<RenderMarkerProps, 'maxNumOfCodePoints'>) {
  return (
    <Text style={style}>
      {reverseMarker ? counterStyle.split('').reverse().join('') : counterStyle}
    </Text>
  );
}
