import * as dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { MyContext } from "./graphql/index.js";
import { typeDefs, resolvers } from "./graphql/index.js";
import { appDataSource } from "./database/data-source.js";
import { JwtPayload } from "./graphql/types/resolvers-types.js";
import jwt from "jsonwebtoken";
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});
const port = Number(process.env.SERVER_PORT) || 4000;
await appDataSource.initialize();
const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => {
    let payload: JwtPayload | null;
    let idShoppingCart: number | null = null;
    try {
      payload = jwt.verify(
        req.headers.authorization || "",
        process.env.JWT_KEY!
      ) as JwtPayload;
    } catch (err) {
      payload = null;
    }
    return { currentUser: payload, idShoppingCart };
  },
  listen: { port },
});

console.log(`🚀  Server ready at: ${url}`);
