import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import app from "../../utils/firebaseConfigures";
import {
    getFirestore,
    collection,
    getDocs,

} from "firebase/firestore"

const db = getFirestore(app);
const colRef = collection(db, "orders");

export const getOrders = createAsyncThunk("orders", async () => {
    try {
        const response = await getDocs(colRef);
        return response.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
})

const orderSlice = createSlice({
    name: "orders",
    initialState : {
        orders: [],
        loading: false,
        error: null,
    },
    extraReducers : (builder) => {
        builder.addCase(getOrders.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })
        builder.addCase(getOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default orderSlice.reducer;