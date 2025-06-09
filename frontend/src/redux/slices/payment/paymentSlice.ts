import { createSlice } from "@reduxjs/toolkit";

interface PaymentState {
  paymentVerified: boolean;
}

const initialState: PaymentState = {
  paymentVerified: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    verifyPayment: (state) => {
      state.paymentVerified = true;
    },
    resetPayment: (state) => {
      state.paymentVerified = false;
    },
  },
});

export const { verifyPayment, resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
