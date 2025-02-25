import { GraphQLError } from "graphql";
import { whishListService } from "../../services/WhishListService.js";
import { Resolvers, Role } from "../types/resolvers-types.js";
import { userService } from "../../services/userService.js";

export const WhishListResolver: Resolvers = {
  Query: {
    getWishList: async (parent, args, context) => {
      if (!context.currentUser || !context.currentUser.userId) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      const user = await userService.findOneById(context.currentUser.userId);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      if (user.role !== Role.Buyer) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      const wishList = await whishListService.getWishListByBuyerId(
        context.currentUser.userId
      );
      if (!wishList) {
        throw new GraphQLError("ShoppingCart not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      return wishList;
    },
  },
  Mutation: {
    addProductToWishList: async (parent, { productId }, context) => {
      try {
        if (!context.currentUser || !context.currentUser.userId) {
          throw new GraphQLError("UNAUTHORIZED", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }

        const user = await userService.findOneById(context.currentUser.userId);
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        if (user.role !== Role.Buyer) {
          throw new GraphQLError("UNAUTHORIZED", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }
        return await whishListService.addProductToWishList(
          context.currentUser.userId,
          productId
        );
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: { code: "ERROR" },
        });
      }
    },
    deleteProductFromWishList: async (parent, { productId }, context) => {
      try {
        if (!context.currentUser || !context.currentUser.userId) {
          throw new GraphQLError("UNAUTHORIZED", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }

        const user = await userService.findOneById(context.currentUser.userId);
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        if (user.role !== Role.Buyer) {
          throw new GraphQLError("UNAUTHORIZED", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }
        return await whishListService.deleteProductFromWishList(
          context.currentUser.userId,
          productId
        );
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: { code: "ERROR" },
        });
      }
    },
  },
};
