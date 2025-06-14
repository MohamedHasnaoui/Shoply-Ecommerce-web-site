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
          buyerId: buyerId.toString(),
          totalAmount: totalAmount.toFixed(2), // Ex: "123.45"
          productImages: JSON.stringify(
            shoppingCart.cartItems.map((item) => item.product.images[0])
          ),
          productNames: JSON.stringify(
            shoppingCart.cartItems.map((item) => item.product.name)
          ),
          fullName: `${buyer.firstName} ${buyer.lastName}`,
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
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== "paid") {
        throw new GraphQLError("Paiement non validé", {
          extensions: { code: "PAYMENT_FAILED" },
        });
      }
      const buyerId = session.metadata?.buyerId;
      if (!buyerId) {
        throw new GraphQLError("Identifiant acheteur introuvable");
      }

      const shoppingCart = await shoppingCartService.getShoppingCartByBuyerId(
        Number(buyerId)
      );
      if (!shoppingCart) {
        throw new GraphQLError("Panier introuvable", {
          extensions: { code: "EMPTY_CART" },
        });
      }

      const productRepository = appDataSource.getRepository(Product);
      for (const cartItem of shoppingCart.cartItems) {
        const product = await productRepository.findOneBy({
          id: cartItem.product.id,
        });
        if (!product) continue;

        if (product.quantity < cartItem.quantity) {
          throw new GraphQLError(
            `Stock insuffisant pour le produit ${product.name}`,
            {
              extensions: { code: "INSUFFICIENT_STOCK" },
            }
          );
        }

        product.quantity -= cartItem.quantity;
        await productRepository.save(product);
      }
      await this.paymentRepository.save({
        paymentDate: new Date(),
        paymentType: PaymentType.Visa,
      });
      await shoppingCartService.cancelShoppingCart(Number(buyerId));
      return true;
    } catch (error) {
      console.error("Erreur lors de la vérification du paiement", error);
      throw new GraphQLError("Échec de la vérification du paiement", {
        extensions: { code: "PAYMENT_VERIFICATION_ERROR" },
      });
    }
  }
}

export const paymentService = new PaymentService(
  appDataSource.getRepository(Payment),
  appDataSource.getRepository(Buyer)
);
