import { Resolvers } from "../types/resolvers-types";
import { uploadCloudController } from "../../controllers/UploadCloudController.js"; // Import the controller

export const UploadCloudResolver: Resolvers = {
  Query: {
    getParamUploadImage: uploadCloudController.getParamUploadImage.bind(uploadCloudController),
  },
};