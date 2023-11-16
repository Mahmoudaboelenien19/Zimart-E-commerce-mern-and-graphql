import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/product";

type ProductSlice = { Allproducts: Product[]; totalProducts: number };
const initialState: ProductSlice = {
  Allproducts: [],
  totalProducts: 0,
};

const productSlice = createSlice({
  name: "product-slice",
  initialState,
  reducers: {
    addToProductRedux(state, action) {
      if (Array.isArray(action.payload)) {
        console.log("productSlice worked");
        state.Allproducts = action.payload;
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

    changeTotalProductsCount(state, action) {
      state.totalProducts = action.payload;
    },
    skeltonProductSlice(state) {
      state.Allproducts = Array.from({ length: 12 });
    },
    clearProductRedux(state) {
      state.Allproducts = [];
    },
  },
});

export const {
  addToProductRedux,
  removeFromProductRedux,
  skeltonProductSlice,
  updateProductRedux,
  clearProductRedux,
  changeTotalProductsCount,
} = productSlice.actions;
export default productSlice.reducer;
