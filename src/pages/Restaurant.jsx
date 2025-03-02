import React, { useEffect, useRef, useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  StyleSheet,
  Animated,
  ActivityIndicator,
  FlatList
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppLayout from "../components/layout/AppLayout";
import RestaurantProfile from "../components/shared/RestaurantProfile";
import FoodItem from "../components/shared/FoodItem";
import axiosInstance from "@/api/axiosInstance";
import socket from "@/socket";
import { useSelector } from "react-redux";
import { selectItems } from "@/redux/cart";

const CustomToggle = ({ label, checked, onChange, disabled, color }) => {
  // Create an animated value for the toggle position
  const toggleAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(toggleAnim, {
      toValue: checked ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [checked, toggleAnim]);

  // Map color to the correct style
  const bgColor = color === "green" 
    ? "#166534" // green-800 equivalent
    : color === "red" 
      ? "#b91c1c" // red-700 equivalent
      : "#6b7280"; // gray-500 equivalent

  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          { backgroundColor: checked ? bgColor : "#6b7280" },
          disabled && styles.disabled
        ]}
        onPress={() => !disabled && onChange(!checked)}
        disabled={disabled}
      >
        <Animated.View
          style={[
            styles.toggleCircle,
            {
              transform: [
                {
                  translateX: toggleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 24],
                  }),
                },
              ],
            },
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => !disabled && onChange(!checked)}>
        <Text style={styles.toggleLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const SearchBar = ({ value, onChange }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search cuisine..."
        value={value}
        onChangeText={onChange}
        style={styles.searchInput}
      />
    </View>
  );
};

const CategoryDropdown = ({ categories, value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <Text>{value || "All Categories"}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdownMenu}>
          <ScrollView style={styles.dropdownScroll}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                onChange("");
                setIsOpen(false);
              }}
            >
              <Text>All Categories</Text>
            </TouchableOpacity>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={styles.dropdownItem}
                onPress={() => {
                  onChange(cat.toLowerCase());
                  setIsOpen(false);
                }}
              >
                <Text>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const Restaurant = () => {
  const route = useRoute();
  const restaurantId = route.params?.id;
  const [restaurant, setRestaurant] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [filteredCuisines, setFilteredCuisines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const cartItems = useSelector(selectItems);
  const navigation = useNavigation();
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleShowCart = () => {
    navigation.navigate("Cart");
  };

  useEffect(() => {
    fetchRestaurant();
    socket.emit("joinRestaurant", restaurantId);
    socket.on("restaurantStatusUpdated", ({ restaurantId, isOpen }) => {
      setOpen(isOpen);
    });

    const handleCuisineUpdated = ({ cuisineId, isAvailable }) => {
      setCuisines((prevCuisines) =>
        prevCuisines.map((cuisine) =>
          cuisine.cuisine._id === cuisineId
            ? {
                ...cuisine,
                cuisine: { ...cuisine.cuisine, isAvailable },
              }
            : cuisine
        )
      );
    };

    socket.on("cuisineUpdated", handleCuisineUpdated);
    return () => {
      socket.off("cuisineUpdated");
    };
  }, []);

  const handleVegToggle = () => {
    setVegOnly(!vegOnly);
    setNonVegOnly(false);
    setSearchQuery("");
  };

  const handleNonVegToggle = () => {
    setVegOnly(false);
    setNonVegOnly(!nonVegOnly);
    setSearchQuery("");
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setNonVegOnly(false);
    setVegOnly(false);
    setCategory("");
  };

  useEffect(() => {
    filterCuisines();
  }, [vegOnly, nonVegOnly, category, searchQuery, cuisines]);

  const fetchRestaurant = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/restaurants/${restaurantId}`
      );
      setRestaurant(data.restaurant);
      setCuisines(data?.restaurant?.cuisines || []);
      setFilteredCuisines(data?.restaurant?.cuisines || []);
      setCategories(extractCategories(data?.restaurant?.cuisines || []));
      setOpen(data?.restaurant?.isOpen);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const extractCategories = (cuisines) => {
    const uniqueCategories = new Set(
      cuisines.map((cuisine) => cuisine.cuisine.category)
    );
    return Array.from(uniqueCategories);
  };

  const filterCuisines = () => {
    let updatedCuisines = [...cuisines];

    if (searchQuery) {
      updatedCuisines = updatedCuisines.filter(
        (cuisine) =>
          cuisine.cuisine.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          cuisine.cuisine.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    } else {
      if (vegOnly) {
        updatedCuisines = updatedCuisines.filter(
          (cuisine) => cuisine.cuisine.type.toLowerCase() === "veg"
        );
      }
      if (nonVegOnly) {
        updatedCuisines = updatedCuisines.filter(
          (cuisine) =>
            cuisine.cuisine.type.toLowerCase() === "non-veg"
        );
      }

      if (category) {
        updatedCuisines = updatedCuisines.filter(
          (cuisine) =>
            cuisine.cuisine.category.toLowerCase() ===
            category.toLowerCase()
        );
      }
    }

    setFilteredCuisines(updatedCuisines);
  };

  const renderFoodItem = ({ item }) => (
    <FoodItem
      cuisine={item.cuisine}
      isAvailable={item.cuisine.isAvailable}
      open={open}
      restaurant={restaurant}
    />
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <AppLayout>
      <View style={styles.container}>
        <RestaurantProfile restaurant={restaurant} open={open} />
        
        <View style={styles.filterCard}>
          {/* Toggles */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleItem}>
              <Text>Veg</Text>
              <CustomToggle
                label=""
                onChange={handleVegToggle}
                checked={vegOnly}
                color="green"
              />
            </View>
            <View style={styles.toggleItem}>
              <Text>Non-Veg</Text>
              <CustomToggle
                label=""
                onChange={handleNonVegToggle}
                checked={nonVegOnly}
                color="red"
              />
            </View>
          </View>

          {/* Dropdown and search bar */}
          <View style={styles.filterRow}>
            <CategoryDropdown
              categories={categories}
              value={category}
              onChange={(value) => setCategory(value)}
            />
            <SearchBar
              value={searchQuery}
              onChange={(value) => handleSearchChange(value)}
            />
          </View>
        </View>

        {filteredCuisines?.length > 0 ? (
          <FlatList
            data={filteredCuisines}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.foodList}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No cuisines available</Text>
          </View>
        )}

        {totalCartItems > 0 && (
          <View style={styles.cartBar}>
            <Text style={styles.cartText}>
              {totalCartItems} item(s) in cart
            </Text>
            <TouchableOpacity
              onPress={handleShowCart}
              style={styles.cartButton}
            >
              <Text style={styles.cartButtonText}>Show Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  filterCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  toggleButton: {
    width: 48,
    height: 24,
    borderRadius: 12,
    padding: 4,
    justifyContent: 'center',
  },
  toggleCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  toggleLabel: {
    marginLeft: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flex: 1,
    marginLeft: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
  },
  dropdownContainer: {
    flex: 1,
    position: 'relative',
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  foodList: {
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 16,
  },
  cartBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#16a34a', // green-600
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
  },
  cartButtonText: {
    color: '#16a34a',
    fontWeight: 'bold',
  },
});

export default Restaurant;
