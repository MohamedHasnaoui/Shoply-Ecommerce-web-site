import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { MyContext } from "./graphql/index.js";
import { typeDefs, resolvers } from "./graphql/index.js";
import { appDataSource } from "./database/data-source.js";

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});
await appDataSource.initialize();
const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => {
    return { dataSources: {} };
  },
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
