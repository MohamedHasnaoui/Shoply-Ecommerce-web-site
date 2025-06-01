import { GraphQLError } from "graphql";
import { orderItemService } from "../../services/OrderItemService.js";
import { Resolvers, Role } from "../types/resolvers-types.js";
import { ErrorCode } from "../../../utils/Errors.js";
import { userService } from "../../services/userService.js";

export const SellerResolver: Resolvers = {
  Query: {
    getCustomerPastOrderItems: async (parent, { customerId }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHENTICATED", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Seller) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      return await orderItemService.findBySellerIdAndCustomerId(
        context.currentUser.userId,
        customerId
      );
    },
  },
};
