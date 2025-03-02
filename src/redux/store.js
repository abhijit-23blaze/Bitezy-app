import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Create simplified slices for initial testing
const userSlice = createSlice({
  name: 'customer',
  initialState: {
    customerInformation: null
  },
  reducers: {
    setCustomerInformation: (state, action) => {
      state.customerInformation = action.payload;
    },
    clearCustomerData: (state) => {
      state.customerInformation = null;
    }
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: []
  },
  reducers: {
    addOrders: (state, action) => {
      state.orders = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(order => order._id === orderId);
      if (order) {
        order.status = status;
      }
    }
  }
});

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    newNotification: false
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    setNewNotification: (state) => {
      state.newNotification = true;
    },
    clearNewNotification: (state) => {
      state.newNotification = false;
    }
  }
});

// Export actions
export const { setCustomerInformation, clearCustomerData } = userSlice.actions;
export const { addToCart, clearCart } = cartSlice.actions;
export const { addOrders, updateOrderStatus } = orderSlice.actions;
export const { addNotification, setNewNotification, clearNewNotification } = notificationSlice.actions;

// Selector for cart items
export const selectItems = (state) => state.cart.items;

export const store = configureStore({
  reducer: {
    customer: userSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    notification: notificationSlice.reducer
  },
});

