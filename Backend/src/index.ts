import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";
import { Resolvers } from "./__generated__/resolvers-types";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const typeDefsArray = loadFilesSync(
  path.join(__dirname, "../../graphql/**/*.graphql")
);

const typeDefs = mergeTypeDefs(typeDefsArray);
console.log(path.join(__dirname, "../graphql/**/*.graphql"));
export interface MyContext {
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
    books1: (parent, {}, context) => books,
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
