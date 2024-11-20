import { gql } from "graphql-tag";

export const paymentSchema = gql`
  #graphql
  enum PaymentType {
    Visa
    PayPal
  }
`;
