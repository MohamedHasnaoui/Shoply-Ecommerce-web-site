import { gql } from "@apollo/client";

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
      numberOfReviews
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
          id
          name
        }
        owner {
          id
          firstName
          lastName
        }
        createdAt
        isDisabled
        numberOfReviews
        totalOrders
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
export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($productId: Int!) {
    getProduct(id: $productId) {
      id
      name
      reference
      images
      rating
      numberOfReviews
      description
      quantity
      price
      category {
        id
        name
      }
      createdAt
      totalOrders
      isDisabled
      owner {
        id
        firstName
        lastName
      }
      reviews {
        id
        rating
        comment
        createdAt
        reviewer {
          id
          firstName
          lastName
        }
      }
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
        totalOrders
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

export const GET_TOP_SELLING_PRODUCT_ = gql`
  query GetSellerTopProducts($nbProduct: Int!) {
    getSellerTopProducts(nbProduct: $nbProduct) {
      product {
        id
        name
        rating
      }
      totalSold
    }
  }
`;
