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
import { CartItemResolver } from "./resolvers/CartItemResolver.js";
import { OrderItemReolver } from "./resolvers/OrderItemResolver.js";
import { OrderResolver } from "./resolvers/OrderResolver.js";
import { ReviewResolver } from "./resolvers/ReviewResolver.js";
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
  reviewSchema,
];
const resolversArray = [
  AuthResolver,
  CategoryResolver,
  ProductResolver,
  ShoppingCartResolver,
  CartItemResolver,
  OrderResolver,
  OrderItemReolver,
  ReviewResolver,
];
export const typeDefs = mergeTypeDefs(typeDefsArray);
export const resolvers = mergeResolvers(resolversArray);
