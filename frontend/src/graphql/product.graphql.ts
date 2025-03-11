import { gql } from "@apollo/client";

export const ALL_CATEG_ID_NAME = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      reference
      images
      rating
      quantity
      price
    }
  }
`;
export const GET_MY_PRODUCTS = gql`
  query GetAllMyProducts(
    $available: Boolean
    $categoryId: Int
    $pageNb: Int
    $pageSize: Int
  ) {
    getAllMyProducts(
      available: $available
      categoryId: $categoryId
      pageNb: $pageNb
      pageSize: $pageSize
    ) {
      products {
        id
        name
        reference
        images
        rating
        quantity
        price
        category {
          name
        }
        createdAt
      }
      count
    }
  }
`;

export const GET_PRODUCTS_STOCK_COUNTS = gql`
  query GetMyProductsStatistics {
    getMyProductsStatistics {
      countAvailable
      countOutOfStock
    }
  }
`;
