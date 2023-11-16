import { createSlice } from "@reduxjs/toolkit";
import { Collection } from "@/types/general";

const initialState: { compare: Collection[] } = {
  compare: [],
};

const compareSlice = createSlice({
  name: "compare-slice",
  initialState,
  reducers: {
    addToCompareRedux(state, action) {
      if (Array.isArray(action.payload)) {
        state.compare = action.payload;
      } else {
        state.compare = [action.payload, ...state.compare];
      }
    },

    removeFromCompareRedux(state, action) {
      state.compare = state.compare.filter((ob) => ob.id !== action.payload);
    },
    clearCompare(st) {
      st.compare = [];
    },
  },
});

export const { clearCompare, addToCompareRedux, removeFromCompareRedux } =
  compareSlice.actions;
export default compareSlice.reducer;
