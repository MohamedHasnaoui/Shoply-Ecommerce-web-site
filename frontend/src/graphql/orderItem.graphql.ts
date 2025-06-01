import { gql } from "@apollo/client";

export const GET_ORDER_ITEMS_SELLER_QUERY = gql`
  query GetOrderItemsForSeller($input: OrderItemFilter!) {
    getOrderItemsForSeller(input: $input) {
      orderItems {
        id
        product {
          id
          name
        }
        order {
          buyer {
            id
            firstName
            lastName
          }
        }
        quantity
        price
        status
        createdAt
        updatedAt
      }
      count
    }
  }
`;
export const UPDATE_ORDERITEM_STATUS = gql`
  mutation UpdateOrderItemStatus(
    $orderItemId: Int!
    $status: OrderItemStatus!
  ) {
    updateOrderItemStatus(orderItemId: $orderItemId, status: $status) {
      id
      product {
        id
        name
      }
      quantity
      price
      status
      createdAt
      updatedAt
    }
  }
`;
export const GET_RECIEVED_ORDER_ITEM_STATISTICS = gql`
  query GetRecievedOrderItemsStatistics($period: PeriodFilter) {
    getRecievedOrderItemsStatistics(period: $period) {
      countPending
      countCanceledOrFailed
      countDelivered
      all
    }
  }
`;
export const GENERAL_STATISTICS_QUERY = gql`
  query GetGeneralOrderItemsStatistics($period: PeriodFilter) {
    getRecievedOrderItemsStatistics(period: $period) {
      countDelivered
      all
      totalEarnings
      totalNewCustomers
    }
  }
`;
export const GET_EARNING_BY_PERIOD = gql`
  query GetEarningByPeriod($period: PeriodFilter) {
    getEarningByPeriod(period: $period)
  }
`;
export const GET_ORDERS_BY_PERIOD = gql`
  query GetOrdersByPeriod($period: PeriodFilter) {
    getOrdersByPeriod(period: $period)
  }
`;
