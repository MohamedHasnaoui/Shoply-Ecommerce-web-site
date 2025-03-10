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
