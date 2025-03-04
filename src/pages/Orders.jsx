import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderItem = ({ order }) => {
  const navigation = useNavigation();
  
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#15803d'; // green
      case 'on the way':
        return '#0369a1'; // blue
      case 'processing':
        return '#b45309'; // amber
      case 'cancelled':
        return '#b91c1c'; // red
      default:
        return '#6b7280'; // gray
    }
  };
  
  return (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => {
        // In a real app, navigate to order details
        // navigation.navigate('OrderDetails', { orderId: order.id });
      }}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{order.id}</Text>
        <Text 
          style={[
            styles.orderStatus, 
            { color: getStatusColor(order.status) }
          ]}
        >
          {order.status}
        </Text>
      </View>
      
      <View style={styles.restaurantInfo}>
        <Image 
          source={{ uri: order.restaurantImage }} 
          style={styles.restaurantImage}
        />
        <View style={styles.restaurantDetails}>
          <Text style={styles.restaurantName}>{order.restaurantName}</Text>
          <Text style={styles.orderDate}>{order.date}</Text>
        </View>
      </View>
      
      <View style={styles.orderItems}>
        <Text style={styles.itemsText}>
          {order.items.map(item => item.name).join(', ')}
        </Text>
      </View>
      
      <View style={styles.orderFooter}>
        <Text style={styles.itemCount}>{order.items.length} items</Text>
        <Text style={styles.orderTotal}>₹{order.total.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const fetchOrders = async () => {
    setLoading(true);
    
    try {
      // In a real app, this would call an API endpoint
      // For now, we'll simulate a successful response with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock orders data
      const mockOrders = [
        {
          id: '1001',
          restaurantName: 'Tasty Bites',
          restaurantImage: 'https://via.placeholder.com/100x100?text=Tasty+Bites',
          date: '15 Jun 2023, 7:30 PM',
          status: 'Delivered',
          items: [
            { id: '1', name: 'Chicken Biryani', quantity: 1, price: 250 },
            { id: '2', name: 'Butter Naan', quantity: 2, price: 60 },
            { id: '3', name: 'Paneer Tikka', quantity: 1, price: 180 }
          ],
          total: 550
        },
        {
          id: '1002',
          restaurantName: 'Pizza Palace',
          restaurantImage: 'https://via.placeholder.com/100x100?text=Pizza+Palace',
          date: '10 Jun 2023, 8:15 PM',
          status: 'Delivered',
          items: [
            { id: '1', name: 'Margherita Pizza', quantity: 1, price: 300 },
            { id: '2', name: 'Garlic Bread', quantity: 1, price: 120 }
          ],
          total: 420
        },
        {
          id: '1003',
          restaurantName: 'Burger King',
          restaurantImage: 'https://via.placeholder.com/100x100?text=Burger+King',
          date: '5 Jun 2023, 1:45 PM',
          status: 'Cancelled',
          items: [
            { id: '1', name: 'Whopper', quantity: 2, price: 360 },
            { id: '2', name: 'French Fries', quantity: 1, price: 90 }
          ],
          total: 450
        },
        {
          id: '1004',
          restaurantName: 'Sushi Express',
          restaurantImage: 'https://via.placeholder.com/100x100?text=Sushi+Express',
          date: '1 Jun 2023, 7:00 PM',
          status: 'Delivered',
          items: [
            { id: '1', name: 'California Roll', quantity: 2, price: 400 },
            { id: '2', name: 'Miso Soup', quantity: 1, price: 120 }
          ],
          total: 520
        }
      ];
      
      setOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f97316" />
        <Text style={styles.loadingText}>Loading your orders...</Text>
      </View>
    );
  }
  
  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Orders Yet</Text>
        <Text style={styles.emptyText}>
          You haven't placed any orders yet. Start ordering your favorite food!
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
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderItem order={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  listContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
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
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  restaurantInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  restaurantDetails: {
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  orderItems: {
    marginBottom: 12,
  },
  itemsText: {
    fontSize: 14,
    color: '#4b5563',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
  },
  itemCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
});

export default Orders;