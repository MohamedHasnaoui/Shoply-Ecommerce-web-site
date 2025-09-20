import { Resolvers } from "../types/resolvers-types.js";
import { adminController } from "../../controllers/AdminController.js"; // Import the controller

export const AdminRsolver: Resolvers = {
  Query: {
    getAdminHomeStatistics: adminController.getAdminHomeStatistics.bind(adminController),
    getRegisteredUsersByPeriod: adminController.getRegisteredUsersByPeriod.bind(adminController),
    getBestSellers: adminController.getBestSellers.bind(adminController),
    getFrequentBuyers: adminController.getFrequentBuyers.bind(adminController),
    getUsers: adminController.getUsers.bind(adminController),
  },
  Mutation: {
    updateUserBlockStatus: adminController.updateUserBlockStatus.bind(adminController),
    updateProductDisableStatus: adminController.updateProductDisableStatus.bind(adminController),
  },
};