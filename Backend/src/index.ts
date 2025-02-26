import * as dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { startStandaloneServer } from "@apollo/server/standalone";
import { expressMiddleware } from "@apollo/server/express4";
import { MyContext } from "./graphql/index.js";
import { typeDefs, resolvers } from "./graphql/index.js";
import { appDataSource } from "./database/data-source.js";
import { JwtPayload } from "./graphql/types/resolvers-types.js";
import jwt from "jsonwebtoken";
import express from "express";
import http from "http";
import cors from "cors";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
const port = Number(process.env.SERVER_PORT) || 4000;
const host = process.env.BASE_URL;
await appDataSource.initialize();
await server.start();
app.use(
  "/",
  cors<cors.CorsRequest>({ origin: "*" }),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
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
  })
);
await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Server ready at http://${host}/`);
