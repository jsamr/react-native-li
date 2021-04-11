import type { CounterStyleRenderer } from '@jsamr/counter-style';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

/**
 * @public
 */
export interface RenderMarkerProps {
  style: StyleProp<TextStyle>;
  reverseMarker: boolean;
  counterStyle: string;
  maxNumOfCodePoints: number;
}

/**
 * @public
 */
export interface MarkerListProps {
  /**
   * The counter renderer for this list.
   */
  counterRenderer: CounterStyleRenderer;
  /**
   * Force the line layout into RTL mode.
   *
   * @remarks Will be ignored if `I18nManager.isRTL` is `true`.
   *
   * @defaultValue false
   */
  rtl?: boolean;
  /**
   * When `rtl` is `true` and `I18nManager.isRTL` is `false`, forcibly reverse
   * the order of marker characters.
   *
   * @defaultValue true
   */
  rtlReverseMarker?: boolean;
  /**
   * The index for the first item in the list. Negative indexes are supported.
   *
   * @defaultValue 1
   */
  startIndex?: number;
  /**
   * Style for the line wrapper.
   */
  lineStyle?: StyleProp<ViewStyle>;
  /**
   * A plain-object text style for the marker.
   */
  markerStyle?: TextStyle;
  /**
   * A custom Marker render function, useful to change the width.
   *
   * @remarks You're advise to use {@link Marker} component.
   */
  renderMarker?: (props: RenderMarkerProps) => ReactNode;
}
