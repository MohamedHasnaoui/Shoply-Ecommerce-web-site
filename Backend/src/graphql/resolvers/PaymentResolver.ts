import { Resolvers } from "../types/resolvers-types.js";
import { paymentController } from "../../controllers/PaymentController.js"; // Import the new controller

export const PaymentResolver: Resolvers = {
  Mutation: {
    creatPaymentIntent: paymentController.creatPaymentIntent.bind(paymentController),
    verifyPayment: paymentController.verifyPayment.bind(paymentController),
  },
};