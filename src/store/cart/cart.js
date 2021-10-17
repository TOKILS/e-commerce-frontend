import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: 0,

  reducers: {
    updateCart(state, action) {
      return state + 1;
    },
  },
});

export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;
