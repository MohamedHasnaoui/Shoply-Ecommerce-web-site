import { MyContext } from "../graphql"; // Make sure this path is correct
import { QueryGetParamUploadImageArgs } from "../graphql/types/resolvers-types.js";
import { cloudinaryUtil } from "../../utils/cloudinary/CloudinaryUtil.js"; // Make sure this path is correct

export class UploadCloudController {
  
  // --- QUERIES ---

  getParamUploadImage(parent: {}, args: QueryGetParamUploadImageArgs, context: MyContext) {
    // This is a direct pass-through to the utility
    return cloudinaryUtil.getSignature(args.folder);
  }
}

// Export a singleton instance of the controller
export const uploadCloudController = new UploadCloudController();