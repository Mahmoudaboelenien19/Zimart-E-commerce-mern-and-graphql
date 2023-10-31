import { createSlice } from "@reduxjs/toolkit";
import { compareInterface } from "../interfaces/user.interface";

const initialState: { compare: compareInterface[] } = {
  compare: [],
};

const compareSlice = createSlice({
  name: "compare-slice",
  initialState,
  reducers: {
    addToCompareRedux(state, action) {
      if (Array.isArray(action.payload)) {
        state.compare = [...action.payload, ...state.compare];
      } else {
        state.compare = [action.payload, ...state.compare];
      }
    },

    removeFromCompareRedux(state, action) {
      state.compare = state.compare.filter(
        (obj) => obj.productId !== action.payload
      );
    },
    clearCompare(st) {
      st.compare = [];
    },
  },
});

export const { clearCompare, addToCompareRedux, removeFromCompareRedux } =
  compareSlice.actions;
export default compareSlice.reducer;
