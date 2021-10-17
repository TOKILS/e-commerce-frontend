import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    id: 1,
    Price: 10000000,
    img: "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
  },

  reducers: {
    update(state, action) {
      return action.payload;
    },
  },
});

export const { update } = productSlice.actions;

export default productSlice.reducer;
