import gql from "graphql-tag";

export const paymentSchema = gql`
  #graphql
  type PaymentSession {
    sessionUrl: String!
    sessionId: String!
  }
  type Mutation {
    # createCustomerStripeId: String
    creatPaymentIntent: PaymentSession!
    verifyPayment(sessionId: String!): Boolean!
  }
`;
