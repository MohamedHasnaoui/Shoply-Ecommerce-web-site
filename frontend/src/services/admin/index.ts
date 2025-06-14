import { QueryOptions, MutationOptions } from "@apollo/client";
import {
  GetAdminHomeStatisticsQueryVariables,
  GetAdminHomeStatisticsQuery,
  PeriodFilter,
  Role,
  GetRegisteredUsersByPeriodQuery,
  GetRegisteredUsersByPeriodQueryVariables,
  GetBestSellersQueryVariables,
  GetBestSellersQuery,
  GetFrequentBuyersQueryVariables,
  GetFrequentBuyersQuery,
  UpdateUserBlockStatusMutation,
  UpdateUserBlockStatusMutationVariables,
  UpdateProductDisableStatusMutation,
  UpdateProductDisableStatusMutationVariables,
} from "../../generated";
import {
  GET_ADMIN_HOME_STATISTICS,
  GET_BEST_SELLERS,
  GET_FREQUENT_BUYERS,
  GET_REGISTERED_USERS_BY_PERIOD,
  UPDATE_PRODUCT_DISABLED_STATUS,
  UPDATE_USER_BLOCK_STATUS,
} from "../../graphql/admin.graphql";
import { client } from "../../graphqlProvider";

class AdminService {
  async getAdminStatistics(period?: PeriodFilter) {
    const options: QueryOptions<
      GetAdminHomeStatisticsQueryVariables,
      GetAdminHomeStatisticsQuery
    > = {
      query: GET_ADMIN_HOME_STATISTICS,
      variables: { period },
    };
    const response = await client.query(options);
    return response;
  }
  async getRegisteredUsersByPeriod(role: Role, period?: PeriodFilter) {
    const options: QueryOptions<
      GetRegisteredUsersByPeriodQueryVariables,
      GetRegisteredUsersByPeriodQuery
    > = {
      query: GET_REGISTERED_USERS_BY_PERIOD,
      variables: { period, role },
    };
    const response = await client.query(options);
    return response;
  }
  async getBestSellers(period?: PeriodFilter) {
    const options: QueryOptions<
      GetBestSellersQueryVariables,
      GetBestSellersQuery
    > = {
      query: GET_BEST_SELLERS,
      variables: { period },
    };
    const response = await client.query(options);
    return response;
  }
  async getFrequentBuyers(period?: PeriodFilter) {
    const options: QueryOptions<
      GetFrequentBuyersQueryVariables,
      GetFrequentBuyersQuery
    > = {
      query: GET_FREQUENT_BUYERS,
      variables: { period },
    };
    const response = await client.query(options);
    return response;
  }
  async UpdateUserBlockStatus(userId: number, isBlocked: boolean) {
    const options: MutationOptions<
      UpdateUserBlockStatusMutation,
      UpdateUserBlockStatusMutationVariables
    > = {
      mutation: UPDATE_USER_BLOCK_STATUS,
      variables: { userId, isBlocked },
    };
    const response = await client.mutate(options);
    return response;
  }
  async UpdateProductDisableStatus(productId: number, isDisabled: boolean) {
    const options: MutationOptions<
      UpdateProductDisableStatusMutation,
      UpdateProductDisableStatusMutationVariables
    > = {
      mutation: UPDATE_PRODUCT_DISABLED_STATUS,
      variables: { isDisabled, productId },
    };
    const response = await client.mutate(options);
    return response;
  }
}
export const adminService = new AdminService();
