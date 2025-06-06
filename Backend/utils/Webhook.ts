import { Request, Response } from "express";
import { appDataSource } from "../src/database/data-source.js";
import { shoppingCartService } from "../src/services/ShoppingCartService.js";
import { Payment, Product } from "../src/entities/index.js";
import { PaymentType } from "../src/graphql/types/resolvers-types.js";
import { stripe } from "./Stripe.js";
import { emailUtil } from "./EmailUtil.js";
import Stripe from "stripe";

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Signature invalide :", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("📩 Événement Stripe reçu :", event.type);

  // === CAS 1 : Paiement échoué avec Stripe Checkout (async)
  if (event.type === "checkout.session.async_payment_failed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;

    // await emailUtil.sendPaymentFailureEmail(
    //   email,
    //   "Échec de paiement",
    //   `Votre paiement a échoué. Merci de réessayer.`
    // );
    console.log("📨 Email échec envoyé (async_payment_failed).");
    return res.status(200).send("Async payment failure handled.");
  }

  // === CAS 2 : Paiement échoué avec Payment Intent (si pas de checkout)
  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const email = paymentIntent.metadata?.email;

    // await emailUtil.sendPaymentFailureEmail(
    //   email,
    //   "Échec de paiement",
    //   `Votre paiement n'a pas abouti.`
    // );
    console.log("📨 Email échec envoyé (payment_intent.payment_failed).");
    return res.status(200).send("Payment intent failure handled.");
  }

  // === CAS 3 : Paiement réussi
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const buyerId = session.metadata?.buyerId;

    if (!buyerId) {
      console.error("❌ buyerId manquant dans la session");
      return res.status(400).send("buyerId manquant");
    }

    try {
      const shoppingCart = await shoppingCartService.getShoppingCartByBuyerId(
        Number(buyerId)
      );

      if (!shoppingCart) {
        console.error("❌ Panier non trouvé");
        // await emailUtil.sendPaymentFailureEmail(
        //   session.customer_email,
        //   "Erreur Client",
        //   "Panier non trouvé"
        // );
        return res.status(404).send("Panier introuvable");
      }

      const productRepo = appDataSource.getRepository(Product);
      for (const item of shoppingCart.cartItems) {
        const product = await productRepo.findOneBy({ id: item.product.id });

        if (!product || product.quantity < item.quantity) {
          console.error(
            `❌ Stock insuffisant pour le produit ${item.product.id}`
          );
          //   await emailUtil.sendPaymentFailureEmail(
          //     session.customer_email,
          //     "Erreur de stock",
          //     `Stock insuffisant pour le produit ${item.product.id}`
          //   );
          return res.status(400).send("Stock insuffisant");
        }

        product.quantity -= item.quantity;
        await productRepo.save(product);
      }

      const paymentRepo = appDataSource.getRepository(Payment);
      const payment = paymentRepo.create({
        paymentDate: new Date(),
        paymentType: PaymentType.Visa,
      });
      await paymentRepo.save(payment);

      // Email succès
      //   await emailUtil.sendPaymentSuccessEmail(
      //     session.customer_email,
      //     session.amount_total ? session.amount_total / 100 : 0
      //   );

      await shoppingCartService.cancelShoppingCart(Number(buyerId));
      console.log("✅ Paiement traité avec succès pour le buyerId :", buyerId);
    } catch (error) {
      console.error("❌ Erreur traitement webhook :", error);
      //   await emailUtil.sendPaymentFailureEmail(
      //     session.customer_email,
      //     "Erreur Serveur",
      //     "Une erreur s’est produite pendant le traitement du paiement."
      //   );
      return res.status(500).send("Erreur serveur");
    }
  }

  return res.status(200).json({ received: true });
};
