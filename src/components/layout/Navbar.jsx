import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
  Animated,
  Dimensions,
  Linking
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../../redux/cart";
import { clearNewNotification } from "@/redux/notification";
import axiosInstance from "@/api/axiosInstance";
import { clearCustomerData } from "@/redux/user";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";

// Import icons from a React Native compatible icon library
// For example, you can use react-native-vector-icons
import Icon from 'react-native-vector-icons/Feather';
import HistoryIcon from 'react-native-vector-icons/FontAwesome';
import CloseIcon from 'react-native-vector-icons/Ionicons';

// Custom Avatar component
const Avatar = ({ src }) => {
  return (
    <Image
      source={{ uri: src }}
      style={styles.avatar}
    />
  );
};

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const user = useSelector((state) => state.customer.customerInformation);
  const notifications = useSelector((state) => state.notification.notifications);
  const isNewNotification = useSelector((state) => state.notification.newNotification);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  
  // Animation for drawer
  const [slideAnim] = useState(new Animated.Value(Dimensions.get('window').width));
  
  useEffect(() => {
    if (isDrawerOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isDrawerOpen, slideAnim]);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleNotificationClick = () => {
    if (!isNotificationsOpen) {
      dispatch(clearNewNotification());
    }
    setNotificationsOpen(prev => !prev);
  };

  const items = useSelector(selectItems);
  const itemsInCart = useMemo(() => {
    return items?.length;
  }, [items]);

  const handleSignOut = async () => {
    try {
      const { data } = await axiosInstance.get('/auth/logout');
      if (data.success) {
        Toast.show({
          type: 'success',
          text1: data.message,
        });
        dispatch(clearCustomerData());
        navigation.navigate("Login");
      }
    }
    catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: err.response?.data?.message || 'Error signing out',
      });
    }
  };

  const handleHelp = () => {
    Linking.openURL("https://wa.me/+918733936309?text=Hey team. I need help with....");
  };

  const isActive = (routeName) => route.name === routeName;

  return (
    <View style={styles.container}>
      {/* Mobile Layout */}
      <View style={styles.mobileContainer}>
        {/* Logo and Location */}
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              source={require("@/assets/bitezy_logo.png")}
              style={styles.logo}
            />
          </TouchableOpacity>
          <View style={styles.locationContainer}>
            <Icon name="map-pin" size={16} color="#f97316" />
            <Text style={styles.locationText}>Sricity</Text>
          </View>
        </View>

        {/* Menu Button */}
        <TouchableOpacity onPress={toggleDrawer}>
          <Avatar src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJr-fGkiy1DE5A0JNOkcmCNGcXuQXdzENZA&s"} />
        </TouchableOpacity>
      </View>

      {/* Drawer Menu */}
      <Animated.View style={[
        styles.drawer,
        { transform: [{ translateX: slideAnim }] }
      ]}>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>Menu</Text>
          <TouchableOpacity onPress={toggleDrawer}>
            <CloseIcon name="close-sharp" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.drawerContent}>
          <TouchableOpacity 
            style={[styles.drawerItem, isActive("Home") && styles.activeItem]} 
            onPress={() => {
              navigation.navigate("Home");
              setDrawerOpen(false);
            }}
          >
            <Icon name="home" size={20} color={isActive("Home") ? "#f97316" : "#374151"} />
            <Text style={[styles.drawerItemText, isActive("Home") && styles.activeItemText]}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.drawerItem, isActive("Search") && styles.activeItem]} 
            onPress={() => {
              navigation.navigate("Search");
              setDrawerOpen(false);
            }}
          >
            <Icon name="search" size={20} color={isActive("Search") ? "#f97316" : "#374151"} />
            <Text style={[styles.drawerItemText, isActive("Search") && styles.activeItemText]}>Search</Text>
          </TouchableOpacity>
          
          {user && (
            <TouchableOpacity 
              style={[styles.drawerItem, isActive("Orders") && styles.activeItem]} 
              onPress={() => {
                navigation.navigate("Orders");
                setDrawerOpen(false);
              }}
            >
              <Icon name="percent" size={20} color={isActive("Orders") ? "#f97316" : "#374151"} />
              <Text style={[styles.drawerItemText, isActive("Orders") && styles.activeItemText]}>Orders</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.drawerItem} 
            onPress={() => {
              handleHelp();
              setDrawerOpen(false);
            }}
          >
            <Icon name="help-circle" size={20} color="#374151" />
            <Text style={styles.drawerItemText}>Help</Text>
          </TouchableOpacity>
          
          {!user ? (
            <TouchableOpacity 
              style={[styles.drawerItem, isActive("Login") && styles.activeItem]} 
              onPress={() => {
                navigation.navigate("Login");
                setDrawerOpen(false);
              }}
            >
              <Icon name="user" size={20} color={isActive("Login") ? "#f97316" : "#374151"} />
              <Text style={[styles.drawerItemText, isActive("Login") && styles.activeItemText]}>Sign In</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.drawerItem} 
              onPress={() => {
                handleSignOut();
                setDrawerOpen(false);
              }}
            >
              <Icon name="log-out" size={20} color="#374151" />
              <Text style={styles.drawerItemText}>Sign Out</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[styles.drawerItem, isActive("Cart") && styles.activeItem]} 
            onPress={() => {
              navigation.navigate("Cart");
              setDrawerOpen(false);
            }}
          >
            <View style={styles.cartIconContainer}>
              <Icon name="shopping-cart" size={20} color={isActive("Cart") ? "#f97316" : "#374151"} />
              {itemsInCart > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{itemsInCart}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.drawerItemText, isActive("Cart") && styles.activeItemText]}>Cart</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>

      {/* Notifications Modal */}
      <Modal
        visible={isNotificationsOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setNotificationsOpen(false)}
      >
        <View style={styles.notificationModal}>
          <View style={styles.notificationContent}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setNotificationsOpen(false)}>
                <CloseIcon name="close-sharp" size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.notificationList}>
              {notifications?.length === 0 ? (
                <Text style={styles.emptyNotification}>No new notifications</Text>
              ) : (
                notifications?.map((notification, index) => (
                  <View key={index} style={styles.notificationItem}>
                    <Text style={styles.notificationText}>{notification.message}</Text>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 20,
  },
  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 48,
    width: 48,
    resizeMode: 'contain',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  locationText: {
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 250,
    height: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 30,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  drawerContent: {
    padding: 16,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  drawerItemText: {
    marginLeft: 8,
    color: '#374151',
    fontSize: 16,
  },
  activeItem: {
    // Active item styling
  },
  activeItemText: {
    color: '#f97316',
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#16a34a',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  notificationModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  notificationContent: {
    width: '80%',
    maxHeight: '60%',
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  notificationList: {
    padding: 16,
  },
  notificationItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  notificationText: {
    fontSize: 14,
  },
  emptyNotification: {
    textAlign: 'center',
    color: '#6b7280',
    padding: 16,
  },
});

export default Navbar;
