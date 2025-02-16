import { MutationOptions, QueryOptions } from "@apollo/client";
import {
  CurrentUserQuery,
  SignInInput,
  SigninMutation,
  SigninMutationVariables,
  SignupIpnut,
  SignupMutation,
  SignupMutationVariables,
  VerificationEmailRequestMutation,
  VerificationEmailRequestMutationVariables,
  VerifyEmailMutation,
  VerifyEmailMutationVariables,
} from "../../generated";
import {
  GET_CURRENT_USER,
  SIGNIN_MUTATION,
  SIGNUP_MUTATION,
  VERIFY_EMAIL,
  VERIFY_EMAIL_REQUEST,
} from "../../graphql/auth.graphql";
import { client } from "../../graphqlProvider";

class AuthService {
  async login(input: SignInInput) {
    const options: MutationOptions<SigninMutation, SigninMutationVariables> = {
      mutation: SIGNIN_MUTATION,
      variables: { input },
    };
    const response = await client.mutate(options);
    return response;
  }
  async register(input: SignupIpnut) {
    const options: MutationOptions<SignupMutation, SignupMutationVariables> = {
      mutation: SIGNUP_MUTATION,
      variables: { input },
    };
    const response = await client.mutate(options);
    return response;
  }
  async getCurrentUser() {
    const options: QueryOptions<CurrentUserQuery> = {
      query: GET_CURRENT_USER,
    };
    const response = await client.query<CurrentUserQuery>(options);
    return response;
  }
  async verifyEmail(email: string, token: string) {
    const options: MutationOptions<
      VerifyEmailMutation,
      VerifyEmailMutationVariables
    > = {
      mutation: VERIFY_EMAIL,
      variables: { email, token },
    };
    const response = await client.mutate(options);
    return response;
  }
  async verifyEmailRequest(email: string) {
    const options: MutationOptions<
      VerificationEmailRequestMutation,
      VerificationEmailRequestMutationVariables
    > = {
      mutation: VERIFY_EMAIL_REQUEST,
      variables: { email },
    };
    const response = await client.mutate(options);
    return response;
  }
}
export const authService = new AuthService();
