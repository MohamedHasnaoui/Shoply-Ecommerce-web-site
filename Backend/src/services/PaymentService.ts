import { Repository } from "typeorm";
import { User, Buyer, Payment, Product } from "../entities/index.js";
import { userService } from "./userService.js";
import { appDataSource } from "../database/data-source.js";
import { stripe } from "../../utils/Stripe.js";
import { GraphQLError } from "graphql";
import { shoppingCartService } from "./ShoppingCartService.js";
import { PaymentType } from "../graphql/types/resolvers-types.js";
export class PaymentService {
  constructor(
    private paymentRepository: Repository<Payment>,
    private buyerRepository: Repository<User>
  ) {}
  async findOneById(paymentId: number) {
    return await this.paymentRepository.findOneBy({ id: paymentId });
  }

  // async createCustomerStripeId(buyer: Buyer) {
  //   // const payment = this.paymentRepository.create({buyer:user,firstName});
  //   // return await this.paymentRepository.save(payment);

  //   try {
  //     console.log("Buyer in PaymentService", buyer);

  //     if (!buyer) {
  //       throw new GraphQLError("Failed to create buyer stripe id", {
  //         extensions: { code: "INTERNAL_SERVER_ERROR" },
  //       });
  //     }
  //     if (buyer && buyer.stripeCustomerId) {
  //       return buyer.stripeCustomerId;
  //     }
  //     const customer = await stripe.customers.create({
  //       email: buyer.email,
  //       name: buyer.firstName + " " + buyer.lastName,
  //     });

  //     buyer.stripeCustomerId = customer.id;
  //     await this.buyerRepository.save(buyer);
  //     return customer.id;
  //   } catch (error) {
  //     console.log("At CreateCustomerStripeId", error);
  //     throw new GraphQLError("Failed to create buyer stripe id", {
  //       extensions: { error, code: "INTERNAL_SERVER_ERROR" },
  //     });
  //   }
  // }
  async createPaymentIntent(buyerId: number) {
    const buyer = await userService.findOneById(buyerId);
    if (!buyer) {
      throw new GraphQLError("Buyer not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }
    // try {
    //   const buyer = await this.buyerRepository.findOne({ where: { email } });

    //   if (!buyer || !buyer.stripeCustomerId) {
    //     throw new GraphQLError(
    //       "Buyer not found or stripe customer id not found",
    //       {}
    //     );
    //   }

    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: 500,
    //     currency: "mad",
    //     customer: buyer.stripeCustomerId,
    //     payment_method_types: ["card"],
    //   });
    //   console.log("PaymentIntent", paymentIntent);
    //   return paymentIntent.client_secret;
    // } catch (error) {
    //   console.log("At CreatePaymentIntent PaymentService", error);
    //   throw new GraphQLError("Failed to create payment intent", error);
    // }
    try {
      const shoppingCart = await shoppingCartService.getShoppingCartByBuyerId(
        buyerId
      );
      if (!shoppingCart) {
        throw new GraphQLError("Shopping Cart is Empty", {
          extensions: { code: "EMPTY_CART" },
        });
      }
      let totalAmount = 0;
      const productsLine = shoppingCart.cartItems.map((cartItem) => {
        totalAmount += cartItem.price;
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: cartItem.product.name,
              images: [cartItem.product.images[0]],
            },
            unit_amount: cartItem.product.price * 100, // Stripe expects the amount in cents
          },
          quantity: cartItem.quantity,
        };
      });
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: productsLine,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_CART_URL}`,
        customer_email: buyer.email,

        metadata: {
          buyerId,
        },
      });

      return { sessionUrl: session.url, sessionId: session.id };
    } catch (error) {
      console.log("At CreatePaymentIntent PaymentService", error);
      throw new GraphQLError("Failed to create payment intent", error);
    }
  }
  async verifyPayment(sessionId: string) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["payment_intent", "line_items"],
      });

      return {
        status: session.payment_status,
        isSuccess: session.payment_status === "paid",
        sessionId: session.id,
        amount: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_email,
        created: session.created,
      };
    } catch (error) {
      console.error("Erreur lors de la vérification du paiement:", error);
      throw new GraphQLError("Failed to verify payment", {
        extensions: { code: "PAYMENT_VERIFICATION_ERROR" },
      });
    }
  }
}

export const paymentService = new PaymentService(
  appDataSource.getRepository(Payment),
  appDataSource.getRepository(Buyer)
);
