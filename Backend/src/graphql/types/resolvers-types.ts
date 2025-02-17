import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  jwt: Scalars['String']['output'];
  user: User;
};

export type CartItem = {
  __typename?: 'CartItem';
  id: Scalars['Int']['output'];
  price: Scalars['Float']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
};

export type CartItemInput = {
  idProduct: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

export type CartItemUpdateInput = {
  id: Scalars['Int']['input'];
  idProduct: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

export type Category = {
  __typename?: 'Category';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type CategoryInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CategoryUpdatedInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProductInput = {
  categoryId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  images: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  quantity: Scalars['Int']['input'];
  reference: Scalars['String']['input'];
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type JwtPayload = {
  __typename?: 'JwtPayload';
  email: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProductToWishList: WishList;
  addResetPasswordRequest: Scalars['Boolean']['output'];
  cancelShoppingCart: Scalars['Boolean']['output'];
  creatCartItem: CartItem;
  creatPaymentIntent: PaymentSession;
  createCategory: Category;
  createOrder: Order;
  createProduct: Product;
  deleteProductFromWishList: Scalars['Boolean']['output'];
  removeCartItem: Scalars['Boolean']['output'];
  removeProduct: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  signin: AuthResponse;
  signup: Scalars['Boolean']['output'];
  updateCartItem: CartItem;
  updateCategory: Category;
  updateOrderItemStatus: OrderItem;
  updateProduct: Product;
  updateUser: User;
  verifyEmail: Scalars['Boolean']['output'];
  verifyPayment: Scalars['Boolean']['output'];
};


export type MutationAddProductToWishListArgs = {
  productId: Scalars['Int']['input'];
};


export type MutationAddResetPasswordRequestArgs = {
  email: Scalars['String']['input'];
};


export type MutationCreatCartItemArgs = {
  input: CartItemInput;
};


export type MutationCreateCategoryArgs = {
  input: CategoryInput;
};


export type MutationCreateOrderArgs = {
  paymentId: Scalars['Int']['input'];
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationDeleteProductFromWishListArgs = {
  productId: Scalars['Int']['input'];
};


export type MutationRemoveCartItemArgs = {
  idCartItem: Scalars['Int']['input'];
};


export type MutationRemoveProductArgs = {
  productId: Scalars['Int']['input'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationSigninArgs = {
  input: SignInInput;
};


export type MutationSignupArgs = {
  input: SignupIpnut;
};


export type MutationUpdateCartItemArgs = {
  input: CartItemUpdateInput;
};


export type MutationUpdateCategoryArgs = {
  input?: InputMaybe<CategoryUpdatedInput>;
};


export type MutationUpdateOrderItemStatusArgs = {
  orderItemId: Scalars['Int']['input'];
  status: OrderItemStatus;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationVerifyEmailArgs = {
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationVerifyPaymentArgs = {
  sessionId: Scalars['String']['input'];
};

export type Order = {
  __typename?: 'Order';
  buyer: User;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  orderItems: Array<Maybe<OrderItem>>;
  status: OrderStatus;
  totalAmount: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  price: Scalars['Float']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
  status: OrderItemStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum OrderItemStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Refunded = 'REFUNDED',
  Returned = 'RETURNED',
  Shipped = 'SHIPPED'
}

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Failed = 'FAILED',
  Partiallydelivered = 'PARTIALLYDELIVERED',
  Partiallyshipped = 'PARTIALLYSHIPPED',
  Pending = 'PENDING',
  Refunded = 'REFUNDED',
  Returned = 'RETURNED',
  Shipped = 'SHIPPED'
}

export type PaymentSession = {
  __typename?: 'PaymentSession';
  sessionId: Scalars['String']['output'];
  sessionUrl: Scalars['String']['output'];
};

export enum PaymentType {
  Paypal = 'PAYPAL',
  Visa = 'VISA'
}

export type Product = {
  __typename?: 'Product';
  id: Scalars['Int']['output'];
  images: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  quantity: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
  reference: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  getAllCartItems?: Maybe<Array<Maybe<CartItem>>>;
  getAllCategories?: Maybe<Array<Maybe<Category>>>;
  getAllProducts?: Maybe<Array<Maybe<Product>>>;
  getCartItem: CartItem;
  getCategory?: Maybe<Category>;
  getMyOrders?: Maybe<Array<Maybe<Order>>>;
  getOrder: Order;
  getOrderItem: OrderItem;
  getOrderItemsByBuyerId: Array<Maybe<OrderItem>>;
  getOrderItemsByOrderId: Array<Maybe<OrderItem>>;
  getProduct: Product;
  getProductsByCategory?: Maybe<Array<Maybe<Product>>>;
  getShoppingCart?: Maybe<ShoppingCart>;
  getWishList: WishList;
};


export type QueryGetAllProductsArgs = {
  pageNb?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetCartItemArgs = {
  idCartItem: Scalars['Int']['input'];
};


export type QueryGetCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetMyOrdersArgs = {
  pageNb?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOrderArgs = {
  orderId: Scalars['Int']['input'];
};


export type QueryGetOrderItemArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetOrderItemsByBuyerIdArgs = {
  buyerId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOrderItemsByOrderIdArgs = {
  orderId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetProductsByCategoryArgs = {
  categoryId: Scalars['Int']['input'];
  pageNb?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export enum Role {
  Admin = 'ADMIN',
  Buyer = 'BUYER',
  Seller = 'SELLER'
}

export type ShoppingCart = {
  __typename?: 'ShoppingCart';
  cartItems?: Maybe<Array<Maybe<CartItem>>>;
  id: Scalars['Int']['output'];
  totalAmount: Scalars['Float']['output'];
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignupIpnut = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Role;
};

export enum TokenType {
  Email = 'EMAIL',
  Password = 'PASSWORD'
}

export type UpdateProductInput = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  images?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthDay?: InputMaybe<Scalars['DateTime']['input']>;
  coverImg?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  id: Scalars['Int']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profileImg?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  birthDay?: Maybe<Scalars['DateTime']['output']>;
  coverImg?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender?: Maybe<Gender>;
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profileImg?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
};

export type WishList = {
  __typename?: 'WishList';
  id: Scalars['Int']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
};

export enum RndType {
  One = 'ONE',
  Two = 'TWO'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CartItem: ResolverTypeWrapper<CartItem>;
  CartItemInput: CartItemInput;
  CartItemUpdateInput: CartItemUpdateInput;
  Category: ResolverTypeWrapper<Category>;
  CategoryInput: CategoryInput;
  CategoryUpdatedInput: CategoryUpdatedInput;
  CreateProductInput: CreateProductInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Gender: Gender;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JwtPayload: ResolverTypeWrapper<JwtPayload>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  OrderItem: ResolverTypeWrapper<OrderItem>;
  OrderItemStatus: OrderItemStatus;
  OrderStatus: OrderStatus;
  PaymentSession: ResolverTypeWrapper<PaymentSession>;
  PaymentType: PaymentType;
  Product: ResolverTypeWrapper<Product>;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  ShoppingCart: ResolverTypeWrapper<ShoppingCart>;
  SignInInput: SignInInput;
  SignupIpnut: SignupIpnut;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TokenType: TokenType;
  UpdateProductInput: UpdateProductInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  WishList: ResolverTypeWrapper<WishList>;
  rndType: RndType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthResponse: AuthResponse;
  Boolean: Scalars['Boolean']['output'];
  CartItem: CartItem;
  CartItemInput: CartItemInput;
  CartItemUpdateInput: CartItemUpdateInput;
  Category: Category;
  CategoryInput: CategoryInput;
  CategoryUpdatedInput: CategoryUpdatedInput;
  CreateProductInput: CreateProductInput;
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  JwtPayload: JwtPayload;
  Mutation: {};
  Order: Order;
  OrderItem: OrderItem;
  PaymentSession: PaymentSession;
  Product: Product;
  Query: {};
  ShoppingCart: ShoppingCart;
  SignInInput: SignInInput;
  SignupIpnut: SignupIpnut;
  String: Scalars['String']['output'];
  UpdateProductInput: UpdateProductInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  WishList: WishList;
};

export type AuthResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = {
  jwt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartItemResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CartItem'] = ResolversParentTypes['CartItem']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type JwtPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['JwtPayload'] = ResolversParentTypes['JwtPayload']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addProductToWishList?: Resolver<ResolversTypes['WishList'], ParentType, ContextType, RequireFields<MutationAddProductToWishListArgs, 'productId'>>;
  addResetPasswordRequest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddResetPasswordRequestArgs, 'email'>>;
  cancelShoppingCart?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  creatCartItem?: Resolver<ResolversTypes['CartItem'], ParentType, ContextType, RequireFields<MutationCreatCartItemArgs, 'input'>>;
  creatPaymentIntent?: Resolver<ResolversTypes['PaymentSession'], ParentType, ContextType>;
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'input'>>;
  createOrder?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'paymentId'>>;
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'input'>>;
  deleteProductFromWishList?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteProductFromWishListArgs, 'productId'>>;
  removeCartItem?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveCartItemArgs, 'idCartItem'>>;
  removeProduct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveProductArgs, 'productId'>>;
  resetPassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'password' | 'token' | 'userId'>>;
  signin?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationSigninArgs, 'input'>>;
  signup?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
  updateCartItem?: Resolver<ResolversTypes['CartItem'], ParentType, ContextType, RequireFields<MutationUpdateCartItemArgs, 'input'>>;
  updateCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, Partial<MutationUpdateCategoryArgs>>;
  updateOrderItemStatus?: Resolver<ResolversTypes['OrderItem'], ParentType, ContextType, RequireFields<MutationUpdateOrderItemStatusArgs, 'orderItemId' | 'status'>>;
  updateProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
  verifyEmail?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'email' | 'token'>>;
  verifyPayment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationVerifyPaymentArgs, 'sessionId'>>;
};

export type OrderResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  buyer?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  orderItems?: Resolver<Array<Maybe<ResolversTypes['OrderItem']>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderStatus'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderItemResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['OrderItem'] = ResolversParentTypes['OrderItem']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['OrderItemStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentSessionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PaymentSession'] = ResolversParentTypes['PaymentSession']> = {
  sessionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sessionUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reference?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getAllCartItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['CartItem']>>>, ParentType, ContextType>;
  getAllCategories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  getAllProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType, Partial<QueryGetAllProductsArgs>>;
  getCartItem?: Resolver<ResolversTypes['CartItem'], ParentType, ContextType, RequireFields<QueryGetCartItemArgs, 'idCartItem'>>;
  getCategory?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryGetCategoryArgs, 'id'>>;
  getMyOrders?: Resolver<Maybe<Array<Maybe<ResolversTypes['Order']>>>, ParentType, ContextType, Partial<QueryGetMyOrdersArgs>>;
  getOrder?: Resolver<ResolversTypes['Order'], ParentType, ContextType, RequireFields<QueryGetOrderArgs, 'orderId'>>;
  getOrderItem?: Resolver<ResolversTypes['OrderItem'], ParentType, ContextType, RequireFields<QueryGetOrderItemArgs, 'id'>>;
  getOrderItemsByBuyerId?: Resolver<Array<Maybe<ResolversTypes['OrderItem']>>, ParentType, ContextType, Partial<QueryGetOrderItemsByBuyerIdArgs>>;
  getOrderItemsByOrderId?: Resolver<Array<Maybe<ResolversTypes['OrderItem']>>, ParentType, ContextType, Partial<QueryGetOrderItemsByOrderIdArgs>>;
  getProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<QueryGetProductArgs, 'id'>>;
  getProductsByCategory?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType, RequireFields<QueryGetProductsByCategoryArgs, 'categoryId'>>;
  getShoppingCart?: Resolver<Maybe<ResolversTypes['ShoppingCart']>, ParentType, ContextType>;
  getWishList?: Resolver<ResolversTypes['WishList'], ParentType, ContextType>;
};

export type ShoppingCartResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ShoppingCart'] = ResolversParentTypes['ShoppingCart']> = {
  cartItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['CartItem']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthDay?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  coverImg?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profileImg?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WishListResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['WishList'] = ResolversParentTypes['WishList']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MyContext> = {
  AuthResponse?: AuthResponseResolvers<ContextType>;
  CartItem?: CartItemResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JwtPayload?: JwtPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderItem?: OrderItemResolvers<ContextType>;
  PaymentSession?: PaymentSessionResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ShoppingCart?: ShoppingCartResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  WishList?: WishListResolvers<ContextType>;
};

