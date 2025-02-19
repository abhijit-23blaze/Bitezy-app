import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import AppLayout from '../components/layout/AppLayout';
import Container from '../components/layout/Container';
import SwipeToSlide from '../components/layout/SwipeToSlide';
import axiosInstance from '../api/axiosInstance'; // Adjusted the import path
import socket from '../socket'; // Adjusted the import path
import ChatWidget from '../components/ChatWidget/ChatWidget'; // Adjusted the import path
import Carousel from '../components/layout/Carousel';
import RestaurantCard from '../components/shared/RestaurantCard';
import { cuisines } from '../components/constants/cuisines'; // Adjusted the import path
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/restaurants");
      setRestaurants(data.restaurants);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket.emit("joinCustomerRoom");
    fetchRestaurants();
    const handleRestaurantStatusUpdated = ({ restaurantId, isOpen }) => {
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant._id === restaurantId
            ? { ...restaurant, isOpen }
            : restaurant
        )
      );
    };

    socket.on("restaurantStatusUpdate", handleRestaurantStatusUpdated);

    return () => {
      socket.off("restaurantStatusUpdate", handleRestaurantStatusUpdated);
    };
  }, []);

  const restaurantCards = useMemo(() => {
    return restaurants?.map(restaurant => (
      <TouchableOpacity key={restaurant?._id} onPress={() => navigation.navigate('Restaurant', { id: restaurant._id })}>
        <RestaurantCard restaurant={restaurant} />
      </TouchableOpacity>
    ));
  }, [restaurants]);

  return (
    <AppLayout>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          <Container pl={false}>
            <View style={{ flex: 1, flexDirection: 'column', height: Dimensions.get('window').height * 0.8 }}>
              <Carousel />
              <View style={{ borderBottomWidth: 2, borderBottomColor: '#E5E7EB' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>
                    What's on your mind?
                  </Text>
                </View>
                <SwipeToSlide cuisines={cuisines} size={16} />
              </View>
              <View style={{ marginTop: 32, paddingBottom: 64, flexDirection: 'row', flexWrap: 'wrap' }}>
                {restaurants?.length > 0 ? (
                  restaurantCards
                ) : (
                  !loading && (
                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                      No Restaurant found in this location!!
                    </Text>
                  )
                )}
              </View>
            </View>
            <ChatWidget />
          </Container>
        </ScrollView>
      )}
    </AppLayout>
  );
};

export default Home;