// cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShoppingCart } from "../../generated";

interface CartState {
  cart: ShoppingCart | null;
  totalItems: number;
}

const initialState: CartState = {
  cart: null,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<ShoppingCart | null>) {
      state.cart = action.payload;
      state.totalItems = action.payload?.cartItems?.length ?? 0;
    },

    clearCart(state) {
      state.cart = null;
      state.totalItems = 0;
    },
  },
});

export const { setCartItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
