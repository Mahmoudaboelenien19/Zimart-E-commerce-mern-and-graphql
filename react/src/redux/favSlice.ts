import { Collection } from "@/types/general";
import { createSlice } from "@reduxjs/toolkit";
type favInitialState = {
  fav: Collection[];
};
const initialState: favInitialState = {
  fav: [],
};

const favSlice = createSlice({
  name: "fav-slice",
  initialState,
  reducers: {
    addToFavRedux(state, action) {
      if (Array.isArray(action.payload)) {
        state.fav = action.payload;
      } else {
        state.fav = [action.payload, ...state.fav];
      }
    },

    removeFromFavRedux(state, action) {
      state.fav = state.fav.filter((ob) => ob.id !== action.payload);
    },
    clearAllFav(state) {
      state.fav = [];
    },
  },
});

export const { addToFavRedux, removeFromFavRedux, clearAllFav } =
  favSlice.actions;
export default favSlice.reducer;
