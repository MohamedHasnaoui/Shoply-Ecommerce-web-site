import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MyContext } from "../graphql";
import { Role, SignInInput, SignupIpnut, TokenType, UpdateUserInput } from "../graphql/types/resolvers-types.js";
import { userService } from "../services/userService.js";
import { emailUtil } from "../../utils/EmailUtil.js";
import { shoppingCartService } from "../services/ShoppingCartService.js";
import { Buyer } from "../entities";
import { whishListService } from "../services/WhishListService.js";
import { ErrorCode } from "../../utils/Errors.js";
import { verificationTokenService } from "../services/VerificationTokenService.js";

export class AuthController {
    async signup (parent : {}, { input } : {input : SignupIpnut}, context : MyContext ) {
        const user = await userService.findOneByEmail(input.email);
        if (user) {
        if (!user.verified) {
            await userService.remove(user);
        } else {
            throw new GraphQLError("user already exist in the database", {
            extensions: { code: ErrorCode.BAD_USER_INPUT },
            });
        }
        }
        const newUser = await userService.create(input);
        await emailUtil.sendVerificationEmail(newUser.email);
        if (newUser.role === Role.Buyer) {
        const id = await shoppingCartService.create(newUser as Buyer);
        context.idShoppingCart = id;
        await whishListService.create(newUser as Buyer);
        }
        return true;
    }

    async signin (parent : {}, { input } : {input:SignInInput}, context : MyContext) {
          const user = await userService.findOneByEmail(input.email);
          if (!user) {
            throw new GraphQLError("Incorrect Credentiels", {
              extensions: { code: ErrorCode.BAD_USER_INPUT },
            });
          }
          const correctBwd = await bcrypt.compare(input.password, user.password);
          if (!correctBwd) {
            throw new GraphQLError("Incorrect Credentiels", {
              extensions: { code: ErrorCode.BAD_USER_INPUT },
            });
          }
          // if (!user.verified) {
          //   throw new GraphQLError("Email not verified", {
          //     extensions: { code: "EMAIL_NOT_VERIFIED" },
          //   });
          // }
          const jwtToken = jwt.sign(
            { email: input.email, userId: user.id },
            process.env.JWT_KEY!,
            { expiresIn: "7 days" }
          );
          // await whishListService.create(user as Buyer);
          console.log("jwtToken", jwtToken);
          return { user, jwt: jwtToken };
    }

    async verifyEmail (parent:{}, { email, token } : {email:string, token:string}, context:MyContext) {

        const user = await userService.findOneByEmail(email);
        if (!user) {
        throw new GraphQLError("Wrong Credentials", {
            extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
        }
        if (user.verified) {
        throw new GraphQLError("Already verified", {
            extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
        }
        const verificationToken = await verificationTokenService.findByUserId(
        user.id,
        TokenType.Email
        );
        if (verificationToken == null) {
        throw new GraphQLError("Token not found", {
            extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
        }
        if (verificationToken.expiresAt < new Date()) {
        throw new GraphQLError("Token is invalid or has expired.", {
            extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
        }
        if (verificationToken.token !== token) {
        throw new GraphQLError("Token not valid", {
            extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
        }
        user.verified = true;
        await userService.update(user);
        await verificationTokenService.deleteToken(verificationToken.id);
        return true;
    }

    async addResetPasswordRequest (parent:{}, { email } : {email:string}, context:MyContext) {
      const user = await userService.findOneByEmail(email);
      if (!user) {
        throw new GraphQLError("Wrong Credentials", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      await emailUtil.sendResetPasswordEmail(user);
      return true;
    }

    async resetPassword (parent:{}, { userId, token, password } : { userId : number, token:string, password:string }, context:MyContext) {
        const user = await userService.findOneById(userId);
        if (!user) {
        throw new GraphQLError("Wrong Credentials", {
            extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
        }
        const verificationToken = await verificationTokenService.findByUserId(
        user.id,
        TokenType.Password
        );
        if (verificationToken == null) {
        throw new GraphQLError("Token not found", {
            extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
        }
        if (verificationToken.expiresAt < new Date()) {
        throw new GraphQLError("Token is invalid or has expired.", {
            extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
        }
        if (verificationToken.token !== token) {
        throw new GraphQLError("Token not valid", {
            extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
        }
        user.password = await bcrypt.hash(password, 10);
        await userService.update(user);
        await verificationTokenService.deleteToken(verificationToken.id);
        return true;
    }

    async updateUser (parent : {}, { input } : {input:UpdateUserInput}, context : MyContext) {
        if (!context.currentUser) {
        throw new GraphQLError("not authorized", {
            extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
        }
        const user = await userService.findOneById(context.currentUser.userId);
        if (!user) {
        throw new GraphQLError("User not found", {
            extensions: { code: ErrorCode.NOT_FOUND },
        });
        }
        user.firstName = input.firstName || user.firstName;
        user.lastName = input.lastName || user.lastName;
        user.country = input.country || user.country;
        user.city = input.city || user.city;
        user.street = input.street || user.street;
        user.postalCode = input.postalCode || user.postalCode;
        user.phoneNumber = input.phoneNumber || user.phoneNumber;
        user.birthDay = input.birthDay || user.birthDay;
        user.profileImg = input.profileImg || user.profileImg;
        user.coverImg = input.coverImg || user.coverImg;
        user.gender = input.gender || user.gender;
        if (input.password) {
            user.password = await bcrypt.hash(input.password, 10);
        }

        return await userService.update(user);
    }

    async verificationEmailRequest (parent:{}, { email } : {email:string}, context:MyContext){
        await emailUtil.sendVerificationEmail(email);
        return true;
    }

    async getAuthenticatedUser (parent:{}, { }, context:MyContext){
        if (!context.currentUser?.userId) return null;
        return await userService.findOneById(context.currentUser.userId);
    }

    async getUserById (parent:{}, { id }:{id:number}, context:MyContext){
        return await userService.findOneById(id);
    }
    
}

export const authController = new AuthController();