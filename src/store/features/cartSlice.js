import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        cartItems: [],
        totalPrice: 0,
    },
    reducers: {
        setCartItems : (state, action) => {
            state.items = action.payload;
            state.totalPrice = state.items.reduce((acc, item) => acc + item.totalPrice, 0);
        }
    }
})

export const { setCartItems } = cartSlice.actions;
export default cartSlice.reducer;