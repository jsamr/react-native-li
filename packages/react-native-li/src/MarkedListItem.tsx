import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { MarkedListProps } from './shared-types';

/**
 * Props for the {@link MarkedListItem} component.
 *
 * @public
 */
export type MarkedListItemProps = Required<
  Pick<
    MarkedListProps,
    | 'counterRenderer'
    | 'renderMarker'
    | 'markerTextStyle'
    | 'markerBoxStyle'
    | 'rtlLineReversed'
    | 'startIndex'
  >
> & {
  index: number;
  maxNumOfCodepoints: number;
  style: StyleProp<ViewStyle>;
};

/**
 * A component which reproduces CSS3 `display: list-item;` behavior. It
 * prepends its child with a marker box containing a marker string
 * representation for this child index.
 *
 * See {@link https://www.w3.org/TR/css-lists-3/#markers | CSS Lists and Counters Module Level 3, Markers}.
 *
 * @public
 */
export default function MarkedListItem({
  counterRenderer,
  index,
  startIndex,
  rtlLineReversed,
  markerTextStyle,
  markerBoxStyle,
  maxNumOfCodepoints,
  style,
  renderMarker,
  children
}: PropsWithChildren<MarkedListItemProps>) {
  const markerString = counterRenderer.renderMarker(index + startIndex);
  return (
    <View
      testID="marked-list-item"
      style={[rtlLineReversed ? styles.lineRtl : styles.lineLtr, style]}
      key={index}>
      {renderMarker({
        markerString,
        maxNumOfCodepoints,
        style: markerBoxStyle,
        markerTextStyle,
        markerTextWidth
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
