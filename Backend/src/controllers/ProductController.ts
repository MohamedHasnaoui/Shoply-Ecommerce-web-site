import { GraphQLError } from "graphql";
import { MyContext } from "../graphql"; // Make sure this path is correct
import {
  MutationCreateProductArgs,
  MutationUpdateProductArgs,
  MutationRemoveProductArgs,
  MutationIncrementQuantityArgs,
  QueryGetAllProductsArgs,
  QueryGetProductArgs,
  QueryGetAllMyProductsArgs,
  QueryGetSellerTopProductsArgs,
  QueryGetTopSellingProductsArgs,
  Role,
} from "../graphql/types/resolvers-types.js";
import { ErrorCode } from "../../utils/Errors.js";
import { userService } from "../services/userService.js";
import { productService } from "../services/productServices.js";
import { categoryService } from "../services/categoryServices.js";
import { Product, Seller } from "../entities";

export class ProductController {
  /**
   * Private helper to ensure the current user is a logged-in Seller.
   * Returns the seller object on success.
   */
  private async _ensureSeller(context: MyContext): Promise<Seller> {
    if (!context.currentUser?.userId) {
      throw new GraphQLError("Not Authenticated", { extensions: { code: ErrorCode.UNAUTHENTICATED } });
    }
    const user = await userService.findOneById(context.currentUser.userId);
    if (!user) {
      throw new GraphQLError("Authenticated user not found", { extensions: { code: ErrorCode.NOT_FOUND } });
    }
    if (user.role !== Role.Seller) {
      throw new GraphQLError("Only sellers can perform this action", { extensions: { code: ErrorCode.NOT_AUTHORIZED } });
    }
    return user as Seller;
  }

  /**
   * Private helper to ensure the user owns the product they are trying to modify.
   * Returns the product object on success to avoid a second DB call.
   */
  private async _ensureProductOwner(productId: number, context: MyContext): Promise<Product> {
    if (!context.currentUser?.userId) {
      throw new GraphQLError("Not Authenticated", { extensions: { code: ErrorCode.UNAUTHENTICATED } });
    }
    const product = await productService.findById(productId);
    if (!product) {
      throw new GraphQLError("Product Not Found", { extensions: { code: ErrorCode.NOT_FOUND } });
    }
    if (product.owner.id !== context.currentUser.userId) {
      throw new GraphQLError("You are not authorized to modify this product", { extensions: { code: ErrorCode.NOT_AUTHORIZED } });
    }
    return product;
  }

  // --- MUTATIONS ---

  async createProduct(parent: {}, args: MutationCreateProductArgs, context: MyContext) {
    const seller = await this._ensureSeller(context);
    return await productService.create(args.input, seller);
  }

  async updateProduct(parent: {}, args: MutationUpdateProductArgs, context: MyContext) {
    const product = await this._ensureProductOwner(args.input.id, context);

    // Update fields using nullish coalescing (??) to safely handle falsy values like 0 or ""
    product.name = args.input.name ?? product.name;
    product.reference = args.input.reference ?? product.reference;
    product.description = args.input.description ?? product.description;
    product.images = args.input.images ?? product.images;
    product.rating = args.input.rating ?? product.rating;
    product.quantity = args.input.quantity ?? product.quantity;
    product.price = args.input.price ?? product.price;

    if (args.input.categoryId) {
      const category = await categoryService.findById(args.input.categoryId);
      if (category) product.category = category;
    }
    return await productService.update(product);
  }

  async removeProduct(parent: {}, args: MutationRemoveProductArgs, context: MyContext) {
    const product = await this._ensureProductOwner(args.productId, context);
    return await productService.remove(product);
  }

  async incrementQuantity(parent: {}, args: MutationIncrementQuantityArgs, context: MyContext) {
    await this._ensureProductOwner(args.productId, context); // Just for the auth check
    return await productService.incrementQuantity(args.productId, args.addedQte);
  }

  // --- QUERIES ---

  async getAllProducts(parent: {}, args: QueryGetAllProductsArgs, context: MyContext) {
    return await productService.getAll({ ...args.input });
  }

  async getProduct(parent: {}, args: QueryGetProductArgs, context: MyContext) {
    const product = await productService.findById(args.id);
    if (!product) {
      throw new GraphQLError("Product Not Found", { extensions: { code: ErrorCode.NOT_FOUND } });
    }
    return product;
  }

  async getAllMyProducts(parent: {}, args: QueryGetAllMyProductsArgs, context: MyContext) {
    const seller = await this._ensureSeller(context);
    return await productService.getAllBySellerId(seller.id, { ...args.input });
  }

  async getMyProductsStatistics(parent: {}, args: {}, context: MyContext) {
    const seller = await this._ensureSeller(context);
    // Run queries in parallel for better performance
    const [countAvailable, countOutOfStock] = await Promise.all([
      productService.countAvailable(seller.id),
      productService.countOutOfStock(seller.id),
    ]);
    return { countAvailable, countOutOfStock };
  }

  async getSellerTopProducts(parent: {}, args: QueryGetSellerTopProductsArgs, context: MyContext) {
    const seller = await this._ensureSeller(context);
    return await productService.getTopSellingProductsBySellerId(seller.id, args.nbProduct);
  }

  async getTopSellingProducts(parent: {}, args: QueryGetTopSellingProductsArgs, context: MyContext) {
    return await productService.getTopSellingProducts(args.input);
  }
}

// Export a singleton instance
export const productController = new ProductController();