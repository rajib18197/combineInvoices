import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push({ ...action.payload, quantity: 1 });
    },

    increaseQuantity(state, action) {
      state.cart = state.cart.map((c) =>
        c.id === action.payload ? { ...c, quantity: c.quantity + 1 } : { ...c }
      );
    },

    decreaseQuantity(state, action) {
      state.cart = state.cart.map((c) =>
        c.id === action.payload ? { ...c, quantity: c.quantity - 1 } : { ...c }
      );
    },

    removeCart(state, action) {
      state.cart = state.cart.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const cartState = (state) => state.cart;
