import { cloudinaryUtil } from "../../../utils/cloudinary/CloudinaryUtil.js";
import { Resolvers } from "../types/resolvers-types";

export const UploadCloudResolver: Resolvers = {
  Query: {
    getParamUploadImage: (parent, { folder }, context) => {
      return cloudinaryUtil.getSignature(folder);
    },
  },
};
