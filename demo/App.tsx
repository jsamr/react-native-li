/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LoremIpsum } from 'lorem-ipsum';
import * as presets from '@jsamr/counter-style/presets';
import MarkerList from '@jsamr/react-native-li';

const lorem = new LoremIpsum({});
export default function App() {
  return (
    <SafeAreaProvider style={styles.grow}>
      <SafeAreaView style={styles.grow}>
        <ScrollView
          style={styles.grow}
          contentContainerStyle={styles.container}>
          <MarkerList counterRenderer={presets.arabicIndic} rtl={true}>
            {[...Array(100).keys()].map((index) => (
              <Text key={index} style={{ flexShrink: 1 }}>
                يقوم اتحاد شبكة الويب العالمية (W3C) بتطوير معايير دولية للويب و
                HTML و CSS وغير ذلك الكثير.
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
