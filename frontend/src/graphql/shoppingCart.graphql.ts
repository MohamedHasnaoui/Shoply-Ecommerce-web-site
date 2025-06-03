import { gql } from "@apollo/client";

export const GET_SHOPPING_CART = gql`
  query GetShoppingCart {
    getShoppingCart {
      id
      totalAmount
      cartItems {
        id
        price
        quantity
        product {
          id
          name
          reference
          images
          price
          category {
            name
          }
        }
      }
    }
  }
`;
export const CANCEL_SHOPPING_CART = gql`
  mutation CancelShoppingCart {
    cancelShoppingCart
  }
`;
