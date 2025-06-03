import { gql } from "@apollo/client";

export const GET_WISHLIST = gql`
  query GetWishList {
    getWishList {
      id
      products {
        id
        name
        price
        images
        quantity
        category {
          id
          name
        }
        rating
      }
    }
  }
`;

export const ADD_PRODUCT_TO_WISHLIST = gql`
  mutation AddProductToWishList($productId: Int!) {
    addProductToWishList(productId: $productId) {
      id
      products {
        id
      }
    }
  }
`;

export const DELETE_PRODUCT_FROM_WISHLIST = gql`
  mutation DeleteProductFromWishList($productId: Int!) {
    deleteProductFromWishList(productId: $productId)
  }
`;
export const GET_FILTERED_WISHLIST = gql`
  query GetFilteredWishList($input: ProductFilterInput) {
    getFilteredWishList(input: $input) {
      id
      name
      price
      rating
      quantity
      category {
        id
        name
      }
    }
  }
`;
