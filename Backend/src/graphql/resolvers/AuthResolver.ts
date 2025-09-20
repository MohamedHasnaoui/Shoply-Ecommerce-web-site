import { Resolvers } from "../types/resolvers-types.js";
import { GraphQLDateTime } from "graphql-scalars";
import { authController } from "../../controllers/AuthController.js";

export const AuthResolver: Resolvers = {
  DateTime: GraphQLDateTime,
  Mutation: {
    signup: authController.signup.bind(authController),

    signin: authController.signin.bind(authController),

    verifyEmail: authController.verifyEmail.bind(authController),

    addResetPasswordRequest: authController.addResetPasswordRequest.bind(authController),
    
    resetPassword: authController.resetPassword.bind(authController),

    updateUser: authController.updateUser.bind(authController),

    VerificationEmailRequest: authController.verificationEmailRequest.bind(authController)
  },
  Query: {
    currentUser: authController.getAuthenticatedUser.bind(authController),

    getUserById: authController.getUserById.bind(authController),

  },
};
