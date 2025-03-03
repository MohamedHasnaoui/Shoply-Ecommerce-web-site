import { v2 as cloudinary } from "cloudinary";
import { myConfig } from "./config.js";
import { UploadCloud } from "../../src/graphql/types/resolvers-types.js";

export class CloudinaryUtil {
  getSignature = (folder: string): UploadCloud => {
    const apiSecret = myConfig.api_secret;
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        eager: "c_pad,h_300,w_400|c_crop,h_200,w_260",
        folder,
      },
      apiSecret
    );

    return {
      timestamp,
      signature,
      cloudName: myConfig.cloud_name,
      apiKey: myConfig.api_key,
    };
  };
}
export const cloudinaryUtil = new CloudinaryUtil();
