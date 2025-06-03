// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // utilise localStorage
import { authReducer } from "./slices/auth/authSlice";
import cartReducer from "./slices/cartSlice";
import paymentReducer from "./slices/payment/paymentSlice";
import wishlistReducer from "./slices/wishlistSlice/wishlistSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "wishlist", "auth"], // persistera uniquement les slices spécifiées
  // tu peux ajouter "wishlist", "auth", etc. si tu souhaites aussi persister d’autres slices
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  payment: paymentReducer,
  wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/FLUSH",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
