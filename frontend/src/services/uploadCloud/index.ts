import {
  GetParamUploadImageQuery,
  GetParamUploadImageQueryVariables,
} from "../../generated";
import { QueryOptions } from "@apollo/client";
import { GET_UPLOAD_PARAMS } from "../../graphql/uploadCloud.graphql";
import { client } from "../../graphqlProvider";
import { FileWithPath } from "React-dropzone";
import axios from "axios";
import { UploadApiResponse } from "cloudinary";
export class UploadCloudService {
  async getParamUploadImage(folder: string) {
    const options: QueryOptions<
      GetParamUploadImageQueryVariables,
      GetParamUploadImageQuery
    > = {
      query: GET_UPLOAD_PARAMS,
      variables: { folder },
    };
    const response = await client.query(options);
    return response;
  }
  async uploadImages(files: readonly FileWithPath[], folder: string) {
    const result: string[] = [];
    const query = await this.getParamUploadImage(folder);
    const params = query.data.getParamUploadImage;
    const url =
      "https://api.cloudinary.com/v1_1/" + params.cloudName + "/auto/upload";
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", params.apiKey);
      formData.append("timestamp", params.timestamp.toString());
      formData.append("signature", params.signature);
      formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
      formData.append("folder", folder);
      const response = await axios.post<UploadApiResponse>(url, formData);
      const secureUrl = response.data.secure_url;
      result.push(secureUrl);
    }
    return result;
  }
}
export const uploadCloudService = new UploadCloudService();
