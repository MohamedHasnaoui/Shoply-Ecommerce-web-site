import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { MyContext } from "./graphql/index.js";
import { typeDefs, resolvers } from "./graphql/index.js";

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
