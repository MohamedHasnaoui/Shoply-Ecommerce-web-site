import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { book1_schema } from "./schemas/book1.graphql.js";
import { book_schema } from "./schemas/book.graphql.js";
import { Book1Resolvers } from "./resolvers/book1.resolver.js";
import { authSchema } from "./schemas/auth/auth.graphql.js";
import { orderSchema } from "./schemas/order/order.graphql.js";

export interface MyContext {
  dataSources: {};
}

const typeDefsArray = [book1_schema, book_schema, authSchema, orderSchema];
const resolversArray = [Book1Resolvers];
export const typeDefs = mergeTypeDefs(typeDefsArray);
export const resolvers = mergeResolvers(resolversArray);
