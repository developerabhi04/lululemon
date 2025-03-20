import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../server"; // Your API base URL

const initialState = {
    cartItems: [],
    isLoading: false,
    error: null,
};

// 🛒 Add to Cart
export const addToCart = createAsyncThunk("cart/addToCart", async ({ userId, productId, quantity, sizes, seamSizes }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(`${server}/cart/add`,
            { userId, productId, quantity, sizes, seamSizes },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.cart.items; // Ensure response data is structured correctly
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to add item to cart");
    }
}
);

// 📥 Fetch Cart Items
export const fetchCartItems = createAsyncThunk("cart/fetchCartItems",
    async (userId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${server}/cart/get/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.data.success) {
                return response.data.data; // Return cart items directly
            } else {
                return rejectWithValue(response.data.message || "Failed to fetch cart items");
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch cart items");
        }
    }
);


// ❌ Delete Cart Item
export const deleteCartItem = createAsyncThunk("cart/deleteCartItem",
    async ({ userId, productId, sizes, seamSizes }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const url = `${server}/cart/delete/${userId}/${productId}?sizes=${sizes}&seamSizes=${seamSizes}`;

            await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return { productId, sizes, seamSizes };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete cart item");
        }
    }
);


// 🔄 Update Cart Quantity
export const updateCartQuantity = createAsyncThunk("cart/updateCartQuantity", async ({ userId, productId, quantity, sizes, seamSizes }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${server}/cart/update`, { userId, productId, quantity, sizes, seamSizes }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data.cart.items;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update cart quantity");
    }
}
);

// 🛍️ Shopping Cart Slice
const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload; // Ensure correct key
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Fetch Cart Items
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    imageUrl: item.imageUrl,
                    price: item.price,
                    stock: item.stock,
                    colorOptions: item.colorOptions,
                    sizeOptions: item.sizeOptions,
                    seamSizeOptions: item.seamSizeOptions,
                    selectedSize: item.selectedSize,
                    selectedSeamSize: item.selectedSeamSize,
                    quantity: item.quantity
                }));
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Update Cart Quantity
            .addCase(updateCartQuantity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                // Update the cartItems in the state with the updated items from the server
                state.cartItems = action.payload.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    imageUrl: item.imageUrl,
                    price: item.price,
                    stock: item.stock,
                    colorOptions: item.colorOptions,
                    sizeOptions: item.sizeOptions,
                    seamSizeOptions: item.seamSizeOptions,
                    selectedSize: item.selectedSize,
                    selectedSeamSize: item.selectedSeamSize,
                    quantity: item.quantity
                }));
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Delete Cart Item
            .addCase(deleteCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                const { productId, sizes, seamSizes } = action.payload;
                state.cartItems = state.cartItems.filter(item =>
                    !(item.productId === productId &&
                        item.selectedSize === sizes &&
                        item.selectedSeamSize === seamSizes)
                );
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default shoppingCartSlice.reducer;
