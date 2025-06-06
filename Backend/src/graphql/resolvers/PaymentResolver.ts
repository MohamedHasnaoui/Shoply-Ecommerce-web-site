import { GraphQLError } from "graphql";
import { Resolvers, Role } from "../types/resolvers-types.js";
import { Buyer } from "../../entities/index.js";
import { userService } from "../../services/userService.js";
import { paymentService } from "../../services/PaymentService.js";
import { shoppingCartService } from "../../services/ShoppingCartService.js";
import { stripe } from "../../../utils/Stripe.js";
export const PaymentResolver: Resolvers = {
  Mutation: {
    // createCustomerStripeId: async (parent, {}, context) => {
    //   if (!context.currentUser) {
    //     throw new GraphQLError("UNAUTHORIZED NOT AUTH", {
    //       extensions: { code: "UNAUTHORIZED" },
    //     });
    //   }
    //   const user = await userService.findOneById(context.currentUser.userId);
    //   console.log("User in createCustomerStripeId", user);
    //   if (!user) {
    //     throw new GraphQLError("User not found", {
    //       extensions: { code: "NOT_FOUND" },
    //     });
    //   }
    //   if (user.role !== Role.Buyer) {
    //     throw new GraphQLError("UNAUTHORIZED", {
    //       extensions: { code: "NOT_BUYER" },
    //     });
    //   }
    //   return await paymentService.createCustomerStripeId(user as Buyer);
    // },
    creatPaymentIntent: async (parent, {}, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Buyer) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      return await paymentService.createPaymentIntent(user.id);

      // const shoppingCart = await shoppingCartService.getShoppingCartByBuyerId(
      //   user.id
      // );
      // if (shoppingCart.totalAmount >= 0) {
      //   return await paymentService.createPaymentIntent(
      //     user.email,
      //     shoppingCart.totalAmount
      //   );
      // } else {
      //   throw new GraphQLError("Shopping Cart is Empty", {
      //     extensions: { code: "EMPTY_CART" },
      //   });
      // }
    },
  },
  Query: {
    verifyPayment: async (parent, { sessionId }, context) => {
      try {
        const result = await paymentService.verifyPayment(sessionId);

        return result;
      } catch (err) {
        console.error("Erreur lors de la vérification du paiement :", err);
        throw new GraphQLError("Erreur de vérification du paiement");
      }
    },
  },
};
