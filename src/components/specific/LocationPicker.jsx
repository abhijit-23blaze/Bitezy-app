import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { googleapikey } from '@/components/constants/config';

// This is a simplified mock version of LocationPicker for React Native
// In a real app, you would use react-native-maps or similar library
const LocationPicker = ({ onChangeCords }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Simulate getting location
    const timer = setTimeout(() => {
      // Mock location data (Bangalore, India)
      const mockLocation = {
        latitude: 12.9716,
        longitude: 77.5946
      };
      
      setLocation(mockLocation);
      setLoading(false);
      
      // Call the callback with mock coordinates
      if (onChangeCords) {
        onChangeCords(mockLocation.latitude, mockLocation.longitude);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [onChangeCords]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f97316" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map View</Text>
        {location && (
          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>Current Location</Text>
            <Text style={styles.locationDetail}>
              Latitude: {location.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationDetail}>
              Longitude: {location.longitude.toFixed(6)}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.note}>
        Note: This is a placeholder for the map. In a real app, you would use react-native-maps.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    maxHeight: 300,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
  locationInfo: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  locationDetail: {
    fontSize: 12,
    color: '#666',
  },
  note: {
    position: 'absolute',
    bottom: 10,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default LocationPicker;