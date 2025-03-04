import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  RefreshControl 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppLayout from '../components/layout/AppLayout';
import axiosInstance from '@/api/axiosInstance';
import { useSelector } from 'react-redux';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const user = useSelector(state => state.customer.customerInformation);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [restaurantsRes, categoriesRes, offersRes] = await Promise.all([
        axiosInstance.get('/restaurants'),
        axiosInstance.get('/categories'),
        axiosInstance.get('/offers')
      ]);

      setRestaurants(restaurantsRes.data.restaurants || []);
      setCategories(categoriesRes.data.categories || []);
      setOffers(offersRes.data.offers || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRestaurantPress = (restaurantId) => {
    navigation.navigate('Restaurant', { id: restaurantId });
  };

  if (loading) {
    return (
      <AppLayout>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f97316" />
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {user ? `Welcome back, ${user.name}!` : 'Welcome to Bitezy'}
          </Text>
          <Text style={styles.headerSubtitle}>Delicious food delivered to your doorstep</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Restaurants</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {restaurants.map((restaurant) => (
              <TouchableOpacity 
                key={restaurant._id} 
                style={styles.restaurantCard}
                onPress={() => handleRestaurantPress(restaurant._id)}
              >
                <View style={styles.restaurantImageContainer}>
                  {restaurant.image ? (
                    <Image 
                      source={{ uri: restaurant.image }} 
                      style={styles.restaurantImage}
                    />
                  ) : (
                    <View style={styles.restaurantImagePlaceholder} />
                  )}
                </View>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantInfo}>
                  {restaurant.cuisineTypes?.join(', ')} • {restaurant.deliveryTime}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category._id} 
                style={styles.categoryItem}
                onPress={() => navigation.navigate('Search', { category: category.name })}
              >
                {category.icon ? (
                  <Image 
                    source={{ uri: category.icon }} 
                    style={styles.categoryIcon}
                  />
                ) : (
                  <View style={styles.categoryIconPlaceholder} />
                )}
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Offers</Text>
          <View style={styles.offersContainer}>
            {offers.map((offer) => (
              <TouchableOpacity 
                key={offer._id} 
                style={styles.offerCard}
                onPress={() => navigation.navigate('Restaurant', { id: offer.restaurantId })}
              >
                {offer.image ? (
                  <Image 
                    source={{ uri: offer.image }} 
                    style={styles.offerImage}
                  />
                ) : (
                  <View style={styles.offerImagePlaceholder} />
                )}
                <View style={styles.offerContent}>
                  <Text style={styles.offerTitle}>{offer.title}</Text>
                  <Text style={styles.offerDescription}>{offer.description}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    resizeMode: 'cover',
  },
  restaurantImagePlaceholder: {
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
    marginRight: 12,
  },
  categoryIconPlaceholder: {
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
    resizeMode: 'cover',
  },
  offerImagePlaceholder: {
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