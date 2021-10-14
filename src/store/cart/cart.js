import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: 0,

  reducers: {
    updateCart(state, action) {
      state = state + 1;
      return state;
    },
  },
});

export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;
