import { createSlice } from "@reduxjs/toolkit";

type Ttheme = "light" | "dark";
type Theme = { theme: Ttheme };
const initialtheme =
  (localStorage.getItem("zimart-theme") as Ttheme) || "light";
const initialState: Theme = {
  theme: initialtheme,
};

const themeSlice = createSlice({
  name: "theme-slice",
  initialState,
  reducers: {
    toggleTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
