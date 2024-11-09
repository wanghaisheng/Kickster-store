import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";
import usersReducer from "./features/usersSlice";
import ordersReducer from "./features/ordersSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        users: usersReducer,
        orders: ordersReducer,
    }
})