import { createSlice } from "@reduxjs/toolkit";

export interface notificationInterface {
  isRead: boolean;
  content: string;
  createdAt: string;
  link: string;
  _id: string;
}

interface notificationStateInterface {
  count: number;
  notificatins: notificationInterface[];
}
const initialState: notificationStateInterface = {
  count: 0,
  notificatins: [],
};

const notificatinsSlice = createSlice({
  name: "notificatins-slice",
  initialState,
  reducers: {
    addToNotificatinsRedux(state, action) {
      if (Array.isArray(action.payload)) {
        state.notificatins = [...state.notificatins, ...action.payload];
      } else {
        state.notificatins = [action.payload, ...state.notificatins];
      }
    },

    changeNotificationCount(state, action) {
      state.count = action.payload;
    },

    removeFromNotificatinsRedux(state, action) {
      state.notificatins = state.notificatins.filter((ob) => {
        return ob._id !== action.payload;
      });
    },
    clearNotificationRedux(state) {
      state.notificatins = [];
    },

    skeltonNotificationsRedux(state) {
      state.notificatins = Array.from({ length: 16 });
    },
    toggleReadNotificatinsRedux(state, action) {
      state.notificatins = state.notificatins.map((e) => {
        return e._id === action.payload.id
          ? { ...e, isRead: action.payload.isRead }
          : e;
      });
    },
    MarkAllAsReadNotificationRedux(state) {
      state.notificatins = state.notificatins.map((e) => ({
        ...e,
        isRead: true,
      }));
    },
  },
});

export const {
  addToNotificatinsRedux,
  removeFromNotificatinsRedux,
  toggleReadNotificatinsRedux,
  changeNotificationCount,
  clearNotificationRedux,
  MarkAllAsReadNotificationRedux,
  skeltonNotificationsRedux,
} = notificatinsSlice.actions;

export default notificatinsSlice.reducer;
