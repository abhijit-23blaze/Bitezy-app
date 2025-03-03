import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';

// Super simple App component with no dependencies
const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  // Render the active screen based on the selected tab
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Welcome to Bitezy!</Text>
            <Text style={styles.subtitle}>Your favorite food delivery app</Text>
            <View style={styles.featuredSection}>
              <Text style={styles.sectionTitle}>Featured Restaurants</Text>
              <View style={styles.restaurantCard}>
                <View style={styles.restaurantImage} />
                <Text style={styles.restaurantName}>Tasty Bites</Text>
                <Text style={styles.restaurantInfo}>Italian • 4.8 ★ • 25-35 min</Text>
              </View>
            </View>
          </View>
        );
      case 'search':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Search</Text>
            <View style={styles.searchBar}>
              <Text style={styles.searchText}>Search for restaurants or dishes...</Text>
            </View>
            <Text style={styles.sectionTitle}>Popular Categories</Text>
            <View style={styles.categoriesRow}>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryText}>Pizza</Text>
              </View>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryText}>Burgers</Text>
              </View>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryText}>Sushi</Text>
              </View>
            </View>
          </View>
        );
      case 'cart':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Your Cart</Text>
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Browse Restaurants</Text>
            </TouchableOpacity>
          </View>
        );
      case 'profile':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.profileSection}>
              <View style={styles.avatar} />
              <Text style={styles.profileName}>Guest User</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Welcome to Bitezy!</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Bitezy</Text>
      </View>
      
      {renderScreen()}
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'home' && styles.activeTab]} 
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'search' && styles.activeTab]} 
          onPress={() => setActiveTab('search')}
        >
          <Text style={[styles.tabText, activeTab === 'search' && styles.activeTabText]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'cart' && styles.activeTab]} 
          onPress={() => setActiveTab('cart')}
        >
          <Text style={[styles.tabText, activeTab === 'cart' && styles.activeTabText]}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabItem, activeTab === 'profile' && styles.activeTab]} 
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 60,
    backgroundColor: '#f97316',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  footer: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    borderTopWidth: 3,
    borderTopColor: '#f97316',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#f97316',
    fontWeight: 'bold',
  },
  featuredSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  restaurantCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantImage: {
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  restaurantInfo: {
    color: '#666',
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  searchText: {
    color: '#999',
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  categoryItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryText: {
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 30,
  },
  button: {
    backgroundColor: '#f97316',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;