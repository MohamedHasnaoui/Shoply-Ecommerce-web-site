import gql from "graphql-tag";

export const adminShema = gql`
  type AdminHomeStatistics {
    registeredSeller: Int
    registeredBuyers: Int
    newOrders: Int
    newProducts: Int
  }
  type bestSellerInfo {
    id: Int!
    firstName: String!
    lastName: String!
    selledProducts: Int!
  }
  type frequentBuyersInfo {
    id: Int!
    firstName: String!
    lastName: String!
    nbPurchasedProducts: Int!
    nbPlacedOrders: Int!
  }
  type Query {
    getAdminHomeStatistics(period: PeriodFilter): AdminHomeStatistics!
    getRegisteredUsersByPeriod(period: PeriodFilter, role: Role!): [Int!]!
    getBestSellers(period: PeriodFilter): [bestSellerInfo!]!
    getFrequentBuyers(period: PeriodFilter): [frequentBuyersInfo!]!
  }
  type Mutation {
    updateUserBlockStatus(userId: Int!, isBlocked: Boolean!): Boolean!
    updateProductDisableStatus(productId: Int!, isDisabled: Boolean!): Boolean!
  }
`;
