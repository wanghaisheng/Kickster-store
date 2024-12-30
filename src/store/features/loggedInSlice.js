import { createSlice } from "@reduxjs/toolkit";


const loggedInSlice = createSlice({
    name: "loggedInUser",
    initialState: {
        user: null,
        admin: import.meta.env.VITE_ADMIN_ID,
        default: import.meta.env.VITE_USER_ID,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
})

export const { setUser } = loggedInSlice.actions;
export default loggedInSlice.reducer;