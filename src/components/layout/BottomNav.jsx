import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Feather';
import HistoryIcon from 'react-native-vector-icons/FontAwesome';

const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName) => route.name === routeName;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate("Home")}
      >
        <Icon 
          name="home" 
          size={24} 
          color={isActive("Home") ? "#f97316" : "#4b5563"} 
        />
        <Text style={[
          styles.navText, 
          isActive("Home") && styles.activeText
        ]}>
          Bitezy
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate("Search")}
      >
        <Icon 
          name="search" 
          size={24} 
          color={isActive("Search") ? "#f97316" : "#4b5563"} 
        />
        <Text style={[
          styles.navText, 
          isActive("Search") && styles.activeText
        ]}>
          Search
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate("Cart")}
      >
        <Icon 
          name="shopping-cart" 
          size={24} 
          color={isActive("Cart") ? "#f97316" : "#4b5563"} 
        />
        <Text style={[
          styles.navText, 
          isActive("Cart") && styles.activeText
        ]}>
          Cart
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => navigation.navigate("Orders")}
      >
        <HistoryIcon 
          name="history" 
          size={24} 
          color={isActive("Orders") ? "#f97316" : "#4b5563"} 
        />
        <Text style={[
          styles.navText, 
          isActive("Orders") && styles.activeText
        ]}>
          Orders
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#4b5563',
  },
  activeText: {
    color: '#f97316',
  }
});

export default BottomNav;
