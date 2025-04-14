import { QueryOptions, MutationOptions } from "@apollo/client";
import {
  GetOrderItemsForSellerQuery,
  GetOrderItemsForSellerQueryVariables,
  GetRecievedOrderItemsStatisticsQuery,
  GetRecievedOrderItemsStatisticsQueryVariables,
  OrderItemFilter,
  OrderItemStatus,
  PeriodFilter,
  UpdateOrderItemStatusMutation,
  UpdateOrderItemStatusMutationVariables,
} from "../../generated";
import {
  GET_ORDER_ITEMS_SELLER_QUERY,
  GET_RECIEVED_ORDER_ITEM_STATISTICS,
  UPDATE_ORDERITEM_STATUS,
} from "../../graphql/orderItem.graphql";
import { client } from "../../graphqlProvider";

class OrderItemService {
  async getSellerOrderItems(input: OrderItemFilter) {
    const options: QueryOptions<
      GetOrderItemsForSellerQueryVariables,
      GetOrderItemsForSellerQuery
    > = {
      query: GET_ORDER_ITEMS_SELLER_QUERY,
      variables: { input },
    };
    const response = await client.query(options);
    return response;
  }
  async updateOrderItemStatus(orderItemId: number, status: OrderItemStatus) {
    const options: MutationOptions<
      UpdateOrderItemStatusMutation,
      UpdateOrderItemStatusMutationVariables
    > = {
      mutation: UPDATE_ORDERITEM_STATUS,
      variables: { orderItemId, status },
    };
    const response = await client.mutate(options);
    return response;
  }
  async getRecievedOrderItemsStatistics(period?: PeriodFilter) {
    const options: QueryOptions<
      GetRecievedOrderItemsStatisticsQueryVariables,
      GetRecievedOrderItemsStatisticsQuery
    > = {
      query: GET_RECIEVED_ORDER_ITEM_STATISTICS,
      variables: { period },
    };
    const response = await client.query(options);
    return response;
  }
}
export const orderItemService = new OrderItemService();
