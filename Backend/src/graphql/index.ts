import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { authSchema } from "./schemas/auth/auth.graphql.js";
import { orderSchema } from "./schemas/order/order.graphql.js";
import { JwtPayload, User } from "./types/resolvers-types.js";
import { AuthResolver } from "./resolvers/AuthResolver.js";
import { CategoryResolver } from "./resolvers/CategoryResolver.js";
import { ProductResolver } from "./resolvers/ProductResolver.js";
import { productSchema } from "./schemas/product/product.graphql.js";
export interface MyContext {
  currentUser: JwtPayload;
}

const typeDefsArray = [authSchema, orderSchema, productSchema];
const resolversArray = [AuthResolver, CategoryResolver, ProductResolver];
export const typeDefs = mergeTypeDefs(typeDefsArray);
export const resolvers = mergeResolvers(resolversArray);
