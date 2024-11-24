import { createSlice } from "@reduxjs/toolkit";


const loggedInSlice = createSlice({
    name: "loggedInUser",
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
})

export const { setUser } = loggedInSlice.actions;
export default loggedInSlice.reducer;