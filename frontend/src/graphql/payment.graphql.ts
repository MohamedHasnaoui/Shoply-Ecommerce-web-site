import { gql } from "@apollo/client";

export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatPaymentIntent {
    creatPaymentIntent {
      sessionUrl
      sessionId
    }
  }
`;
export const VERIFY_PAYMENT = gql`
  query VerifyPayment($sessionId: String!) {
    verifyPayment(sessionId: $sessionId) {
      isSuccess
      amount
      currency
      customerEmail
    }
  }
`;
