import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

// ✅ Fetch All Products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${server}/products/get-all-product`);
        console.log(response)
        return response.data.products;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
});

// ✅ Add New Product
export const addProduct = createAsyncThunk("products/addProduct", async (productData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");

        // ✅ Ensure `category` exists before sending to backend
        if (!productData.get("category")) {
            productData.append("category", "Uncategorized");
        }

        const response = await axios.post(`${server}/products/create-product`, productData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.product;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to add product");
    }
});

// ✅ Update Product
export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, updatedData }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${server}/products/update-product/${id}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.product;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update product");
    }
});

// ✅ Fetch Single Product
export const fetchSingleProduct = createAsyncThunk(
    "products/fetchSingleProduct",
    async (id, { rejectWithValue }) => {
        try {
            if (!id) throw new Error("Product ID is missing");

            const response = await axios.get(`${server}/products/get-single-product/${id}`);
            console.log("🟢 API Response for Product:", response.data.product); // ✅ Debugging
            return response.data.product;
        } catch (error) {
            console.error("🔴 Error fetching product:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data?.message || "Failed to fetch product");
        }
    }
);


// ✅ Delete Product
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${server}/products/delete-product/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return id; // Return the deleted product ID to remove from Redux store
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to delete product");
    }
});

// ✅ Product Slice
const productSlices = createSlice({
    name: "products",
    initialState: {
        products: [],
        product:null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            // get-Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add Product
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
                const index = state.products.findIndex((p) => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Fetch Single Product
            .addCase(fetchSingleProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                console.log("🟢 Updating Redux Store with Product:", action.payload); // ✅ Debug Redux
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((p) => p._id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlices.reducer;
