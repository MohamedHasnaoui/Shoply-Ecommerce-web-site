import { GraphQLError } from "graphql";
import { MyContext } from "../graphql"; // Make sure this path is correct
import {
  MutationVerifyPaymentArgs,
  Role,
} from "../graphql/types/resolvers-types.js";
import { ErrorCode } from "../../utils/Errors.js"; // Make sure this path is correct
import { userService } from "../services/userService.js";
import { paymentService } from "../services/PaymentService.js";
import { User } from "../entities"; // Make sure this path is correct

export class PaymentController {
  /**
   * Private helper to ensure the current user is a logged-in Buyer.
   * Returns the authenticated user object on success.
   */
  private async _ensureBuyer(context: MyContext): Promise<User> {
    if (!context.currentUser?.userId) {
      throw new GraphQLError("You should be logged in", {
        extensions: { code: ErrorCode.UNAUTHENTICATED },
      });
    }

    const user = await userService.findOneById(context.currentUser.userId);
    
    if (!user) {
      throw new GraphQLError("Authenticated user not found", {
        extensions: { code: ErrorCode.NOT_FOUND },
      });
    }

    if (user.role !== Role.Buyer) {
      throw new GraphQLError("You should be a buyer to perform this action", {
        extensions: { code: ErrorCode.NOT_AUTHORIZED },
      });
    }

    return user;
  }

  // --- MUTATIONS ---

  async creatPaymentIntent(parent: {}, args: {}, context: MyContext) {
    const user = await this._ensureBuyer(context);
    return await paymentService.createPaymentIntent(user.id);
  }

  async verifyPayment(parent: {}, args: MutationVerifyPaymentArgs, context: MyContext) {
    // This method doesn't require authentication in the original logic,
    // as it's likely used by a webhook or callback where the sessionId is the secret.
    return await paymentService.verifyPayment(args.sessionId);
  }
}

// Export a singleton instance of the controller
export const paymentController = new PaymentController();