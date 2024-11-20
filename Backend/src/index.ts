import * as dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { MyContext } from "./graphql/index.js";
import { typeDefs, resolvers } from "./graphql/index.js";
import { appDataSource } from "./database/data-source.js";

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});
const port = Number(process.env.SERVER_PORT) || 4000;
await appDataSource.initialize();
const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => {
    return { dataSources: {} };
  },
  listen: { port },
});

console.log(`🚀  Server ready at: ${url}`);
