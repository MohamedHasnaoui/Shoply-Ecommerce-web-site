import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { book1_schema } from "./schemas/book1.graphql.js";
import { book_schema } from "./schemas/book.graphql.js";
import { Book1Resolvers } from "./resolvers/book1.resolver.js";

export interface MyContext {
  dataSources: {};
}

const typeDefsArray = [book1_schema, book_schema];
const resolversArray = [Book1Resolvers];
export const typeDefs = mergeTypeDefs(typeDefsArray);
export const resolvers = mergeResolvers(resolversArray);
