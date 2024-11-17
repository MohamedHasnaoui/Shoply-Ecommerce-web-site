import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { Resolvers } from "./__generated__/resolvers-types";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

interface MyContext {
  dataSources: {};
}

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];
const resolvers: Resolvers = {
  Query: {
    books: (parent, {}, context) => books,
  },
};

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => {
    return { dataSources: {} };
  },
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
