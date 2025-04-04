// redux/slices/WishlistSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";




const initialState = {
    wishlistItems: [],
    isLoading: false,
    error: null,
};


// Async action to move an item from wishlist to cart
export const moveToCart = createAsyncThunk("wishlist/moveToCart",
    async ({ userId, productId, sizes, seamSizes, colorName }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const requestData = {
                userId,
                productId,
                sizes: sizes || null,
                seamSizes: seamSizes || null,
                colorName: colorName || "DefaultColor"  // 👈 Ensure colorName is never undefined
            };

            // console.log("🛒 Moving item to cart:", requestData);

            const response = await axios.post(`${server}/wishlist/move-to-cart`, requestData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to move item to cart.");
        }
    }
);




// Add to Wishlist
export const addToWishlist = createAsyncThunk("wishlist/addToWishlist",
    async ({ userId, productId, sizes, seamSizes, colorName }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(`${server}/wishlist/add`, { userId, productId, sizes, seamSizes, colorName }, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            });

            if (response.data.success) {
                return response.data.wishlist.items;
            } else {
                return rejectWithValue(response.data.message || "Failed to add item to wishlist");
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add item to wishlist");
        }
    }
);

// Remove from Wishlist
export const removeFromWishlist = createAsyncThunk(
    "wishlist/removeFromWishlist",
    async ({ userId, productId, sizes, seamSizes, colorName }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            // Build the URL with query parameters
            let url = `${server}/wishlist/delete/${userId}/${productId}?`;
            if (sizes) url += `sizes=${sizes}&`;
            if (seamSizes) url += `seamSizes=${seamSizes}&`;
            url += `colorName=${colorName}`;


            const response = await axios.delete(url, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
            });

            if (response.status === 200) {
                return { productId, sizes, seamSizes, colorName };
            } else {
                return rejectWithValue(`Failed to delete item. Status: ${response.status}`);
            }
        } catch (error) {
            console.error("removeFromWishlist Error:", error);  // log error
            return rejectWithValue(error.response?.data?.message || "Failed to remove item from wishlist");
        }
    }
);


// Get Wishlist Items
export const fetchWishlistItems = createAsyncThunk(
    "wishlist/fetchWishlistItems",
    async (userId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${server}/wishlist/${userId}`, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            });

            if (response.data.success) {
                return response.data.data;
            } else {
                return rejectWithValue(response.data.message || "Failed to fetch wishlist items");
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist items");
        }
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlistItems = action.payload;
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(removeFromWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                const { productId, sizes, seamSizes, colorName } = action.payload;

                state.wishlistItems = state.wishlistItems.filter(
                    (item) =>
                        !(
                            item.productId === productId &&
                            (sizes ? String(item.selectedSize) === String(sizes) : !item.selectedSize) &&
                            (seamSizes ? String(item.selectedSeamSize) === String(seamSizes) : !item.selectedSeamSize) &&
                            item.selectedColorName === colorName
                        )
                );
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchWishlistItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchWishlistItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlistItems = action.payload;
            })
            .addCase(fetchWishlistItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(moveToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(moveToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlistItems = state.wishlistItems.filter(
                    (item) => item.productId !== action.meta.arg.productId
                )
            })
            .addCase(moveToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
});

export default wishlistSlice.reducer;
