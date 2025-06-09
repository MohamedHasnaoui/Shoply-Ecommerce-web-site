import { QueryOptions } from "@apollo/client";
import { GetMyOrdersQuery, GetMyOrdersQueryVariables } from "../../generated";
import { GET_BUYER_ORDERS } from "../../graphql/order.graphql";
import { client } from "../../graphqlProvider";

class OrderService {
  async getBuyerOrders(pageNb?: number, pageSize?: number) {
    const options: QueryOptions<GetMyOrdersQueryVariables, GetMyOrdersQuery> = {
      variables: { pageNb, pageSize },
      query: GET_BUYER_ORDERS,
    };
    const response = await client.query(options);
    return response;
  }
}
export const orderService = new OrderService();
