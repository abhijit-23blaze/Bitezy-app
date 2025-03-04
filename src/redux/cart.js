// cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance";

const initialState = {
    items: [],
    restaurant: null,
    loading: false,
    error: null
};

// Async thunk for saving cart to backend
export const saveCartToBackend = createAsyncThunk(
    'cart/saveCartToBackend',
    async (cartData, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post('/cart/save', cartData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunk for fetching cart from backend
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.get('/cart');
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

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

            if (state.items.length === 0) {
                state.restaurant = null;
            }
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((i) => i._id !== itemId);
            
            if (state.items.length === 0) {
                state.restaurant = null;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.restaurant = null;
        },
    },
    extraReducers: (builder) => {
        // Save cart cases
        builder.addCase(saveCartToBackend.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(saveCartToBackend.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(saveCartToBackend.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Fetch cart cases
        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.items || [];
            state.restaurant = action.payload.restaurant || null;
        });
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const selectItems = (state) => state.cart?.items;
export const selectRestaurant = (state) => state.cart?.restaurant;
export const selectCartLoading = (state) => state.cart?.loading;
export const selectCartError = (state) => state.cart?.error;

export const {
    addItem,
    setRestaurant,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
