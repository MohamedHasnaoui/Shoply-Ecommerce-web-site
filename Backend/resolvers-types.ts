import type { CodegenConfig } from "@graphql-codegen/cli";
const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/graphql/schemas/**/*.graphql.ts",
  generates: {
    "src/graphql/types/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../index#MyContext",
      },
    },
  },
};

export default config;
