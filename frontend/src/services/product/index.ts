import { MutationOptions, QueryOptions } from "@apollo/client";
import {
  CreateProductInput,
  CreateProductMutation,
  CreateProductMutationVariables,
  Exact,
  GetAllCategoriesQuery,
  GetProductsByCategoryQuery,
  GetProductsByCategoryQueryVariables,
  InputMaybe,
  Scalars,
} from "../../generated";
import {
  ALL_CATEG_ID_NAME,
  GET_PRODUCTS_BY_CATEGORY,
  CREATE_PRODUCT_MUTATION,
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
  async getProductsByCategory(
    categoryId: number,
    pageNb?: number,
    pageSize?: number
  ) {
    const options: QueryOptions<
      GetProductsByCategoryQuery,
      GetProductsByCategoryQueryVariables
    > = {
      query: GET_PRODUCTS_BY_CATEGORY,
      variables: { categoryId, pageNb, pageSize },
    };
    const response = await client.query<GetProductsByCategoryQuery>(options);
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
}

export const productService = new ProductService();
