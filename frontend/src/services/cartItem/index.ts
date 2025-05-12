import { QueryOptions, MutationOptions } from "@apollo/client";
import {
  CartItem,
  CartItemInput,
  CartItemUpdateInput,
  CreateCartItemMutation,
  CreateCartItemMutationVariables,
  UpdateCartItemMutation,
  UpdateCartItemMutationVariables,
  RemoveCartItemMutation,
  RemoveCartItemMutationVariables,
} from "../../generated";
import {
  CREATE_CART_ITEM,
  UPDATE_CART_ITEM,
  REMOVE_CART_ITEM,
} from "../../graphql/cartItem.graphql";
import { client } from "../../graphqlProvider";

class CartItemService {
  async createCartItem(input: CartItemInput) {
    const options: MutationOptions<
      CreateCartItemMutation,
      CreateCartItemMutationVariables
    > = {
      mutation: CREATE_CART_ITEM,
      variables: { input },
    };
    const response = await client.mutate(options);
    return response.data?.creatCartItem as CartItem;
  }

  async updateCartItem(input: CartItemUpdateInput) {
    const options: MutationOptions<
      UpdateCartItemMutation,
      UpdateCartItemMutationVariables
    > = {
      mutation: UPDATE_CART_ITEM,
      variables: { input },
    };
    const response = await client.mutate(options);
    return response.data?.updateCartItem as CartItem;
  }

  async removeCartItem(idCartItem: number) {
    const options: MutationOptions<
      RemoveCartItemMutation,
      RemoveCartItemMutationVariables
    > = {
      mutation: REMOVE_CART_ITEM,
      variables: { idCartItem },
    };
    const response = await client.mutate(options);
    return response.data?.removeCartItem as boolean;
  }
}

export const cartItemService = new CartItemService();
