import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder} />
        <Text style={styles.logoText}>Bitezy</Text>
      </View>
      <ActivityIndicator size="large" color="#f97316" style={styles.loader} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f97316',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f97316',
  },
  loader: {
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6b7280',
  },
});

export default SplashScreen; 