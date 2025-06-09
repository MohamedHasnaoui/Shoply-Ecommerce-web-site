import { QueryOptions, MutationOptions } from "@apollo/client";
import {
  CategoryInput,
  CategoryUpdatedInput,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  GetAllCategoriesQuery,
  GetCategoryQuery,
  GetCategoryQueryVariables,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
} from "../../generated";
import {
  CREATE_CATEGORY,
  GET_ALL_CATEG,
  GET_CATEGORY,
  UPDATE_CATEGORY,
} from "../../graphql/category.graphql";
import { client } from "../../graphqlProvider";

class CategoryService {
  async getCatgories() {
    const options: QueryOptions<GetAllCategoriesQuery> = {
      query: GET_ALL_CATEG,
    };
    const response = await client.query<GetAllCategoriesQuery>(options);
    return response;
  }
  async createCategory(input: CategoryInput) {
    const options: MutationOptions<
      CreateCategoryMutation,
      CreateCategoryMutationVariables
    > = {
      mutation: CREATE_CATEGORY,
      variables: { input },
    };
    const response = await client.mutate(options);
    return response;
  }
  async updateCategory(input: CategoryUpdatedInput) {
    const options: MutationOptions<
      UpdateCategoryMutation,
      UpdateCategoryMutationVariables
    > = {
      mutation: UPDATE_CATEGORY,
      variables: { input },
    };
    const response = await client.mutate(options);
    return response;
  }
  async getCategory(id: number) {
    const options: QueryOptions<GetCategoryQueryVariables, GetCategoryQuery> = {
      query: GET_CATEGORY,
      variables: { id },
    };
    const response = await client.query(options);
    return response;
  }
}

export const categoryService = new CategoryService();
