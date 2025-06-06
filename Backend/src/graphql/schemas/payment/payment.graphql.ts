import gql from "graphql-tag";

export const paymentSchema = gql`
  #graphql
  type PaymentSession {
    sessionUrl: String!
    sessionId: String!
  }
  type PaymentStatus {
    status: String!
  }
  type PaymentVerificationResult {
    status: String!
    isSuccess: Boolean!
    sessionId: String!
    amount: Int
    currency: String
    customerEmail: String
    paymentIntentId: String
    created: Int
  }

  type Mutation {
    # createCustomerStripeId: String
    creatPaymentIntent: PaymentSession!
  }
  type Query {
    verifyPayment(sessionId: String!): PaymentVerificationResult!
  }
`;
