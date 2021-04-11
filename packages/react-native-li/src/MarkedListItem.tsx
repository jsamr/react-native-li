import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { MarkedListProps } from './shared-types';

/**
 * @public
 */
export type MarkedListItemProps = Required<
  Pick<
    MarkedListProps,
    'counterRenderer' | 'renderMarker' | 'markerStyle' | 'rtlLineReversed'
  >
> & {
  index: number;
  startIndex: number;
  maxNumOfCodepoints: number;
  style: StyleProp<ViewStyle>;
};

/**
 * @public
 */
export default function MarkedListItem({
  counterRenderer,
  index,
  startIndex,
  rtlLineReversed,
  markerStyle,
  maxNumOfCodepoints,
  style,
  renderMarker,
  children
}: PropsWithChildren<MarkedListItemProps>) {
  const markerString = counterRenderer.renderMarker(index + startIndex);
  return (
    <View
      style={[rtlLineReversed ? styles.lineRtl : styles.lineLtr, style]}
      key={index}>
      {renderMarker({
        markerString,
        maxNumOfCodepoints,
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
