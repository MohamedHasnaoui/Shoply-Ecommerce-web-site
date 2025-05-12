import { gql } from "@apollo/client";

export const CREATE_CART_ITEM = gql`
  mutation CreateCartItem($input: CartItemInput!) {
    creatCartItem(input: $input) {
      id
      quantity
      price
      product {
        id
        name
        price
      }
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($input: CartItemUpdateInput!) {
    updateCartItem(input: $input) {
      id
      quantity
      price
      product {
        id
        name
        price
      }
    }
  }
`;

export const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($idCartItem: Int!) {
    removeCartItem(idCartItem: $idCartItem)
  }
`;
