import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalPrice: 0,
    loading: false,
    error: "",
  },
  reducers: {
    setCartItems: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
      state.totalPrice = state.cartItems.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCartItems, setLoading, setError } = cartSlice.actions;
export default cartSlice.reducer;
