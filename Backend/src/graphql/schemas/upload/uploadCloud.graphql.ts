import gql from "graphql-tag";

export const uploadCloudSchema = gql`
  #graphql

  type UploadCloud {
    signature: String!
    timestamp: Int!
    cloudName: String!
    apiKey: String!
  }
  type Query {
    getParamUploadImage(folder: String!): UploadCloud!
  }
`;
