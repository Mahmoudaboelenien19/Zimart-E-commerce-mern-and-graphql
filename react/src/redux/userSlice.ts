import { UserInterface } from "@/interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";
const initialState: { user: UserInterface[] } = {
  user: [],
};

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    addToUserRedux(state, action) {
      if (Array.isArray(action.payload)) {
        state.user = [...action.payload, ...state.user];
      } else {
        state.user = [action.payload, ...state.user];
      }
    },
    clearUsersRedux(state) {
      state.user = [];
    },
    usersSkeltonRedux(state) {
      state.user = Array.from({ length: 18 });
    },
    updateUserRedux(state, action) {
      state.user = state.user.map((user: UserInterface) =>
        action.payload._id === user._id
          ? {
              ...user,
              role: action.payload.role,
            }
          : user
      );
    },
  },
});

export const {
  usersSkeltonRedux,
  clearUsersRedux,
  addToUserRedux,
  updateUserRedux,
} = userSlice.actions;
export default userSlice.reducer;
