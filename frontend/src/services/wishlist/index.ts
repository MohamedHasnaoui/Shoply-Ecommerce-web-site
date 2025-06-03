import { client } from "../../graphqlProvider";
import {
  GET_WISHLIST,
  ADD_PRODUCT_TO_WISHLIST,
  DELETE_PRODUCT_FROM_WISHLIST,
  GET_FILTERED_WISHLIST,
} from "../../graphql/wishlist.graphql";
import {
  GetWishListQuery,
  AddProductToWishListMutation,
  AddProductToWishListMutationVariables,
  DeleteProductFromWishListMutation,
  DeleteProductFromWishListMutationVariables,
  GetFilteredWishListQueryVariables,
  GetFilteredWishListQuery,
} from "../../generated";

export class WishListService {
  async getWishList() {
    const response = await client.query<GetWishListQuery>({
      query: GET_WISHLIST,
      fetchPolicy: "no-cache",
    });

    return response.data.getWishList;
  }

  async getFilteredWishList(input: GetFilteredWishListQueryVariables["input"]) {
    const response = await client.query<
      GetFilteredWishListQuery,
      GetFilteredWishListQueryVariables
    >({
      query: GET_FILTERED_WISHLIST,
      variables: { input },
      fetchPolicy: "no-cache",
    });

    return response.data.getFilteredWishList;
  }

  async addProductToWishList(productId: number) {
    const response = await client.mutate<
      AddProductToWishListMutation,
      AddProductToWishListMutationVariables
    >({
      mutation: ADD_PRODUCT_TO_WISHLIST,
      variables: { productId },
    });

    return response.data?.addProductToWishList;
  }

  async deleteProductFromWishList(productId: number) {
    const response = await client.mutate<
      DeleteProductFromWishListMutation,
      DeleteProductFromWishListMutationVariables
    >({
      mutation: DELETE_PRODUCT_FROM_WISHLIST,
      variables: { productId },
    });

    return response.data?.deleteProductFromWishList;
  }
}

export const wishListService = new WishListService();
