import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectItems, selectRestaurant } from '../redux/cart';

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <View style={styles.itemType}>
          {item.type === 'Veg' ? (
            <View style={[styles.typeIndicator, styles.vegIndicator]} />
          ) : (
            <View style={[styles.typeIndicator, styles.nonVegIndicator]} />
          )}
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
        </View>
      </View>
      
      <View style={styles.quantityControls}>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => item.quantity > 1 ? onDecrement(item.id) : onRemove(item.id)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        
        <Text style={styles.quantity}>{item.quantity}</Text>
        
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => onIncrement(item.id)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.itemTotal}>
        ₹{(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );
};

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectItems) || [];
  const restaurant = useSelector(selectRestaurant);
  const [loading, setLoading] = useState(false);
  
  const [mockItems, setMockItems] = useState([
    {
      id: '1',
      name: 'Chicken Biryani',
      price: 250,
      quantity: 1,
      type: 'Non-Veg'
    },
    {
      id: '2',
      name: 'Butter Naan',
      price: 30,
      quantity: 2,
      type: 'Veg'
    },
    {
      id: '3',
      name: 'Paneer Tikka',
      price: 180,
      quantity: 1,
      type: 'Veg'
    }
  ]);
  
  const [mockRestaurant, setMockRestaurant] = useState({
    id: 'mock-restaurant-1',
    name: 'Tasty Bites',
    image: 'https://via.placeholder.com/300x200?text=Tasty+Bites',
    deliveryFee: 40,
    deliveryTime: '25-35 min'
  });
  
  // Use either real cart data or mock data
  const items = cartItems.length > 0 ? cartItems : mockItems;
  const restaurantData = restaurant || mockRestaurant;
  
  const handleIncrement = (itemId) => {
    setMockItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
    
    // In a real app, dispatch an action to update Redux store
    // dispatch(incrementItem(itemId));
  };
  
  const handleDecrement = (itemId) => {
    setMockItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
    
    // In a real app, dispatch an action to update Redux store
    // dispatch(decrementItem(itemId));
  };
  
  const handleRemove = (itemId) => {
    setMockItems(prevItems => prevItems.filter(item => item.id !== itemId));
    
    // In a real app, dispatch an action to update Redux store
    // dispatch(removeItem(itemId));
  };
  
  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + (restaurantData?.deliveryFee || 0);
  };
  
  const handleCheckout = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Order Placed',
        'Your order has been placed successfully!',
        [
          { 
            text: 'View Orders', 
            onPress: () => navigation.navigate('Orders') 
          },
          { 
            text: 'OK', 
            onPress: () => {
              // Clear cart and navigate to home
              setMockItems([]);
              navigation.navigate('Home');
            } 
          }
        ]
      );
    }, 1500);
    
    // In a real app, dispatch an action to place order
    // dispatch(placeOrder(items, restaurantData))
    //   .then(() => {
    //     Alert.alert('Order Placed', 'Your order has been placed successfully!');
    //     navigation.navigate('Orders');
    //   })
    //   .catch(error => {
    //     Alert.alert('Error', error.message || 'Failed to place order');
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };
  
  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptyText}>
          Add items to your cart to place an order
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Browse Restaurants</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {/* Restaurant Info */}
      <View style={styles.restaurantInfo}>
        <Image 
          source={{ uri: restaurantData.image }} 
          style={styles.restaurantImage}
        />
        <View style={styles.restaurantDetails}>
          <Text style={styles.restaurantName}>{restaurantData.name}</Text>
          <Text style={styles.deliveryInfo}>
            Delivery: {restaurantData.deliveryTime}
          </Text>
        </View>
      </View>
      
      {/* Cart Items */}
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem 
            item={item} 
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cartItemsContainer}
      />
      
      {/* Order Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{calculateSubtotal().toFixed(2)}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>₹{restaurantData.deliveryFee.toFixed(2)}</Text>
        </View>
        
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{calculateTotal().toFixed(2)}</Text>
        </View>
        
        <TouchableOpacity
          style={[styles.checkoutButton, loading && styles.buttonDisabled]}
          onPress={handleCheckout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.checkoutButtonText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#f97316',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  restaurantInfo: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  restaurantDetails: {
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  deliveryInfo: {
    fontSize: 14,
    color: '#6b7280',
  },
  cartItemsContainer: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  itemInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  itemType: {
    marginRight: 8,
    justifyContent: 'center',
  },
  typeIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  vegIndicator: {
    borderColor: '#15803d',
    backgroundColor: '#dcfce7',
  },
  nonVegIndicator: {
    borderColor: '#b91c1c',
    backgroundColor: '#fee2e2',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#6b7280',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b5563',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    minWidth: 70,
    textAlign: 'right',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  checkoutButton: {
    backgroundColor: '#f97316',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});

export default Cart;