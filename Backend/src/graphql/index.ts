import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { authSchema } from "./schemas/auth/auth.graphql.js";
import { orderSchema } from "./schemas/order/order.graphql.js";
import { JwtPayload } from "./types/resolvers-types.js";
import { AuthResolver } from "./resolvers/AuthResolver.js";

export interface MyContext {
  currentUser: JwtPayload;
}

const typeDefsArray = [authSchema, orderSchema];
const resolversArray = [AuthResolver];
export const typeDefs = mergeTypeDefs(typeDefsArray);
export const resolvers = mergeResolvers(resolversArray);
