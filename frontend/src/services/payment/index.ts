import { client } from "../../graphqlProvider";
import {
  CREATE_PAYMENT_INTENT,
  VERIFY_PAYMENT,
} from "../../graphql/payment.graphql";
import {
  CreatPaymentIntentMutation,
  VerifyPaymentQuery,
  VerifyPaymentQueryVariables,
} from "../../generated";

export class PaymentService {
  async createPaymentIntent() {
    const response = await client.mutate<CreatPaymentIntentMutation>({
      mutation: CREATE_PAYMENT_INTENT,
    });

    return response.data?.creatPaymentIntent;
  }
  async verifyPayment(sessionId: string) {
    const response = await client.query<
      VerifyPaymentQuery,
      VerifyPaymentQueryVariables
    >({
      query: VERIFY_PAYMENT,
      variables: { sessionId },
      fetchPolicy: "no-cache",
    });

    return response.data?.verifyPayment;
  }
}

export const paymentService = new PaymentService();
