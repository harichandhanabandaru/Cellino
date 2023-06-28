import { readFileSync } from "fs";
import { createRequire } from "module";
import { resolvers } from "./resolver.js";

const require = createRequire(import.meta.url);

const typeDefs = readFileSync(require.resolve("./schema.graphql"), {
  encoding: "utf-8",
});

export default {
  typeDefs,
  resolvers,
};
