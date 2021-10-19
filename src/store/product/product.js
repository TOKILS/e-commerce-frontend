import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: null,

  reducers: {
    update(state, action) {
      return action.payload;
    },
  },
});

export const { update } = productSlice.actions;

export default productSlice.reducer;
