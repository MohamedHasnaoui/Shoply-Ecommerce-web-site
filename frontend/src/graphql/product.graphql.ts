import { gql } from "@apollo/client";

export const ALL_CATEG_ID_NAME = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;

// export const GET_PRODUCTS_BY_CATEGORY = gql`
//   query GetProductsByCategory($categoryId: Int!, $pageNb: Int, $pageSize: Int) {
//     getProductsByCategory(
//       categoryId: $categoryId
//       pageNb: $pageNb
//       pageSize: $pageSize
//     ) {
//       id
//       name
//       reference
//       images
//       rating
//       quantity
//       price
//     }
//   }
// `;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      reference
      images
      rating
      description
      quantity
      price
      category {
        id
      }
      createdAt
    }
  }
`;
export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
      name
      reference
      images
      rating
      description
      quantity
      price
      category {
        id
      }
      createdAt
    }
  }
`;
export const GET_ALL_PRODUCTS_FILTERED = gql`
  query GetAllProducts($input: ProductFilter) {
    getAllProducts(input: $input) {
      products {
        id
        name
        reference
        images
        rating
        description
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

export const GET_PRODUCT_BY_ID = gql`
  query GetProduct($productId: Int!) {
    getProduct(id: $productId) {
      id
      name
      reference
      images
      rating
      description
      quantity
      price
      category {
        id
        name
      }
      createdAt
    }
  }
`;
export const GET_MY_PRODUCTS = gql`
  query GetAllMyProducts($input: ProductFilter) {
    getAllMyProducts(input: $input) {
      products {
        id
        name
        reference
        images
        rating
        description
        quantity
        price
        category {
          name
        }
        createdAt
        totalSales
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

export const DELETE_PRODUCT_MUTATION = gql`
  mutation RemoveProduct($productId: Int!) {
    removeProduct(productId: $productId)
  }
`;
