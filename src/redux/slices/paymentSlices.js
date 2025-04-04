import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

// ✅ Create PayPal Payment
export const createPayment = createAsyncThunk("payment/createPayment",
    async (orderId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${server}/payment/create-payment`,
                { orderId },
                {
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                }
            );
            return response.data; // Approval URL and Payment ID
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to create payment");
        }
    }
);

// ✅ Execute PayPal Payment
export const executePayment = createAsyncThunk("payment/executePayment",
    async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${server}/payment/execute-payment`,
                { paymentId, payerId, orderId },
                {
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                }
            );
            return response.data; // Payment details
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to execute payment");
        }
    }
);

// ✅ Fetch All Payments (Admin)
export const fetchPayments = createAsyncThunk("payment/fetchPayments",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${server}/payment/all-payments`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.payments; // List of payments
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Create the Payment Slice
const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        approvalUrl: null,
        payments: [],
        paymentDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Create Payment
            .addCase(createPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.approvalUrl = action.payload.approvalUrl; // Store approval URL
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Execute Payment
            .addCase(executePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(executePayment.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentDetails = action.payload.paymentDetails; // Store executed payment details
            })
            .addCase(executePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ✅ Fetch Payments
            .addCase(fetchPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.payments = action.payload; // Store list of payments
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default paymentSlice.reducer;
