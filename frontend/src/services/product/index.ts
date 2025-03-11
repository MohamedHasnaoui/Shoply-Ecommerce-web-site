import { MutationOptions, QueryOptions } from "@apollo/client";
import {
  CreateProductInput,
  CreateProductMutation,
  CreateProductMutationVariables,
  GetAllCategoriesQuery,
  GetAllMyProductsQuery,
  GetAllMyProductsQueryVariables,
  GetMyProductsStatisticsQuery,
  GetMyProductsStatisticsQueryVariables,
} from "../../generated";
import {
  ALL_CATEG_ID_NAME,
  CREATE_PRODUCT_MUTATION,
  GET_MY_PRODUCTS,
  GET_PRODUCTS_STOCK_COUNTS,
} from "../../graphql/product.graphql";
import { client } from "../../graphqlProvider";

class ProductService {
  async getCatgories() {
    const options: QueryOptions<GetAllCategoriesQuery> = {
      query: ALL_CATEG_ID_NAME,
    };
    const response = await client.query<GetAllCategoriesQuery>(options);
    return response;
  }
  async createProduct(input: CreateProductInput) {
    const options: MutationOptions<
      CreateProductMutation,
      CreateProductMutationVariables
    > = {
      mutation: CREATE_PRODUCT_MUTATION,
      variables: { input },
    };
    const response = await client.mutate(options);
    return response;
  }
  async getMyProducts(
    categoryId?: number,
    available?: boolean,
    pageNb?: number,
    pageSize?: number
  ) {
    const options: QueryOptions<
      GetAllMyProductsQueryVariables,
      GetAllMyProductsQuery
    > = {
      query: GET_MY_PRODUCTS,
      variables: { pageNb, pageSize, available, categoryId },
    };
    const response = await client.query(options);
    return response;
  }
  async getProductStockCounts() {
    const options: QueryOptions<
      GetMyProductsStatisticsQueryVariables,
      GetMyProductsStatisticsQuery
    > = {
      query: GET_PRODUCTS_STOCK_COUNTS,
    };
    const response = await client.query(options);
    return response;
  }
}

export const productService = new ProductService();
