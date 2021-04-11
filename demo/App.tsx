/* eslint-disable react-native/no-inline-styles */
import React, { Children, Fragment, PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  I18nManager,
  TextStyle
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LoremIpsum } from 'lorem-ipsum';
import { CounterStyleRenderer } from '@jsamr/counter-style';
import * as presets from '@jsamr/counter-style/presets';

const lorem = new LoremIpsum({});

interface RenderMarkerProps {
  style: StyleProp<TextStyle>;
  reverseMarker: boolean;
  counterStyle: string;
  maxNumOfCodePoints: number;
}

function Marker({
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

const defaultRenderMarker: NonNullable<MarkerListProps['renderMarker']> = (
  props
) => <Marker {...props} />;

interface MarkerListProps {
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
   * When `rtl` is `true` and `I18nManager.isRTL` is `false`, forcibly reverse the marker characters.
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
  renderMarker?: (props: RenderMarkerProps) => JSX.Element;
}

function MarkerList({
  children,
  counterRenderer,
  startIndex = 1,
  lineStyle,
  rtl = false,
  rtlReverseMarker = true,
  markerStyle,
  renderMarker = defaultRenderMarker
}: PropsWithChildren<MarkerListProps>) {
  const normalChildren = Children.toArray(children);
  const maxNumOfCodePoints = counterRenderer.getMaxLenInRange(
    startIndex,
    normalChildren.length
  );
  const maxLen = maxNumOfCodePoints * 14 * 0.6;
  const syntheticIsRtl = !I18nManager.isRTL && rtl;
  const syntheticMarkerStyle = {
    flexGrow: 0,
    flexShrink: 0,
    width: maxLen,
    fontSize: 14,
    textAlign: syntheticIsRtl ? 'left' : 'right',
    ...markerStyle
  } as const;
  return React.createElement(
    Fragment,
    {},
    normalChildren.map((child, index) => {
      const counterStyle = counterRenderer.render(index + startIndex);
      return (
        <View
          style={[
            {
              flexDirection: syntheticIsRtl ? 'row-reverse' : 'row',
              flexWrap: 'nowrap',
              alignSelf: 'stretch'
            },
            lineStyle
          ]}
          key={index}>
          {renderMarker({
            counterStyle,
            maxNumOfCodePoints,
            reverseMarker: syntheticIsRtl && rtlReverseMarker,
            style: syntheticMarkerStyle
          })}
          {child}
        </View>
      );
    })
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.grow}>
      <SafeAreaView style={styles.grow}>
        <ScrollView
          style={styles.grow}
          contentContainerStyle={styles.container}>
          <MarkerList counterRenderer={presets.armenian} rtl={false}>
            {[...Array(100).keys()].map((index) => (
              <Text key={index} style={{ flexShrink: 1 }}>
                {lorem.generateSentences(1)}
              </Text>
            ))}
          </MarkerList>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  grow: { flexGrow: 1 },
  container: {
    flexGrow: 1,
    alignItems: 'flex-start'
  }
});
