import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/authSlice";
import cartReducer from "./slices/cartSlice";
import paymentReducer from "./slices/payment/paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
