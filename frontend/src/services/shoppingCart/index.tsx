import { client } from "../../graphqlProvider";
import {
  GET_SHOPPING_CART,
  CANCEL_SHOPPING_CART,
} from "../../graphql/shoppingCart.graphql";
import {
  GetShoppingCartQuery,
  CancelShoppingCartMutation,
} from "../../generated";

export class ShoppingCartService {
  async getShoppingCart() {
    const response = await client.query<GetShoppingCartQuery>({
      query: GET_SHOPPING_CART,
      fetchPolicy: "no-cache",
    });

    return response.data.getShoppingCart;
  }

  async cancelShoppingCart() {
    const response = await client.mutate<CancelShoppingCartMutation>({
      mutation: CANCEL_SHOPPING_CART,
    });

    return response.data?.cancelShoppingCart;
  }
}

export const shoppingCartService = new ShoppingCartService();
