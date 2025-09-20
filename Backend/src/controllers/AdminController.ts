import { GraphQLError } from "graphql";
import { MyContext } from "../graphql"; // Make sure this path is correct
import {
  QueryGetRegisteredUsersByPeriodArgs,
  QueryGetUsersArgs,
  Role,
  MutationUpdateUserBlockStatusArgs,
  MutationUpdateProductDisableStatusArgs,
  QueryGetAdminHomeStatisticsArgs,
  QueryGetBestSellersArgs,
  QueryGetFrequentBuyersArgs
} from "../graphql/types/resolvers-types.js";
import { ErrorCode } from "../../utils/Errors.js";
import { userService } from "../services/userService.js";
import { productService } from "../services/productServices.js";
import { orderService } from "../services/OrderService.js";
import { User } from "../entities";

export class AdminController {
  /**
   * A private helper method to ensure the current user is a logged-in Admin.
   * This reduces code duplication across all admin-only methods.
   */
  private async _ensureAdmin(context: MyContext): Promise<User> {
    if (!context.currentUser?.userId) {
      throw new GraphQLError("Not authenticated", {
        extensions: { code: ErrorCode.UNAUTHENTICATED },
      });
    }
    const user = await userService.findOneById(context.currentUser.userId);
    if (!user) {
        // This case is important in case the user was deleted but the token is still valid
        throw new GraphQLError("Authenticated user not found", {
            extensions: { code: ErrorCode.NOT_FOUND },
        });
    }
    if (user.role !== Role.Admin) {
      throw new GraphQLError("Only Admins Can Access", {
        extensions: { code: ErrorCode.NOT_AUTHORIZED },
      });
    }
    return user;
  }

  // --- QUERIES ---

  async getAdminHomeStatistics(parent: {}, args: QueryGetAdminHomeStatisticsArgs, context: MyContext) {
    await this._ensureAdmin(context); // Single line for auth!
    
    const { registeredSeller, registeredBuyers } = await userService.countNewBuyersAndSellers(args.period);
    const newProducts = await productService.countNewProducts(args.period);
    const newOrders = await orderService.countNewOrders(args.period);

    return { registeredSeller, registeredBuyers, newOrders, newProducts };
  }

  async getRegisteredUsersByPeriod(parent: {}, args: QueryGetRegisteredUsersByPeriodArgs, context: MyContext) {
    await this._ensureAdmin(context);
    return await userService.getRegisteredUsersByPeriod(args.period, args.role);
  }

  async getBestSellers(parent: {}, args: QueryGetBestSellersArgs, context: MyContext) {
    await this._ensureAdmin(context);
    return await userService.getBestSellers(args.period);
  }

  async getFrequentBuyers(parent: {}, args: QueryGetFrequentBuyersArgs, context: MyContext) {
    await this._ensureAdmin(context);
    return await userService.getFrequentBuyers(args.period);
  }

  // This resolver does not require admin access, so we don't call the helper
  async getUsers(parent: {}, args: QueryGetUsersArgs, context: MyContext) {
    return await userService.getUsers(args.input);
  }

  // --- MUTATIONS ---

  async updateUserBlockStatus(parent: {}, args: MutationUpdateUserBlockStatusArgs, context: MyContext) {
    await this._ensureAdmin(context);
    return await userService.updateUserBlockStatus(args.userId, args.isBlocked);
  }

  async updateProductDisableStatus(parent: {}, args: MutationUpdateProductDisableStatusArgs, context: MyContext) {
    await this._ensureAdmin(context);
    return await productService.updateProductDisableStatus(args.productId, args.isDisabled);
  }
}

// Export a singleton instance of the controller
export const adminController = new AdminController();