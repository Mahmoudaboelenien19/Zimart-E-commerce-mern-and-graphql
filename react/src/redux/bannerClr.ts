import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clr: "#237a44",
};

const clrSlice = createSlice({
  name: "banner-slice",
  initialState,
  reducers: {
    changeBannerClr: (state, action) => {
      state.clr = action.payload;
    },
  },
});

export const { changeBannerClr } = clrSlice.actions;
export default clrSlice.reducer;
