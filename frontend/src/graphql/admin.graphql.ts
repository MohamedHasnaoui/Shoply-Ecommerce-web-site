import { gql } from "@apollo/client";

export const GET_ADMIN_HOME_STATISTICS = gql`
  query GetAdminHomeStatistics($period: PeriodFilter) {
    getAdminHomeStatistics(period: $period) {
      registeredSeller
      registeredBuyers
      newOrders
      newProducts
    }
  }
`;

export const GET_REGISTERED_USERS_BY_PERIOD = gql`
  query GetRegisteredUsersByPeriod($role: Role!, $period: PeriodFilter) {
    getRegisteredUsersByPeriod(role: $role, period: $period)
  }
`;

export const GET_BEST_SELLERS = gql`
  query GetBestSellers($period: PeriodFilter) {
    getBestSellers(period: $period) {
      id
      firstName
      lastName
      selledProducts
    }
  }
`;

export const GET_FREQUENT_BUYERS = gql`
  query GetFrequentBuyers($period: PeriodFilter) {
    getFrequentBuyers(period: $period) {
      id
      firstName
      lastName
      nbPurchasedProducts
      nbPlacedOrders
    }
  }
`;
export const UPDATE_USER_BLOCK_STATUS = gql`
  mutation UpdateUserBlockStatus($userId: Int!, $isBlocked: Boolean!) {
    updateUserBlockStatus(userId: $userId, isBlocked: $isBlocked)
  }
`;

export const UPDATE_PRODUCT_DISABLED_STATUS = gql`
  mutation UpdateProductDisableStatus($productId: Int!, $isDisabled: Boolean!) {
    updateProductDisableStatus(productId: $productId, isDisabled: $isDisabled)
  }
`;
