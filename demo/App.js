/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import upperRoman from '@jsamr/counter-style/presets/upperRoman';

export default function App() {
  return (
    <SafeAreaProvider style={styles.grow}>
      <SafeAreaView style={styles.grow}>
        <ScrollView
          style={styles.grow}
          contentContainerStyle={styles.container}>
          {[...Array(100).keys()].map((index) => (
            <View key={index}>
              <Text style={{ flexGrow: 0, flexShrink: 0 }}>
                {upperRoman.render(index)}
              </Text>
            </View>
          ))}
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
    alignItems: 'center'
  }
});
