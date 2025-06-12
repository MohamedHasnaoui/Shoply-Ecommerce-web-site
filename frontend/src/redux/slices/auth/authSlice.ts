import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "./types";

const initialState: IAuth = {
  currentUser: null,
  signupEmail: null,
};
const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginAction(state, action) {
      state.currentUser = action.payload;
    },
    logoutAction(state) {
      state.currentUser = null;
      localStorage.removeItem("jwt");
    },
    setSignupEmail(state, action) {
      state.signupEmail = action.payload;
    },
    deleteSignupEmail(state) {
      state.signupEmail = null;
    },
    updateUserAction(state, action) {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
});
export const {
  loginAction,
  logoutAction,
  setSignupEmail,
  deleteSignupEmail,
  updateUserAction,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
