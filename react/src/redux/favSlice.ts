import { createSlice } from "@reduxjs/toolkit";
import { favInitialState } from "../interfaces/user.js";

const initialState: favInitialState = {
  fav: [],
};

const favSlice = createSlice({
  name: "fav-slice",
  initialState,
  reducers: {
    addToFavRedux(state, action) {
      console.log("redux");
      console.log(action.payload);
      if (Array.isArray(action.payload)) {
        state.fav = [...action.payload, ...state.fav];
      } else {
        state.fav = [action.payload, ...state.fav];
      }
    },

    removeFromFavRedux(state, action) {
      const arr = action.payload;
      for (const el of arr) {
        state.fav = state.fav.filter((obj) => obj.productId !== el);
      }
    },
  },
});

export const { addToFavRedux, removeFromFavRedux } = favSlice.actions;
export default favSlice.reducer;
