import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/serverState/apiSlice";
import cartSliceReducer from "../features/invoices/cartSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleWares) =>
    getDefaultMiddleWares().concat(apiSlice.middleware),
});

export default store;
