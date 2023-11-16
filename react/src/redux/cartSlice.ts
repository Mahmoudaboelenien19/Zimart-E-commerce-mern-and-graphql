import { createSlice } from "@reduxjs/toolkit";
import { Collection } from "@/types/general.js";

const initialState: { cart: Collection[] } = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart-slice",
  initialState,
  reducers: {
    addToCartRedux(state, action) {
      if (Array.isArray(action.payload)) {
        state.cart = action.payload;
      } else {
        state.cart = [action.payload, ...state.cart];
      }
    },

    removeFromCartRedux(state, action) {
      state.cart = state.cart.filter((obj) => obj.id !== action.payload);
    },

    changeCartCountRedux(state, action) {
      state.cart = state.cart.map((obj) =>
        action.payload.productId === obj.id
          ? { ...obj, count: action.payload.count }
          : obj
      );
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  clearCart,
  addToCartRedux,
  removeFromCartRedux,
  changeCartCountRedux,
} = cartSlice.actions;
export default cartSlice.reducer;
