import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Terminal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terminal</Text>
      <Text style={styles.subtitle}>터미널 기능이 여기에 구현될 예정입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#00ff00',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
});
