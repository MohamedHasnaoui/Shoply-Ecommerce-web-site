import { gql } from "graphql-tag";

export const authSchema = gql`
  #graphql
  enum Gender {
    MALE
    FEMALE
  }
  enum Role {
    ADMIN
    BUYER
    SELLER
  }
`;
