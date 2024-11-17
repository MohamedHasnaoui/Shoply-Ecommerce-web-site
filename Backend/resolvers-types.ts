import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./**/*.graphql",
  generates: {
    "src/__generated__/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../context#MyContext",
      },
    },
  },
};

export default config;
