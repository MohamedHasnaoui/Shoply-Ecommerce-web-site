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
