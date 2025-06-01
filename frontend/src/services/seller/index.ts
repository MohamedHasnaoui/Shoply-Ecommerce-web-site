import { QueryOptions } from "@apollo/client";
import {
  GetCustomerInfoQuery,
  GetCustomerInfoQueryVariables,
  GetCustomerPastOrderItemsQuery,
  GetCustomerPastOrderItemsQueryVariables,
} from "../../generated";
import {
  GET_CUSTOMER_INFO,
  GET_CUSTOMER_PAST_ORDERS,
} from "../../graphql/seller.graphql";
import { client } from "../../graphqlProvider";

class SellerService {
  async getCustomerInfos(customerId: number) {
    const options: QueryOptions<
      GetCustomerInfoQueryVariables,
      GetCustomerInfoQuery
    > = {
      query: GET_CUSTOMER_INFO,
      variables: { Id: customerId },
    };
    const response = await client.query(options);
    return response;
  }
  async getCustomerPastOrders(customerId: number) {
    const options: QueryOptions<
      GetCustomerPastOrderItemsQueryVariables,
      GetCustomerPastOrderItemsQuery
    > = {
      query: GET_CUSTOMER_PAST_ORDERS,
      variables: { customerId },
    };
    const response = await client.query(options);
    return response;
  }
}

export const sellerService = new SellerService();
