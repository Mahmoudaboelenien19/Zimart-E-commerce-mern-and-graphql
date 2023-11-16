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
    updateUserData(state, action) {
      // Object.keys(action.payload).forEach((key) => {
      //   state[key] = action.payload[key];
      // });
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateUserData, updateRole, updateName } = userData.actions;
export default userData.reducer;
