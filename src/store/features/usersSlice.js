import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import app from "../../utils/firebaseConfigures";
import {
    getFirestore,
    collection,
    getDocs,

} from "firebase/firestore"

const db = getFirestore(app);
const colRef = collection(db, "users");

export const getUsers = createAsyncThunk("users", async () => {
    try {
        const response = await getDocs(colRef);
        return response.docs.map(doc => doc.data());
    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
})

const userSlice = createSlice({
    name: "users",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    extraReducers : (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default userSlice.reducer;