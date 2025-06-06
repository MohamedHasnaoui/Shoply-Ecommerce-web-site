import { client } from "../../graphqlProvider";
import {
  CREATE_PAYMENT_INTENT,
  VERIFY_PAYMENT,
} from "../../graphql/payment.graphql";
import {
  CreatPaymentIntentMutation,
  VerifyPaymentMutation,
  VerifyPaymentMutationVariables,
} from "../../generated";

export class PaymentService {
  async createPaymentIntent() {
    const response = await client.mutate<CreatPaymentIntentMutation>({
      mutation: CREATE_PAYMENT_INTENT,
    });

    return response.data?.creatPaymentIntent;
  }
  async verifyPayment(sessionId: string) {
    const response = await client.mutate<
      VerifyPaymentMutation,
      VerifyPaymentMutationVariables
    >({
      mutation: VERIFY_PAYMENT,
      variables: { sessionId },
    });

    return response.data?.verifyPayment;
  }
}

export const paymentService = new PaymentService();
