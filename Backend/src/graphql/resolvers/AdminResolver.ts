import { GraphQLError } from "graphql";
import { Resolvers, Role } from "../types/resolvers-types.js";
import { ErrorCode } from "../../../utils/Errors.js";
import { userService } from "../../services/userService.js";
import { productService } from "../../services/productServices.js";
import { orderService } from "../../services/OrderService.js";

export const AdminRsolver: Resolvers = {
  Query: {
    getAdminHomeStatistics: async (parent, { period }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Admin) {
        throw new GraphQLError("Only Admins Can Access", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      const { registeredSeller, registeredBuyers } =
        await userService.countNewBuyersAndSellers(period);
      const newProducts = await productService.countNewProducts(period);
      const newOrders = await orderService.countNewOrders(period);
      return {
        registeredSeller,
        registeredBuyers,
        newOrders,
        newProducts,
      };
    },
    getRegisteredUsersByPeriod: async (parent, { period, role }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Admin) {
        throw new GraphQLError("Only Admins Can Access", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      return await userService.getRegisteredUsersByPeriod(period, role);
    },
    getBestSellers: async (parent, { period }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Admin) {
        throw new GraphQLError("Only Admins Can Access", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      return await userService.getBestSellers(period);
    },
    getFrequentBuyers: async (parent, { period }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Admin) {
        throw new GraphQLError("Only Admins Can Access", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      return await userService.getFrequentBuyers(period);
    },
    getUsers: async (parent, { input }, context) => {
      return await userService.getUsers(input);
    },
  },
  Mutation: {
    updateUserBlockStatus: async (parent, { isBlocked, userId }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Admin) {
        throw new GraphQLError("Only Admins Can Access this service", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      return await userService.updateUserBlockStatus(userId, isBlocked);
    },
    updateProductDisableStatus: async (
      parent,
      { isDisabled, productId },
      context
    ) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Admin) {
        throw new GraphQLError("Only admins can access this service", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      return await productService.updateProductDisableStatus(
        productId,
        isDisabled
      );
    },
  },
};
