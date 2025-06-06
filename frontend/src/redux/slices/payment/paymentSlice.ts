import { createSlice } from "@reduxjs/toolkit";

interface PaymentState {
  paymentVerified: boolean;
  status?: string;
}

const initialState: PaymentState = {
  paymentVerified: false,
  status: undefined,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    verifyPayment: (state, action) => {
      state.status = action.payload.status;
      state.paymentVerified = action.payload.status === "paid";
    },
    resetPayment: (state) => {
      state.paymentVerified = false;
      state.status = undefined;
    },
  },
});

export const { verifyPayment, resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
