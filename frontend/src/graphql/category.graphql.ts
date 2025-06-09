import { gql } from "@apollo/client";

export const GET_ALL_CATEG = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
      description
      createdAt
      updatedAt
      productCount
    }
  }
`;
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($id: Int!) {
    getCategory(id: $id) {
      id
      name
      description
      image
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($input: CategoryUpdatedInput) {
    updateCategory(input: $input) {
      id
      name
      description
      image
    }
  }
`;
