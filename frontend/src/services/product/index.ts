import { MutationOptions, QueryOptions } from "@apollo/client";
import {
  CreateProductInput,
  CreateProductMutation,
  CreateProductMutationVariables,
  GetAllCategoriesQuery,
} from "../../generated";
import {
  ALL_CATEG_ID_NAME,
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
