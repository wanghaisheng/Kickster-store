import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalPrice: 0
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.totalPrice = state.cartItems.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );
    }
  },
});

export const { setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
