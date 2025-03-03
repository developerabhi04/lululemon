import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices.js";
import productsReducer from "./slices/productSlices.js";
import orderReducer from "./slices/orderSlices.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        order: orderReducer,
    },
});

export default store;
