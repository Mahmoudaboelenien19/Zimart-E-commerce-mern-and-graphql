import { createSlice } from "@reduxjs/toolkit";
import { ProductInterface } from "../interfaces/product";

const initialState: { Allproducts: ProductInterface[] } = {
  Allproducts: [],
};

const productSlice = createSlice({
  name: "product-slice",
  initialState,
  reducers: {
    addToProductRedux(state, action) {
      if (Array.isArray(action.payload)) {
        state.Allproducts = [...action.payload, ...state.Allproducts];
      } else {
        state.Allproducts = [action.payload, ...state.Allproducts];
      }
    },

    removeFromProductRedux(state, action) {
      const arr = action.payload;
      for (const el of arr) {
        state.Allproducts = state.Allproducts.filter((obj) => obj._id !== el);
      }
    },

    updateProductRedux(state, action) {
      state.Allproducts = state.Allproducts.map((obj) =>
        obj._id === action.payload._id ? { ...obj, ...action.payload.obj } : obj
      );
    },
  },
});

export const {
  addToProductRedux,
  removeFromProductRedux,

  updateProductRedux,
} = productSlice.actions;
export default productSlice.reducer;
