import { client } from "../../graphqlProvider";
import { GET_SHOPPING_CART } from "../../graphql/shoppingCart.graphql";
import { GetShoppingCartQuery } from "../../generated"; // ⚠️ généré par codegen

export class ShoppingCartService {
  async getShoppingCart() {
    const response = await client.query<GetShoppingCartQuery>({
      query: GET_SHOPPING_CART,
      fetchPolicy: "no-cache", // si tu veux éviter le cache Apollo
    });

    return response.data.getShoppingCart;
  }
}

export const shoppingCartService = new ShoppingCartService();
