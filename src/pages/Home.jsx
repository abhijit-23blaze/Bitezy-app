import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import AppLayout from '../components/layout/AppLayout';

const Home = () => {
  return (
    <AppLayout>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome to Bitezy</Text>
          <Text style={styles.headerSubtitle}>Delicious food delivered to your doorstep</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Restaurants</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity key={item} style={styles.restaurantCard}>
                <View style={styles.restaurantImageContainer}>
                  <View style={styles.restaurantImage} />
                </View>
                <Text style={styles.restaurantName}>Restaurant {item}</Text>
                <Text style={styles.restaurantInfo}>Fast Food • 20-30 min</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesContainer}>
            {['Pizza', 'Burger', 'Sushi', 'Salad'].map((category) => (
              <TouchableOpacity key={category} style={styles.categoryItem}>
                <View style={styles.categoryIcon} />
                <Text style={styles.categoryName}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Offers</Text>
          <View style={styles.offersContainer}>
            {[1, 2].map((item) => (
              <TouchableOpacity key={item} style={styles.offerCard}>
                <View style={styles.offerImage} />
                <View style={styles.offerContent}>
                  <Text style={styles.offerTitle}>Special Offer {item}</Text>
                  <Text style={styles.offerDescription}>Get 20% off on your first order</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    backgroundColor: '#f97316',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  section: {
    marginTop: 20,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  restaurantCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantImageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#e5e7eb',
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d1d5db',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
    paddingBottom: 4,
  },
  restaurantInfo: {
    fontSize: 12,
    color: '#6b7280',
    padding: 8,
    paddingTop: 0,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f97316',
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  offersContainer: {
    gap: 16,
  },
  offerCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  offerImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#d1d5db',
  },
  offerContent: {
    padding: 16,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  offerDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default Home;