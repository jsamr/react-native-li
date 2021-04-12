/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LoremIpsum } from 'lorem-ipsum';
import * as presets from '@jsamr/counter-style/presets';
import MarkedList from '@jsamr/react-native-li';

const lorem = new LoremIpsum({});

export default function App() {
  return (
    <SafeAreaProvider style={styles.grow}>
      <SafeAreaView style={styles.grow}>
        <ScrollView
          style={styles.grow}
          contentContainerStyle={styles.container}>
          <MarkedList counterRenderer={presets.disc}>
            {[...Array(100).keys()].map((index) => (
              <Text key={index} style={{ flexShrink: 1 }}>
                {lorem.generateSentences(1)}
              </Text>
            ))}
          </MarkedList>
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
