import { GraphQLError } from "graphql";
import { whishListService } from "../../services/WhishListService.js";
import { Resolvers, Role } from "../types/resolvers-types.js";
import { userService } from "../../services/userService.js";
import { ErrorCode } from "../../../utils/Errors.js";

export const WhishListResolver: Resolvers = {
  Query: {
    getWishList: async (parent, args, context) => {
      if (!context.currentUser || !context.currentUser.userId) {
        throw new GraphQLError("You should be logged in", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }

      const user = await userService.findOneById(context.currentUser.userId);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: ErrorCode.NOT_FOUND },
        });
      }

      if (user.role !== Role.Buyer) {
        throw new GraphQLError("You should be a buyer", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }

      const wishList = await whishListService.getWishListByBuyerId(
        context.currentUser.userId
      );
      if (!wishList) {
        console.log("X-----------WishList not found-----------X");
        throw new GraphQLError("Server Error", {
          extensions: { code: ErrorCode.CART_NOT_FOUND },
        });
      }

      return wishList;
    },
    getFilteredWishList: async (parent, { input }, context) => {
      if (!context.currentUser || !context.currentUser.userId) {
        throw new GraphQLError("You should be logged in", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }

      const user = await userService.findOneById(context.currentUser.userId);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: ErrorCode.NOT_FOUND },
        });
      }

      if (user.role !== Role.Buyer) {
        throw new GraphQLError("You should be a buyer", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }

      try {
        const filteredProducts =
          await whishListService.getFilteredWishlistProducts(
            context.currentUser.userId,
            input
          );
        return filteredProducts;
      } catch (error) {
        console.log(
          "X--------------Error fetching filtered wish list---------------X"
        );
        throw new GraphQLError("Server Error", {
          extensions: { code: ErrorCode.INTERNAL_SERVER_ERROR },
        });
      }
    },
  },
  Mutation: {
    addProductToWishList: async (parent, { productId }, context) => {
      try {
        if (!context.currentUser || !context.currentUser.userId) {
          throw new GraphQLError("You should be logged in", {
            extensions: { code: ErrorCode.UNAUTHENTICATED },
          });
        }

        const user = await userService.findOneById(context.currentUser.userId);
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: { code: ErrorCode.NOT_FOUND },
          });
        }

        if (user.role !== Role.Buyer) {
          throw new GraphQLError("You shoul be a buyer", {
            extensions: { code: ErrorCode.NOT_AUTHORIZED },
          });
        }
        return await whishListService.addProductToWishList(
          context.currentUser.userId,
          productId
        );
      } catch (error) {
        console.log(
          "X-----------Error adding product to wish list-----------X"
        );
        throw new GraphQLError(error, {
          extensions: { code: ErrorCode.INTERNAL_SERVER_ERROR },
        });
      }
    },
    deleteProductFromWishList: async (parent, { productId }, context) => {
      try {
        if (!context.currentUser || !context.currentUser.userId) {
          throw new GraphQLError("You should be logged in", {
            extensions: { code: ErrorCode.UNAUTHENTICATED },
          });
        }

        const user = await userService.findOneById(context.currentUser.userId);
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: { code: ErrorCode.NOT_FOUND },
          });
        }

        if (user.role !== Role.Buyer) {
          throw new GraphQLError("You should be logged in", {
            extensions: { code: ErrorCode.NOT_AUTHORIZED },
          });
        }
        return await whishListService.deleteProductFromWishList(
          context.currentUser.userId,
          productId
        );
      } catch (error) {
        console.log(
          "X-----------Error deleting product from wish list-----------X"
        );
        throw new GraphQLError(error, {
          extensions: { code: ErrorCode.INTERNAL_SERVER_ERROR },
        });
      }
    },
  },
};
