import { Resolvers } from "../types/resolvers-types.js";

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
export const Book1Resolvers: Resolvers = {
  Query: {
    books1: (parent, {}, context) => books,
  },
};
