// wishlistSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishList } from "../../../generated";

interface WishlistState {
  wishlist: WishList | null;
  totalWishlistItems: number;
}

const initialState: WishlistState = {
  wishlist: null,
  totalWishlistItems: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<WishList | null>) {
      state.wishlist = action.payload;
      state.totalWishlistItems = action.payload?.products?.length ?? 0;
    },
    clearWishlist(state) {
      state.wishlist = null;
      state.totalWishlistItems = 0;
    },
  },
});

export const { setWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
