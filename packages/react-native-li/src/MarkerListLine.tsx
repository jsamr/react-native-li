import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { MarkerListProps } from './shared-types';

export type MarkerListLineProps = Required<
  Pick<MarkerListProps, 'counterRenderer' | 'renderMarker' | 'markerStyle'>
> & {
  index: number;
  startIndex: number;
  maxNumOfCodePoints: number;
  isRtl: boolean;
  reverseMarker: boolean;
  style: StyleProp<ViewStyle>;
};

export default function MarkerListLine({
  counterRenderer,
  index,
  startIndex,
  isRtl,
  reverseMarker,
  markerStyle,
  maxNumOfCodePoints,
  style,
  renderMarker,
  children
}: PropsWithChildren<MarkerListLineProps>) {
  const counterStyle = counterRenderer.render(index + startIndex);
  return (
    <View style={[isRtl ? styles.lineRtl : styles.lineLtr, style]} key={index}>
      {renderMarker({
        counterStyle,
        maxNumOfCodePoints,
        reverseMarker: reverseMarker && isRtl,
        style: markerStyle
      })}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  lineLtr: { flexWrap: 'nowrap', alignSelf: 'stretch', flexDirection: 'row' },
  lineRtl: {
    flexWrap: 'nowrap',
    alignSelf: 'stretch',
    flexDirection: 'row-reverse'
  }
});
