import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { authSchema } from "./schemas/auth/auth.graphql.js";
import { orderSchema } from "./schemas/order/order.graphql.js";
import { JwtPayload } from "./types/resolvers-types.js";
import { AuthResolver } from "./resolvers/AuthResolver.js";
import { CategoryResolver } from "./resolvers/CategoryResolver.js";
import { ProductResolver } from "./resolvers/ProductResolver.js";
import { productSchema } from "./schemas/product/product.graphql.js";
import { categorySchema } from "./schemas/category/category.graphql.js";
import { orderItemSchema } from "./schemas/orderItem/orderItem.graphql.js";
import { reviewSchema } from "./schemas/review/review.graphql.js";
import { cartItemSchema } from "./schemas/cartItem/cartItem.graphql.js";
import { shoppingCartSchema } from "./schemas/shoppingCart/shoppingCart.graphql.js";
import { ShoppingCartResolver } from "./resolvers/ShoppingCartResolver.js";
import { PaymentResolver } from "./resolvers/PaymentResolver.js";
import { CartItemResolver } from "./resolvers/CartItemResolver.js";
import { paymentSchema } from "./schemas/payment/payment.graphql.js";
import { wishListSchema } from "./schemas/wishList/wishList.graphql.js";
import { WhishListResolver } from "./resolvers/WishListResolver.js";
import { OrderItemReolver } from "./resolvers/OrderItemResolver.js";
import { OrderResolver } from "./resolvers/OrderResolver.js";
import { ReviewResolver } from "./resolvers/ReviewResolver.js";
import { uploadCloudSchema } from "./schemas/upload/uploadCloud.graphql.js";
import { UploadCloudResolver } from "./resolvers/UploadCloudResolver.js";
import { buyerSchema } from "./schemas/seller/seller.graphql.js";
import { SellerResolver } from "./resolvers/SellerResolver.js";
export interface MyContext {
  currentUser?: JwtPayload;
  idShoppingCart: number;
}

const typeDefsArray = [
  authSchema,
  productSchema,
  categorySchema,
  orderItemSchema,
  orderSchema,
  cartItemSchema,
  shoppingCartSchema,
  paymentSchema,
  wishListSchema,
  reviewSchema,
  uploadCloudSchema,
  buyerSchema,
];
const resolversArray = [
  AuthResolver,
  CategoryResolver,
  ProductResolver,
  ShoppingCartResolver,
  CartItemResolver,
  PaymentResolver,
  WhishListResolver,
  OrderResolver,
  OrderItemReolver,
  ReviewResolver,
  UploadCloudResolver,
  SellerResolver,
];
export const typeDefs = mergeTypeDefs(typeDefsArray);
export const resolvers = mergeResolvers(resolversArray);
