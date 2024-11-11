import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import app from "../../utils/firebaseConfigures";
import {
    getFirestore,
    collection,
    getDocs,

} from "firebase/firestore"

const db = getFirestore(app);
const colRef = collection(db, "products");

export const getProducts = createAsyncThunk("products", async () => {
    try {
        const response = await getDocs(colRef);
        return response.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
})

const productSlice = createSlice({
    name: "products",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    extraReducers : (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default productSlice.reducer;