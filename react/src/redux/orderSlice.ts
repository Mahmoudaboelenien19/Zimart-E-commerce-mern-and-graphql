import { ORDER } from "./../types/order.d";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { order: ORDER[] } = {
  order: Array.from({ length: 18 }),
};

const orderSlice = createSlice({
  name: "order-slice",
  initialState,
  reducers: {
    addToOrderRedux(state, action) {
      if (Array.isArray(action.payload)) {
        state.order = [...action.payload, ...state.order];
      } else {
        state.order = [action.payload, ...state.order];
      }
    },

    removeFromOrderRedux(state, action) {
      const arr = action.payload;
      for (const el of arr) {
        state.order = state.order.filter((st: ORDER) => st._id !== el);
      }
    },
    clearOrdersRedux(state) {
      state.order = [];
    },
    ordersSkeltonRedux(state) {
      state.order = Array.from({ length: 18 });
    },
    updateOrderRedux(state, action) {
      const date = () => new Date().toISOString();
      state.order = state.order.map((order: ORDER) =>
        action.payload.id === order._id
          ? {
              ...order,
              state: action.payload.state,
              deliveredAt: action.payload.state === "delivered" ? date() : "",
            }
          : order
      );
    },
  },
});

export const {
  addToOrderRedux,
  removeFromOrderRedux,
  updateOrderRedux,
  clearOrdersRedux,
  ordersSkeltonRedux,
} = orderSlice.actions;
export default orderSlice.reducer;
