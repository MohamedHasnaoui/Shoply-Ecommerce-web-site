import { gql } from "@apollo/client";

export const GET_CUSTOMER_INFO = gql`
  query GetCustomerInfo($Id: Int!) {
    getUserById(id: $Id) {
      id
      email
      firstName
      lastName
      country
      city
      street
      postalCode
      phoneNumber
      birthDay
      gender
      profileImg
      coverImg
      role
    }
  }
`;

export const GET_CUSTOMER_PAST_ORDERS = gql`
  query GetCustomerPastOrderItems($customerId: Int!) {
    getCustomerPastOrderItems(customerId: $customerId) {
      id
      quantity
      price
      status
      createdAt
      updatedAt
      product {
        id
        name
      }
    }
  }
`;
