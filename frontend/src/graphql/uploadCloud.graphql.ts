import { gql } from "@apollo/client";

export const GET_UPLOAD_PARAMS = gql`
  query GetParamUploadImage($folder: String!) {
    getParamUploadImage(folder: $folder) {
      signature
      timestamp
      cloudName
      apiKey
    }
  }
`;
