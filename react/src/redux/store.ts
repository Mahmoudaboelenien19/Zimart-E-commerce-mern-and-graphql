import { configureStore } from "@reduxjs/toolkit";
import favSlice from "./favSlice.js";
import compareSlice from "./compareSlice.js";
import productSlice from "./productSlice.js";
import notificationSlice from "./notificationsSlice.js";
import BlogsSlice from "./BlogsSlice.js";
import cartSlice from "./cartSlice.js";
import orderSlice from "./orderSlice.js";
import userSlice from "./userSlice.js";
import userDataSlice from "./userDataSlice.js";
import isAuthSlice from "./Auth.js";
import clrSlice from "./bannerClr.js";
import themeSlice from "./themeSlice.js";
export const store = configureStore({
  reducer: {
    fav: favSlice,
    cart: cartSlice,
    compare: compareSlice,
    Allproducts: productSlice,
    isAuth: isAuthSlice,
    userData: userDataSlice,
    user: userSlice,
    order: orderSlice,
    notification: notificationSlice,
    blogs: BlogsSlice,
    bannerClr: clrSlice,
    theme: themeSlice,
  },
});

export type RootType = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
