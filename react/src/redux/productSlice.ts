import { createSlice } from "@reduxjs/toolkit";
import { ProductInterface, reviewInterface } from "../interfaces/product";

const initialState: { Allproducts: ProductInterface[] } = {
  Allproducts: [],
};

const productSlice = createSlice({
  name: "product-slice",
  initialState,
  reducers: {
    addToProductRedux(state, action) {
      if (Array.isArray(action.payload)) {
        state.Allproducts = [...action.payload, ...state.Allproducts];
      } else {
        state.Allproducts = [action.payload, ...state.Allproducts];
      }
    },

    removeFromProductRedux(state, action) {
      const arr = action.payload;
      for (const el of arr) {
        state.Allproducts = state.Allproducts.filter((obj) => obj._id !== el);
      }
    },

    updateProductRedux(state, action) {
      console.log(action.payload);
      state.Allproducts = state.Allproducts.map((obj) =>
        obj._id === action.payload._id ? { ...obj, ...action.payload.obj } : obj
      );
    },

    addReviewRedux(state, action) {
      state.Allproducts = state.Allproducts.map((product) =>
        product._id === action.payload._id
          ? {
              ...product,
              reviews: [...product.reviews, action.payload.reviewObj],
            }
          : product
      );
    },
    updateReviewRedux(state, action) {
      state.Allproducts = state.Allproducts.map((product: ProductInterface) =>
        product._id === action.payload.productId
          ? {
              ...product,
              reviews: [
                ...product.reviews.map((review: reviewInterface) =>
                  review.userId === action.payload.userId
                    ? {
                        ...review,
                        rate: action.payload.rate,
                        review: action.payload.review,
                      }
                    : review
                ),
              ],
            }
          : product
      );
    },
  },
});

export const {
  addToProductRedux,
  removeFromProductRedux,
  addReviewRedux,
  updateReviewRedux,
  updateProductRedux,
} = productSlice.actions;
export default productSlice.reducer;
