import { Resolvers } from "../types/resolvers-types.js";
import { productController } from "../../controllers/ProductController.js"; // Import the controller
import { productService } from "../../services/productServices.js"; // Import service for field resolver

export const ProductResolver: Resolvers = {
  // Field resolver for the 'Product' type
  Product: {
    totalOrders: async (parent) => {
      // 'parent' here is the product object itself
      return await productService.countTotalSales(parent.id);
    },
  },
  
  Mutation: {
    createProduct: productController.createProduct.bind(productController),
    updateProduct: productController.updateProduct.bind(productController),
    removeProduct: productController.removeProduct.bind(productController),
    incrementQuantity: productController.incrementQuantity.bind(productController),
  },

  Query: {
    getAllProducts: productController.getAllProducts.bind(productController),
    getProduct: productController.getProduct.bind(productController),
    getAllMyProducts: productController.getAllMyProducts.bind(productController),
    getMyProductsStatistics: productController.getMyProductsStatistics.bind(productController),
    getSellerTopProducts: productController.getSellerTopProducts.bind(productController),
    getTopSellingProducts: productController.getTopSellingProducts.bind(productController),
  },
};