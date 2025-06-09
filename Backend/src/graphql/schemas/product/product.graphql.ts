import { gql } from "graphql-tag";

export const productSchema = gql`
  #graphql

  type Product {
    id: Int!
    name: String
    reference: String
    images: [String!]
    rating: Float
    numberOfReviews: Int
    description: String
    quantity: Int
    price: Float
    category: Category
    createdAt: DateTime
    totalOrders: Int
    isDisabled: Boolean
    owner: User
    reviews: [Review!]
  }

  input CreateProductInput {
    name: String!
    reference: String!
    description: String!
    images: [String!]!
    quantity: Int!
    price: Float!
    categoryId: Int!
  }
  input UpdateProductInput {
    id: Int!
    name: String
    reference: String
    description: String
    images: [String]
    rating: Int
    quantity: Int
    price: Float
    categoryId: Int
  }
  type ProductListResult {
    products: [Product!]!
    count: Int!
  }
  type ProductsStatistics {
    countAvailable: Int!
    countOutOfStock: Int!
  }
  input ProductFilter {
    productId: Int
    isDisabled: Boolean
    available: Boolean
    categoryId: Int
    name: String
    pageNb: Int
    pageSize: Int
    orderBy: String
    minPrice: Float
    maxPrice: Float
    price: Float
    minRating: Int
  }
  type productAndNbOrders {
    product: Product!
    totalSold: Int!
  }
  type Query {
    getAllProducts(input: ProductFilter): ProductListResult!
    getAllMyProducts(input: ProductFilter): ProductListResult!
    getProduct(id: Int!): Product!
    getMyProductsStatistics: ProductsStatistics!
    getSellerTopProducts(nbProduct: Int!): [productAndNbOrders!]
    getTopSellingProducts(input: ProductFilter): [productAndNbOrders!]
  }
  type Mutation {
    createProduct(input: CreateProductInput!): Product
    updateProduct(input: UpdateProductInput!): Product
    removeProduct(productId: Int!): Boolean!
    incrementQuantity(productId: Int!, addedQte: Int!): Product
  }
`;
