import { createSlice } from "@reduxjs/toolkit";

export const userInitialState = {
  name: "",
  image: "",
  email: "",
  country: "",
  role: "",
  phone: "",
};
const userData = createSlice({
  name: "userData",
  initialState: userInitialState,
  reducers: {
    updateRole(state, action) {
      state.role = action.payload;
    },
    updateName(state, action) {
      state.name = action.payload;
    },
    updateProfileImage(state, action) {
      state.image = action.payload;
    },
    updateUserData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateUserData, updateProfileImage, updateRole, updateName } =
  userData.actions;
export default userData.reducer;
