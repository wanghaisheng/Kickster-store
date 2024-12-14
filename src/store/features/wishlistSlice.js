import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    totalPrice: 0
  },
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
      state.totalPrice = state.wishlist.reduce(
        (acc, item) => acc + item.totalPrice,
        0
      );
    }
  },
});

export const { setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
