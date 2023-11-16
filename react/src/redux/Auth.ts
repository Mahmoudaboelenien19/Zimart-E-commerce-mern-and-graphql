import { createSlice } from "@reduxjs/toolkit";

export const userInitialState = {
  isAuth: false,
  userId: "",
};
const AuthData = createSlice({
  name: "auth",
  initialState: userInitialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    updateUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setIsAuth, updateUserId } = AuthData.actions;
export default AuthData.reducer;
