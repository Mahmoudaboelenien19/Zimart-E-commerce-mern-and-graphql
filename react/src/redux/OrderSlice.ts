import { createSlice } from "@reduxjs/toolkit";
import { OrderInterface } from "../interfaces/order";

const initialState: { order: OrderInterface[] } = {
  order: [],
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
        state.order = state.order.filter((st: OrderInterface) => st._id !== el);
      }
    },

    updateOrderRedux(state, action) {
      state.order = state.order.map((order: OrderInterface) =>
        action.payload.id === order._id
          ? {
              ...order,
              state: action.payload.state,
              deliveredAt: action.payload.deliveredAt,
            }
          : order
      );
    },
  },
});

export const { addToOrderRedux, removeFromOrderRedux, updateOrderRedux } =
  orderSlice.actions;
export default orderSlice.reducer;
