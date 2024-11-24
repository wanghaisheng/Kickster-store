import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";
import usersReducer from "./features/usersSlice";
import ordersReducer from "./features/ordersSlice";
import loggedInUserReducer from "./features/loggedInSlice"

export const store = configureStore({
    reducer: {
        products: productsReducer,
        users: usersReducer,
        orders: ordersReducer,
        loggedInUser: loggedInUserReducer,
    }
})