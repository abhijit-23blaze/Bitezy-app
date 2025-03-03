// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
// Import axiosInstance but don't use it for now
// import axiosInstance from "@/api/axiosInstance";

const initialState = {
    items: [],
    restaurant: null,
};

// Mock async thunk for development
const saveCartToBackend = (cartData) => {
    console.log('Mock saveCartToBackend called with:', cartData);
    return {
        type: 'cart/saveCartToBackend/fulfilled',
        payload: {
            success: true,
            message: 'Cart saved successfully (mock)',
            data: cartData
        }
    };
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find((i) => i._id === item._id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
        },
        setRestaurant: (state, action) => {
            state.restaurant = action.payload;
        },
        incrementQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find((i) => i._id === itemId);

            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find((i) => i._id === itemId);

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter((i) => i._id !== itemId);
                }
            }

            if (state.items.length == 0) {
                state.restaurant = null;
            }
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((i) => i._id !== itemId);
        },
        clearCart: (state) => {
            state.items = [];
            state.restaurant = null;
        },
    },
});

export const selectItems = (state) => state.cart?.items;
export const selectRestaurant = (state) => state.cart?.restaurant;

export const {
    addItem,
    setRestaurant,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
} = cartSlice.actions;

export { saveCartToBackend };
export default cartSlice.reducer;
