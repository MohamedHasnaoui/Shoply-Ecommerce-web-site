import { gql } from "@apollo/client";

export const GET_BUYER_ORDERS = gql`
  query GetMyOrders {
    getMyOrders {
      orders {
        id
        status
        totalAmount
        orderItems {
          id
          product {
            id
            name
            images
            rating
            quantity
            price
            createdAt
          }
          quantity
          price
          status
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      totalCount
    }
  }
`;
