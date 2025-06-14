import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AdminHomeStatistics = {
  __typename?: 'AdminHomeStatistics';
  newOrders?: Maybe<Scalars['Int']['output']>;
  newProducts?: Maybe<Scalars['Int']['output']>;
  registeredBuyers?: Maybe<Scalars['Int']['output']>;
  registeredSeller?: Maybe<Scalars['Int']['output']>;
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
  quantity: Scalars['Int']['input'];
};

export type Category = {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  productCount?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CategoryInput = {
  description: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CategoryUpdatedInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
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

export type CreateReviewInput = {
  comment: Scalars['String']['input'];
  productId: Scalars['Int']['input'];
  rating: Scalars['Int']['input'];
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
  VerificationEmailRequest: Scalars['Boolean']['output'];
  addProductToWishList: WishList;
  addResetPasswordRequest: Scalars['Boolean']['output'];
  cancelShoppingCart: Scalars['Boolean']['output'];
  creatCartItem: CartItem;
  creatPaymentIntent: PaymentSession;
  createCategory: Category;
  createOrder: Order;
  createProduct?: Maybe<Product>;
  createReview: Review;
  deleteProductFromWishList: Scalars['Boolean']['output'];
  deleteReview?: Maybe<Scalars['Boolean']['output']>;
  incrementQuantity?: Maybe<Product>;
  removeCartItem: Scalars['Boolean']['output'];
  removeProduct: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  signin: AuthResponse;
  signup: Scalars['Boolean']['output'];
  updateCartItem: CartItem;
  updateCategory: Category;
  updateOrderItemStatus: OrderItem;
  updateProduct?: Maybe<Product>;
  updateProductDisableStatus: Scalars['Boolean']['output'];
  updateReview: Review;
  updateUser: User;
  updateUserBlockStatus: Scalars['Boolean']['output'];
  verifyEmail: Scalars['Boolean']['output'];
  verifyPayment: Scalars['Boolean']['output'];
};


export type MutationVerificationEmailRequestArgs = {
  email: Scalars['String']['input'];
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


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};


export type MutationDeleteProductFromWishListArgs = {
  productId: Scalars['Int']['input'];
};


export type MutationDeleteReviewArgs = {
  reviewId: Scalars['Int']['input'];
};


export type MutationIncrementQuantityArgs = {
  addedQte: Scalars['Int']['input'];
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


export type MutationUpdateProductDisableStatusArgs = {
  isDisabled: Scalars['Boolean']['input'];
  productId: Scalars['Int']['input'];
};


export type MutationUpdateReviewArgs = {
  input: UpdateReviewInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserBlockStatusArgs = {
  isBlocked: Scalars['Boolean']['input'];
  userId: Scalars['Int']['input'];
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
  buyer?: Maybe<User>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  orderItems?: Maybe<Array<Maybe<OrderItem>>>;
  status?: Maybe<OrderStatus>;
  totalAmount?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  order?: Maybe<Order>;
  price: Scalars['Float']['output'];
  product?: Maybe<Product>;
  quantity: Scalars['Int']['output'];
  status: OrderItemStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderItemFilter = {
  pageNb?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  period?: InputMaybe<PeriodFilter>;
  status?: InputMaybe<OrderItemStatus>;
};

export type OrderItemStatistics = {
  __typename?: 'OrderItemStatistics';
  all?: Maybe<Scalars['Int']['output']>;
  countCanceledOrFailed?: Maybe<Scalars['Int']['output']>;
  countDelivered?: Maybe<Scalars['Int']['output']>;
  countPending?: Maybe<Scalars['Int']['output']>;
  totalEarnings?: Maybe<Scalars['Float']['output']>;
  totalNewCustomers?: Maybe<Scalars['Int']['output']>;
};

export enum OrderItemStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Refunded = 'REFUNDED',
  Shipped = 'SHIPPED'
}

export type OrderItemsListResult = {
  __typename?: 'OrderItemsListResult';
  count: Scalars['Int']['output'];
  orderItems: Array<OrderItem>;
};

export type OrderPagination = {
  __typename?: 'OrderPagination';
  orders: Array<Order>;
  totalCount: Scalars['Int']['output'];
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Failed = 'FAILED',
  Partiallydelivered = 'PARTIALLYDELIVERED',
  Partiallyshipped = 'PARTIALLYSHIPPED',
  Pending = 'PENDING',
  Refunded = 'REFUNDED',
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

export enum PeriodFilter {
  Day = 'DAY',
  Month = 'MONTH',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type Product = {
  __typename?: 'Product';
  category?: Maybe<Category>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  isDisabled?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  numberOfReviews?: Maybe<Scalars['Int']['output']>;
  owner?: Maybe<User>;
  price?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  reviews?: Maybe<Array<Review>>;
  totalOrders?: Maybe<Scalars['Int']['output']>;
};

export type ProductFilter = {
  available?: InputMaybe<Scalars['Boolean']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  isDisabled?: InputMaybe<Scalars['Boolean']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  minRating?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  pageNb?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductFilterInput = {
  available?: InputMaybe<Scalars['Boolean']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  minRating?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ProductListResult = {
  __typename?: 'ProductListResult';
  count: Scalars['Int']['output'];
  products: Array<Product>;
};

export type ProductsStatistics = {
  __typename?: 'ProductsStatistics';
  countAvailable: Scalars['Int']['output'];
  countOutOfStock: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  getAdminHomeStatistics: AdminHomeStatistics;
  getAllCartItems?: Maybe<Array<Maybe<CartItem>>>;
  getAllCategories: Array<Category>;
  getAllMyProducts: ProductListResult;
  getAllProducts: ProductListResult;
  getBestSellers: Array<BestSellerInfo>;
  getCartItem: CartItem;
  getCategory?: Maybe<Category>;
  getCustomerPastOrderItems?: Maybe<Array<OrderItem>>;
  getEarningByPeriod: Array<Scalars['Float']['output']>;
  getFilteredWishList?: Maybe<Array<Maybe<Product>>>;
  getFrequentBuyers: Array<FrequentBuyersInfo>;
  getMyOrders?: Maybe<OrderPagination>;
  getMyProductReview?: Maybe<Review>;
  getMyProductsStatistics: ProductsStatistics;
  getOrder: Order;
  getOrderItem: OrderItem;
  getOrderItemsByOrderId: Array<Maybe<OrderItem>>;
  getOrderItemsForSeller: OrderItemsListResult;
  getOrdersByPeriod: Array<Scalars['Float']['output']>;
  getParamUploadImage: UploadCloud;
  getProduct: Product;
  getRecievedOrderItemsStatistics: OrderItemStatistics;
  getRegisteredUsersByPeriod: Array<Scalars['Int']['output']>;
  getReviewsByProductId?: Maybe<Array<Maybe<Review>>>;
  getSellerTopProducts?: Maybe<Array<ProductAndNbOrders>>;
  getShoppingCart?: Maybe<ShoppingCart>;
  getTopSellingProducts?: Maybe<Array<ProductAndNbOrders>>;
  getUserById: User;
  getUsers: UserPaginationResult;
  getWishList: WishList;
  isBuyerAllowedToReview: Scalars['Boolean']['output'];
};


export type QueryGetAdminHomeStatisticsArgs = {
  period?: InputMaybe<PeriodFilter>;
};


export type QueryGetAllMyProductsArgs = {
  input?: InputMaybe<ProductFilter>;
};


export type QueryGetAllProductsArgs = {
  input?: InputMaybe<ProductFilter>;
};


export type QueryGetBestSellersArgs = {
  period?: InputMaybe<PeriodFilter>;
};


export type QueryGetCartItemArgs = {
  idCartItem: Scalars['Int']['input'];
};


export type QueryGetCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetCustomerPastOrderItemsArgs = {
  customerId: Scalars['Int']['input'];
};


export type QueryGetEarningByPeriodArgs = {
  period?: InputMaybe<PeriodFilter>;
};


export type QueryGetFilteredWishListArgs = {
  input?: InputMaybe<ProductFilterInput>;
};


export type QueryGetFrequentBuyersArgs = {
  period?: InputMaybe<PeriodFilter>;
};


export type QueryGetMyOrdersArgs = {
  pageNb?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetMyProductReviewArgs = {
  productId: Scalars['Int']['input'];
};


export type QueryGetOrderArgs = {
  orderId: Scalars['Int']['input'];
};


export type QueryGetOrderItemArgs = {
  OrderItemId: Scalars['Int']['input'];
};


export type QueryGetOrderItemsByOrderIdArgs = {
  orderId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOrderItemsForSellerArgs = {
  input: OrderItemFilter;
};


export type QueryGetOrdersByPeriodArgs = {
  period?: InputMaybe<PeriodFilter>;
};


export type QueryGetParamUploadImageArgs = {
  folder: Scalars['String']['input'];
};


export type QueryGetProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetRecievedOrderItemsStatisticsArgs = {
  period?: InputMaybe<PeriodFilter>;
};


export type QueryGetRegisteredUsersByPeriodArgs = {
  period?: InputMaybe<PeriodFilter>;
  role: Role;
};


export type QueryGetReviewsByProductIdArgs = {
  productId: Scalars['Int']['input'];
};


export type QueryGetSellerTopProductsArgs = {
  nbProduct: Scalars['Int']['input'];
};


export type QueryGetTopSellingProductsArgs = {
  input?: InputMaybe<ProductFilter>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUsersArgs = {
  input?: InputMaybe<UsersFilter>;
};


export type QueryIsBuyerAllowedToReviewArgs = {
  productId: Scalars['Int']['input'];
};

export type Review = {
  __typename?: 'Review';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  product?: Maybe<Product>;
  rating?: Maybe<Scalars['Int']['output']>;
  reviewer?: Maybe<User>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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

export type UpdateReviewInput = {
  comment: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  rating: Scalars['Int']['input'];
};

export type UpdateUserInput = {
  birthDay?: InputMaybe<Scalars['DateTime']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  coverImg?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  profileImg?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type UploadCloud = {
  __typename?: 'UploadCloud';
  apiKey: Scalars['String']['output'];
  cloudName: Scalars['String']['output'];
  signature: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  birthDay?: Maybe<Scalars['DateTime']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  coverImg?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id: Scalars['Int']['output'];
  isBlocked?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  profileImg?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  street?: Maybe<Scalars['String']['output']>;
};

export type UserPaginationResult = {
  __typename?: 'UserPaginationResult';
  totalCount: Scalars['Int']['output'];
  users: Array<User>;
};

export type WishList = {
  __typename?: 'WishList';
  id: Scalars['Int']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
};

export type BestSellerInfo = {
  __typename?: 'bestSellerInfo';
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  selledProducts: Scalars['Int']['output'];
};

export type FrequentBuyersInfo = {
  __typename?: 'frequentBuyersInfo';
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  nbPlacedOrders: Scalars['Int']['output'];
  nbPurchasedProducts: Scalars['Int']['output'];
};

export type ProductAndNbOrders = {
  __typename?: 'productAndNbOrders';
  product: Product;
  totalSold: Scalars['Int']['output'];
};

export enum RndType {
  One = 'ONE',
  Two = 'TWO'
}

export type UsersFilter = {
  id?: InputMaybe<Scalars['Int']['input']>;
  isBlocked?: InputMaybe<Scalars['Boolean']['input']>;
  pageNb?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<Role>;
};

export type GetAdminHomeStatisticsQueryVariables = Exact<{
  period?: InputMaybe<PeriodFilter>;
}>;


export type GetAdminHomeStatisticsQuery = { __typename?: 'Query', getAdminHomeStatistics: { __typename?: 'AdminHomeStatistics', registeredSeller?: number | null, registeredBuyers?: number | null, newOrders?: number | null, newProducts?: number | null } };

export type GetRegisteredUsersByPeriodQueryVariables = Exact<{
  role: Role;
  period?: InputMaybe<PeriodFilter>;
}>;


export type GetRegisteredUsersByPeriodQuery = { __typename?: 'Query', getRegisteredUsersByPeriod: Array<number> };

export type GetBestSellersQueryVariables = Exact<{
  period?: InputMaybe<PeriodFilter>;
}>;


export type GetBestSellersQuery = { __typename?: 'Query', getBestSellers: Array<{ __typename?: 'bestSellerInfo', id: number, firstName: string, lastName: string, selledProducts: number }> };

export type GetFrequentBuyersQueryVariables = Exact<{
  period?: InputMaybe<PeriodFilter>;
}>;


export type GetFrequentBuyersQuery = { __typename?: 'Query', getFrequentBuyers: Array<{ __typename?: 'frequentBuyersInfo', id: number, firstName: string, lastName: string, nbPurchasedProducts: number, nbPlacedOrders: number }> };

export type UpdateUserBlockStatusMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  isBlocked: Scalars['Boolean']['input'];
}>;


export type UpdateUserBlockStatusMutation = { __typename?: 'Mutation', updateUserBlockStatus: boolean };

export type UpdateProductDisableStatusMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
  isDisabled: Scalars['Boolean']['input'];
}>;


export type UpdateProductDisableStatusMutation = { __typename?: 'Mutation', updateProductDisableStatus: boolean };

export type SigninMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'AuthResponse', jwt: string, user: { __typename?: 'User', id: number, email?: string | null, firstName?: string | null, lastName?: string | null, country?: string | null, city?: string | null, street?: string | null, postalCode?: string | null, phoneNumber?: string | null, birthDay?: any | null, gender?: Gender | null, profileImg?: string | null, coverImg?: string | null, role?: Role | null } } };

export type SignupMutationVariables = Exact<{
  input: SignupIpnut;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: boolean };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: number, email?: string | null, firstName?: string | null, lastName?: string | null, country?: string | null, city?: string | null, street?: string | null, postalCode?: string | null, phoneNumber?: string | null, birthDay?: any | null, gender?: Gender | null, profileImg?: string | null, coverImg?: string | null, role?: Role | null } | null };

export type VerifyEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: boolean };

export type VerificationEmailRequestMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type VerificationEmailRequestMutation = { __typename?: 'Mutation', VerificationEmailRequest: boolean };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, email?: string | null, firstName?: string | null, lastName?: string | null, country?: string | null, city?: string | null, street?: string | null, postalCode?: string | null, phoneNumber?: string | null, birthDay?: any | null, gender?: Gender | null, profileImg?: string | null, coverImg?: string | null, role?: Role | null } };

export type AddResetPasswordRequestMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type AddResetPasswordRequestMutation = { __typename?: 'Mutation', addResetPasswordRequest: boolean };

export type ResetPasswordMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type CreateCartItemMutationVariables = Exact<{
  input: CartItemInput;
}>;


export type CreateCartItemMutation = { __typename?: 'Mutation', creatCartItem: { __typename?: 'CartItem', id: number, quantity: number, price: number, product: { __typename?: 'Product', id: number, name?: string | null, price?: number | null } } };

export type UpdateCartItemMutationVariables = Exact<{
  input: CartItemUpdateInput;
}>;


export type UpdateCartItemMutation = { __typename?: 'Mutation', updateCartItem: { __typename?: 'CartItem', id: number, quantity: number, price: number, product: { __typename?: 'Product', id: number, name?: string | null, price?: number | null } } };

export type RemoveCartItemMutationVariables = Exact<{
  idCartItem: Scalars['Int']['input'];
}>;


export type RemoveCartItemMutation = { __typename?: 'Mutation', removeCartItem: boolean };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id?: number | null, name?: string | null, description?: string | null, createdAt?: any | null, updatedAt?: any | null, productCount?: number | null, image?: string | null }> };

export type CreateCategoryMutationVariables = Exact<{
  input: CategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id?: number | null, name?: string | null, description?: string | null, image?: string | null, createdAt?: any | null, updatedAt?: any | null } };

export type GetCategoryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', getCategory?: { __typename?: 'Category', id?: number | null, name?: string | null, description?: string | null, image?: string | null } | null };

export type UpdateCategoryMutationVariables = Exact<{
  input?: InputMaybe<CategoryUpdatedInput>;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id?: number | null, name?: string | null, description?: string | null, image?: string | null } };

export type GetMyOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyOrdersQuery = { __typename?: 'Query', getMyOrders?: { __typename?: 'OrderPagination', totalCount: number, orders: Array<{ __typename?: 'Order', id?: number | null, status?: OrderStatus | null, totalAmount?: number | null, createdAt?: any | null, updatedAt?: any | null, orderItems?: Array<{ __typename?: 'OrderItem', id: number, quantity: number, price: number, status: OrderItemStatus, createdAt: any, updatedAt: any, product?: { __typename?: 'Product', id: number, name?: string | null, images?: Array<string> | null, rating?: number | null, quantity?: number | null, price?: number | null, createdAt?: any | null } | null } | null> | null }> } | null };

export type GetOrderItemsForSellerQueryVariables = Exact<{
  input: OrderItemFilter;
}>;


export type GetOrderItemsForSellerQuery = { __typename?: 'Query', getOrderItemsForSeller: { __typename?: 'OrderItemsListResult', count: number, orderItems: Array<{ __typename?: 'OrderItem', id: number, quantity: number, price: number, status: OrderItemStatus, createdAt: any, updatedAt: any, product?: { __typename?: 'Product', id: number, name?: string | null } | null, order?: { __typename?: 'Order', buyer?: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null } | null } | null }> } };

export type UpdateOrderItemStatusMutationVariables = Exact<{
  orderItemId: Scalars['Int']['input'];
  status: OrderItemStatus;
}>;


export type UpdateOrderItemStatusMutation = { __typename?: 'Mutation', updateOrderItemStatus: { __typename?: 'OrderItem', id: number, quantity: number, price: number, status: OrderItemStatus, createdAt: any, updatedAt: any, product?: { __typename?: 'Product', id: number, name?: string | null } | null } };

export type GetRecievedOrderItemsStatisticsQueryVariables = Exact<{
  period?: InputMaybe<PeriodFilter>;
}>;


export type GetRecievedOrderItemsStatisticsQuery = { __typename?: 'Query', getRecievedOrderItemsStatistics: { __typename?: 'OrderItemStatistics', countPending?: number | null, countCanceledOrFailed?: number | null, countDelivered?: number | null, all?: number | null } };

export type GetGeneralOrderItemsStatisticsQueryVariables = Exact<{
  period?: InputMaybe<PeriodFilter>;
}>;


export type GetGeneralOrderItemsStatisticsQuery = { __typename?: 'Query', getRecievedOrderItemsStatistics: { __typename?: 'OrderItemStatistics', countDelivered?: number | null, all?: number | null, totalEarnings?: number | null, totalNewCustomers?: number | null } };

export type GetEarningByPeriodQueryVariables = Exact<{
  period?: InputMaybe<PeriodFilter>;
}>;


export type GetEarningByPeriodQuery = { __typename?: 'Query', getEarningByPeriod: Array<number> };

export type GetOrdersByPeriodQueryVariables = Exact<{
  period?: InputMaybe<PeriodFilter>;
}>;


export type GetOrdersByPeriodQuery = { __typename?: 'Query', getOrdersByPeriod: Array<number> };

export type CreatPaymentIntentMutationVariables = Exact<{ [key: string]: never; }>;


export type CreatPaymentIntentMutation = { __typename?: 'Mutation', creatPaymentIntent: { __typename?: 'PaymentSession', sessionUrl: string, sessionId: string } };

export type VerifyPaymentMutationVariables = Exact<{
  sessionId: Scalars['String']['input'];
}>;


export type VerifyPaymentMutation = { __typename?: 'Mutation', verifyPayment: boolean };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct?: { __typename?: 'Product', id: number, name?: string | null, reference?: string | null, images?: Array<string> | null, rating?: number | null, description?: string | null, quantity?: number | null, price?: number | null, createdAt?: any | null, category?: { __typename?: 'Category', id?: number | null } | null } | null };

export type UpdateProductMutationVariables = Exact<{
  input: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct?: { __typename?: 'Product', id: number, name?: string | null, reference?: string | null, images?: Array<string> | null, rating?: number | null, description?: string | null, quantity?: number | null, price?: number | null, createdAt?: any | null, numberOfReviews?: number | null, category?: { __typename?: 'Category', id?: number | null } | null } | null };

export type GetAllProductsQueryVariables = Exact<{
  input?: InputMaybe<ProductFilter>;
}>;


export type GetAllProductsQuery = { __typename?: 'Query', getAllProducts: { __typename?: 'ProductListResult', count: number, products: Array<{ __typename?: 'Product', id: number, name?: string | null, reference?: string | null, images?: Array<string> | null, rating?: number | null, description?: string | null, quantity?: number | null, price?: number | null, createdAt?: any | null, isDisabled?: boolean | null, numberOfReviews?: number | null, totalOrders?: number | null, category?: { __typename?: 'Category', id?: number | null, name?: string | null } | null, owner?: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null } | null }> } };

export type GetProductQueryVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', getProduct: { __typename?: 'Product', id: number, name?: string | null, reference?: string | null, images?: Array<string> | null, rating?: number | null, description?: string | null, quantity?: number | null, price?: number | null, createdAt?: any | null, category?: { __typename?: 'Category', id?: number | null, name?: string | null } | null } };

export type GetProductDetailsQueryVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type GetProductDetailsQuery = { __typename?: 'Query', getProduct: { __typename?: 'Product', id: number, name?: string | null, reference?: string | null, images?: Array<string> | null, rating?: number | null, numberOfReviews?: number | null, description?: string | null, quantity?: number | null, price?: number | null, createdAt?: any | null, totalOrders?: number | null, isDisabled?: boolean | null, category?: { __typename?: 'Category', id?: number | null, name?: string | null } | null, owner?: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null } | null, reviews?: Array<{ __typename?: 'Review', id?: number | null, rating?: number | null, comment?: string | null, createdAt?: any | null, reviewer?: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null } | null }> | null } };

export type GetAllMyProductsQueryVariables = Exact<{
  input?: InputMaybe<ProductFilter>;
}>;


export type GetAllMyProductsQuery = { __typename?: 'Query', getAllMyProducts: { __typename?: 'ProductListResult', count: number, products: Array<{ __typename?: 'Product', id: number, name?: string | null, reference?: string | null, images?: Array<string> | null, rating?: number | null, description?: string | null, quantity?: number | null, price?: number | null, createdAt?: any | null, totalOrders?: number | null, category?: { __typename?: 'Category', name?: string | null } | null }> } };

export type GetMyProductsStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProductsStatisticsQuery = { __typename?: 'Query', getMyProductsStatistics: { __typename?: 'ProductsStatistics', countAvailable: number, countOutOfStock: number } };

export type RemoveProductMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type RemoveProductMutation = { __typename?: 'Mutation', removeProduct: boolean };

export type GetSellerTopProductsQueryVariables = Exact<{
  nbProduct: Scalars['Int']['input'];
}>;


export type GetSellerTopProductsQuery = { __typename?: 'Query', getSellerTopProducts?: Array<{ __typename?: 'productAndNbOrders', totalSold: number, product: { __typename?: 'Product', id: number, name?: string | null, rating?: number | null } }> | null };

export type IsBuyerAllowedToReviewQueryVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type IsBuyerAllowedToReviewQuery = { __typename?: 'Query', isBuyerAllowedToReview: boolean };

export type CreateReviewMutationVariables = Exact<{
  input: CreateReviewInput;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'Review', id?: number | null, rating?: number | null, comment?: string | null, createdAt?: any | null, updatedAt?: any | null } };

export type UpdateReviewMutationVariables = Exact<{
  input: UpdateReviewInput;
}>;


export type UpdateReviewMutation = { __typename?: 'Mutation', updateReview: { __typename?: 'Review', id?: number | null, rating?: number | null, comment?: string | null, createdAt?: any | null, updatedAt?: any | null } };

export type GetMyProductReviewQueryVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type GetMyProductReviewQuery = { __typename?: 'Query', getMyProductReview?: { __typename?: 'Review', id?: number | null, rating?: number | null, comment?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type GetCustomerInfoQueryVariables = Exact<{
  Id: Scalars['Int']['input'];
}>;


export type GetCustomerInfoQuery = { __typename?: 'Query', getUserById: { __typename?: 'User', id: number, email?: string | null, firstName?: string | null, lastName?: string | null, country?: string | null, city?: string | null, street?: string | null, postalCode?: string | null, phoneNumber?: string | null, birthDay?: any | null, gender?: Gender | null, profileImg?: string | null, coverImg?: string | null, role?: Role | null } };

export type GetCustomerPastOrderItemsQueryVariables = Exact<{
  customerId: Scalars['Int']['input'];
}>;


export type GetCustomerPastOrderItemsQuery = { __typename?: 'Query', getCustomerPastOrderItems?: Array<{ __typename?: 'OrderItem', id: number, quantity: number, price: number, status: OrderItemStatus, createdAt: any, updatedAt: any, product?: { __typename?: 'Product', id: number, name?: string | null } | null }> | null };

export type GetShoppingCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShoppingCartQuery = { __typename?: 'Query', getShoppingCart?: { __typename?: 'ShoppingCart', id: number, totalAmount: number, cartItems?: Array<{ __typename?: 'CartItem', id: number, price: number, quantity: number, product: { __typename?: 'Product', id: number, name?: string | null, reference?: string | null, images?: Array<string> | null, price?: number | null, rating?: number | null, numberOfReviews?: number | null, category?: { __typename?: 'Category', name?: string | null } | null } } | null> | null } | null };

export type CancelShoppingCartMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelShoppingCartMutation = { __typename?: 'Mutation', cancelShoppingCart: boolean };

export type GetParamUploadImageQueryVariables = Exact<{
  folder: Scalars['String']['input'];
}>;


export type GetParamUploadImageQuery = { __typename?: 'Query', getParamUploadImage: { __typename?: 'UploadCloud', signature: string, timestamp: number, cloudName: string, apiKey: string } };

export type GetUsersQueryVariables = Exact<{
  input?: InputMaybe<UsersFilter>;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'UserPaginationResult', totalCount: number, users: Array<{ __typename?: 'User', id: number, email?: string | null, firstName?: string | null, lastName?: string | null, country?: string | null, city?: string | null, street?: string | null, postalCode?: string | null, phoneNumber?: string | null, birthDay?: any | null, gender?: Gender | null, profileImg?: string | null, coverImg?: string | null, role?: Role | null, isBlocked?: boolean | null }> } };

export type GetWishListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWishListQuery = { __typename?: 'Query', getWishList: { __typename?: 'WishList', id: number, products?: Array<{ __typename?: 'Product', id: number, name?: string | null, price?: number | null, images?: Array<string> | null, quantity?: number | null, rating?: number | null, category?: { __typename?: 'Category', id?: number | null, name?: string | null } | null } | null> | null } };

export type AddProductToWishListMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type AddProductToWishListMutation = { __typename?: 'Mutation', addProductToWishList: { __typename?: 'WishList', id: number, products?: Array<{ __typename?: 'Product', id: number } | null> | null } };

export type DeleteProductFromWishListMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type DeleteProductFromWishListMutation = { __typename?: 'Mutation', deleteProductFromWishList: boolean };

export type GetFilteredWishListQueryVariables = Exact<{
  input?: InputMaybe<ProductFilterInput>;
}>;


export type GetFilteredWishListQuery = { __typename?: 'Query', getFilteredWishList?: Array<{ __typename?: 'Product', id: number, name?: string | null, price?: number | null, rating?: number | null, quantity?: number | null, category?: { __typename?: 'Category', id?: number | null, name?: string | null } | null } | null> | null };



export const GetAdminHomeStatisticsDocument = `
    query GetAdminHomeStatistics($period: PeriodFilter) {
  getAdminHomeStatistics(period: $period) {
    registeredSeller
    registeredBuyers
    newOrders
    newProducts
  }
}
    `;

export const useGetAdminHomeStatisticsQuery = <
      TData = GetAdminHomeStatisticsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetAdminHomeStatisticsQueryVariables,
      options?: UseQueryOptions<GetAdminHomeStatisticsQuery, TError, TData>
    ) => {
    
    return useQuery<GetAdminHomeStatisticsQuery, TError, TData>(
      variables === undefined ? ['GetAdminHomeStatistics'] : ['GetAdminHomeStatistics', variables],
      fetcher<GetAdminHomeStatisticsQuery, GetAdminHomeStatisticsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAdminHomeStatisticsDocument, variables),
      options
    )};

export const GetRegisteredUsersByPeriodDocument = `
    query GetRegisteredUsersByPeriod($role: Role!, $period: PeriodFilter) {
  getRegisteredUsersByPeriod(role: $role, period: $period)
}
    `;

export const useGetRegisteredUsersByPeriodQuery = <
      TData = GetRegisteredUsersByPeriodQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetRegisteredUsersByPeriodQueryVariables,
      options?: UseQueryOptions<GetRegisteredUsersByPeriodQuery, TError, TData>
    ) => {
    
    return useQuery<GetRegisteredUsersByPeriodQuery, TError, TData>(
      ['GetRegisteredUsersByPeriod', variables],
      fetcher<GetRegisteredUsersByPeriodQuery, GetRegisteredUsersByPeriodQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetRegisteredUsersByPeriodDocument, variables),
      options
    )};

export const GetBestSellersDocument = `
    query GetBestSellers($period: PeriodFilter) {
  getBestSellers(period: $period) {
    id
    firstName
    lastName
    selledProducts
  }
}
    `;

export const useGetBestSellersQuery = <
      TData = GetBestSellersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetBestSellersQueryVariables,
      options?: UseQueryOptions<GetBestSellersQuery, TError, TData>
    ) => {
    
    return useQuery<GetBestSellersQuery, TError, TData>(
      variables === undefined ? ['GetBestSellers'] : ['GetBestSellers', variables],
      fetcher<GetBestSellersQuery, GetBestSellersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetBestSellersDocument, variables),
      options
    )};

export const GetFrequentBuyersDocument = `
    query GetFrequentBuyers($period: PeriodFilter) {
  getFrequentBuyers(period: $period) {
    id
    firstName
    lastName
    nbPurchasedProducts
    nbPlacedOrders
  }
}
    `;

export const useGetFrequentBuyersQuery = <
      TData = GetFrequentBuyersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetFrequentBuyersQueryVariables,
      options?: UseQueryOptions<GetFrequentBuyersQuery, TError, TData>
    ) => {
    
    return useQuery<GetFrequentBuyersQuery, TError, TData>(
      variables === undefined ? ['GetFrequentBuyers'] : ['GetFrequentBuyers', variables],
      fetcher<GetFrequentBuyersQuery, GetFrequentBuyersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetFrequentBuyersDocument, variables),
      options
    )};

export const UpdateUserBlockStatusDocument = `
    mutation UpdateUserBlockStatus($userId: Int!, $isBlocked: Boolean!) {
  updateUserBlockStatus(userId: $userId, isBlocked: $isBlocked)
}
    `;

export const useUpdateUserBlockStatusMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateUserBlockStatusMutation, TError, UpdateUserBlockStatusMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateUserBlockStatusMutation, TError, UpdateUserBlockStatusMutationVariables, TContext>(
      ['UpdateUserBlockStatus'],
      (variables?: UpdateUserBlockStatusMutationVariables) => fetcher<UpdateUserBlockStatusMutation, UpdateUserBlockStatusMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateUserBlockStatusDocument, variables)(),
      options
    )};

export const UpdateProductDisableStatusDocument = `
    mutation UpdateProductDisableStatus($productId: Int!, $isDisabled: Boolean!) {
  updateProductDisableStatus(productId: $productId, isDisabled: $isDisabled)
}
    `;

export const useUpdateProductDisableStatusMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateProductDisableStatusMutation, TError, UpdateProductDisableStatusMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateProductDisableStatusMutation, TError, UpdateProductDisableStatusMutationVariables, TContext>(
      ['UpdateProductDisableStatus'],
      (variables?: UpdateProductDisableStatusMutationVariables) => fetcher<UpdateProductDisableStatusMutation, UpdateProductDisableStatusMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateProductDisableStatusDocument, variables)(),
      options
    )};

export const SigninDocument = `
    mutation Signin($input: SignInInput!) {
  signin(input: $input) {
    user {
      id
      email
      firstName
      lastName
      country
      city
      street
      postalCode
      phoneNumber
      birthDay
      gender
      profileImg
      coverImg
      role
    }
    jwt
  }
}
    `;

export const useSigninMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<SigninMutation, TError, SigninMutationVariables, TContext>
    ) => {
    
    return useMutation<SigninMutation, TError, SigninMutationVariables, TContext>(
      ['Signin'],
      (variables?: SigninMutationVariables) => fetcher<SigninMutation, SigninMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, SigninDocument, variables)(),
      options
    )};

export const SignupDocument = `
    mutation Signup($input: SignupIpnut!) {
  signup(input: $input)
}
    `;

export const useSignupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<SignupMutation, TError, SignupMutationVariables, TContext>
    ) => {
    
    return useMutation<SignupMutation, TError, SignupMutationVariables, TContext>(
      ['Signup'],
      (variables?: SignupMutationVariables) => fetcher<SignupMutation, SignupMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, SignupDocument, variables)(),
      options
    )};

export const CurrentUserDocument = `
    query CurrentUser {
  currentUser {
    id
    email
    firstName
    lastName
    country
    city
    street
    postalCode
    phoneNumber
    birthDay
    gender
    profileImg
    coverImg
    role
  }
}
    `;

export const useCurrentUserQuery = <
      TData = CurrentUserQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: CurrentUserQueryVariables,
      options?: UseQueryOptions<CurrentUserQuery, TError, TData>
    ) => {
    
    return useQuery<CurrentUserQuery, TError, TData>(
      variables === undefined ? ['CurrentUser'] : ['CurrentUser', variables],
      fetcher<CurrentUserQuery, CurrentUserQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CurrentUserDocument, variables),
      options
    )};

export const VerifyEmailDocument = `
    mutation VerifyEmail($email: String!, $token: String!) {
  verifyEmail(email: $email, token: $token)
}
    `;

export const useVerifyEmailMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<VerifyEmailMutation, TError, VerifyEmailMutationVariables, TContext>
    ) => {
    
    return useMutation<VerifyEmailMutation, TError, VerifyEmailMutationVariables, TContext>(
      ['VerifyEmail'],
      (variables?: VerifyEmailMutationVariables) => fetcher<VerifyEmailMutation, VerifyEmailMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, VerifyEmailDocument, variables)(),
      options
    )};

export const VerificationEmailRequestDocument = `
    mutation VerificationEmailRequest($email: String!) {
  VerificationEmailRequest(email: $email)
}
    `;

export const useVerificationEmailRequestMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<VerificationEmailRequestMutation, TError, VerificationEmailRequestMutationVariables, TContext>
    ) => {
    
    return useMutation<VerificationEmailRequestMutation, TError, VerificationEmailRequestMutationVariables, TContext>(
      ['VerificationEmailRequest'],
      (variables?: VerificationEmailRequestMutationVariables) => fetcher<VerificationEmailRequestMutation, VerificationEmailRequestMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, VerificationEmailRequestDocument, variables)(),
      options
    )};

export const UpdateUserDocument = `
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    email
    firstName
    lastName
    country
    city
    street
    postalCode
    phoneNumber
    birthDay
    gender
    profileImg
    coverImg
    role
  }
}
    `;

export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['UpdateUser'],
      (variables?: UpdateUserMutationVariables) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateUserDocument, variables)(),
      options
    )};

export const AddResetPasswordRequestDocument = `
    mutation AddResetPasswordRequest($email: String!) {
  addResetPasswordRequest(email: $email)
}
    `;

export const useAddResetPasswordRequestMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<AddResetPasswordRequestMutation, TError, AddResetPasswordRequestMutationVariables, TContext>
    ) => {
    
    return useMutation<AddResetPasswordRequestMutation, TError, AddResetPasswordRequestMutationVariables, TContext>(
      ['AddResetPasswordRequest'],
      (variables?: AddResetPasswordRequestMutationVariables) => fetcher<AddResetPasswordRequestMutation, AddResetPasswordRequestMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AddResetPasswordRequestDocument, variables)(),
      options
    )};

export const ResetPasswordDocument = `
    mutation ResetPassword($userId: Int!, $token: String!, $password: String!) {
  resetPassword(userId: $userId, token: $token, password: $password)
}
    `;

export const useResetPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>
    ) => {
    
    return useMutation<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>(
      ['ResetPassword'],
      (variables?: ResetPasswordMutationVariables) => fetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, ResetPasswordDocument, variables)(),
      options
    )};

export const CreateCartItemDocument = `
    mutation CreateCartItem($input: CartItemInput!) {
  creatCartItem(input: $input) {
    id
    quantity
    price
    product {
      id
      name
      price
    }
  }
}
    `;

export const useCreateCartItemMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateCartItemMutation, TError, CreateCartItemMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateCartItemMutation, TError, CreateCartItemMutationVariables, TContext>(
      ['CreateCartItem'],
      (variables?: CreateCartItemMutationVariables) => fetcher<CreateCartItemMutation, CreateCartItemMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateCartItemDocument, variables)(),
      options
    )};

export const UpdateCartItemDocument = `
    mutation UpdateCartItem($input: CartItemUpdateInput!) {
  updateCartItem(input: $input) {
    id
    quantity
    price
    product {
      id
      name
      price
    }
  }
}
    `;

export const useUpdateCartItemMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateCartItemMutation, TError, UpdateCartItemMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateCartItemMutation, TError, UpdateCartItemMutationVariables, TContext>(
      ['UpdateCartItem'],
      (variables?: UpdateCartItemMutationVariables) => fetcher<UpdateCartItemMutation, UpdateCartItemMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateCartItemDocument, variables)(),
      options
    )};

export const RemoveCartItemDocument = `
    mutation RemoveCartItem($idCartItem: Int!) {
  removeCartItem(idCartItem: $idCartItem)
}
    `;

export const useRemoveCartItemMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<RemoveCartItemMutation, TError, RemoveCartItemMutationVariables, TContext>
    ) => {
    
    return useMutation<RemoveCartItemMutation, TError, RemoveCartItemMutationVariables, TContext>(
      ['RemoveCartItem'],
      (variables?: RemoveCartItemMutationVariables) => fetcher<RemoveCartItemMutation, RemoveCartItemMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, RemoveCartItemDocument, variables)(),
      options
    )};

export const GetAllCategoriesDocument = `
    query GetAllCategories {
  getAllCategories {
    id
    name
    description
    createdAt
    updatedAt
    productCount
    image
  }
}
    `;

export const useGetAllCategoriesQuery = <
      TData = GetAllCategoriesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetAllCategoriesQueryVariables,
      options?: UseQueryOptions<GetAllCategoriesQuery, TError, TData>
    ) => {
    
    return useQuery<GetAllCategoriesQuery, TError, TData>(
      variables === undefined ? ['GetAllCategories'] : ['GetAllCategories', variables],
      fetcher<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAllCategoriesDocument, variables),
      options
    )};

export const CreateCategoryDocument = `
    mutation CreateCategory($input: CategoryInput!) {
  createCategory(input: $input) {
    id
    name
    description
    image
    createdAt
    updatedAt
  }
}
    `;

export const useCreateCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateCategoryMutation, TError, CreateCategoryMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateCategoryMutation, TError, CreateCategoryMutationVariables, TContext>(
      ['CreateCategory'],
      (variables?: CreateCategoryMutationVariables) => fetcher<CreateCategoryMutation, CreateCategoryMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateCategoryDocument, variables)(),
      options
    )};

export const GetCategoryDocument = `
    query GetCategory($id: Int!) {
  getCategory(id: $id) {
    id
    name
    description
    image
  }
}
    `;

export const useGetCategoryQuery = <
      TData = GetCategoryQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetCategoryQueryVariables,
      options?: UseQueryOptions<GetCategoryQuery, TError, TData>
    ) => {
    
    return useQuery<GetCategoryQuery, TError, TData>(
      ['GetCategory', variables],
      fetcher<GetCategoryQuery, GetCategoryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCategoryDocument, variables),
      options
    )};

export const UpdateCategoryDocument = `
    mutation UpdateCategory($input: CategoryUpdatedInput) {
  updateCategory(input: $input) {
    id
    name
    description
    image
  }
}
    `;

export const useUpdateCategoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateCategoryMutation, TError, UpdateCategoryMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateCategoryMutation, TError, UpdateCategoryMutationVariables, TContext>(
      ['UpdateCategory'],
      (variables?: UpdateCategoryMutationVariables) => fetcher<UpdateCategoryMutation, UpdateCategoryMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateCategoryDocument, variables)(),
      options
    )};

export const GetMyOrdersDocument = `
    query GetMyOrders {
  getMyOrders {
    orders {
      id
      status
      totalAmount
      orderItems {
        id
        product {
          id
          name
          images
          rating
          quantity
          price
          createdAt
        }
        quantity
        price
        status
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    totalCount
  }
}
    `;

export const useGetMyOrdersQuery = <
      TData = GetMyOrdersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetMyOrdersQueryVariables,
      options?: UseQueryOptions<GetMyOrdersQuery, TError, TData>
    ) => {
    
    return useQuery<GetMyOrdersQuery, TError, TData>(
      variables === undefined ? ['GetMyOrders'] : ['GetMyOrders', variables],
      fetcher<GetMyOrdersQuery, GetMyOrdersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetMyOrdersDocument, variables),
      options
    )};

export const GetOrderItemsForSellerDocument = `
    query GetOrderItemsForSeller($input: OrderItemFilter!) {
  getOrderItemsForSeller(input: $input) {
    orderItems {
      id
      product {
        id
        name
      }
      order {
        buyer {
          id
          firstName
          lastName
        }
      }
      quantity
      price
      status
      createdAt
      updatedAt
    }
    count
  }
}
    `;

export const useGetOrderItemsForSellerQuery = <
      TData = GetOrderItemsForSellerQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetOrderItemsForSellerQueryVariables,
      options?: UseQueryOptions<GetOrderItemsForSellerQuery, TError, TData>
    ) => {
    
    return useQuery<GetOrderItemsForSellerQuery, TError, TData>(
      ['GetOrderItemsForSeller', variables],
      fetcher<GetOrderItemsForSellerQuery, GetOrderItemsForSellerQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetOrderItemsForSellerDocument, variables),
      options
    )};

export const UpdateOrderItemStatusDocument = `
    mutation UpdateOrderItemStatus($orderItemId: Int!, $status: OrderItemStatus!) {
  updateOrderItemStatus(orderItemId: $orderItemId, status: $status) {
    id
    product {
      id
      name
    }
    quantity
    price
    status
    createdAt
    updatedAt
  }
}
    `;

export const useUpdateOrderItemStatusMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateOrderItemStatusMutation, TError, UpdateOrderItemStatusMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateOrderItemStatusMutation, TError, UpdateOrderItemStatusMutationVariables, TContext>(
      ['UpdateOrderItemStatus'],
      (variables?: UpdateOrderItemStatusMutationVariables) => fetcher<UpdateOrderItemStatusMutation, UpdateOrderItemStatusMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateOrderItemStatusDocument, variables)(),
      options
    )};

export const GetRecievedOrderItemsStatisticsDocument = `
    query GetRecievedOrderItemsStatistics($period: PeriodFilter) {
  getRecievedOrderItemsStatistics(period: $period) {
    countPending
    countCanceledOrFailed
    countDelivered
    all
  }
}
    `;

export const useGetRecievedOrderItemsStatisticsQuery = <
      TData = GetRecievedOrderItemsStatisticsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetRecievedOrderItemsStatisticsQueryVariables,
      options?: UseQueryOptions<GetRecievedOrderItemsStatisticsQuery, TError, TData>
    ) => {
    
    return useQuery<GetRecievedOrderItemsStatisticsQuery, TError, TData>(
      variables === undefined ? ['GetRecievedOrderItemsStatistics'] : ['GetRecievedOrderItemsStatistics', variables],
      fetcher<GetRecievedOrderItemsStatisticsQuery, GetRecievedOrderItemsStatisticsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetRecievedOrderItemsStatisticsDocument, variables),
      options
    )};

export const GetGeneralOrderItemsStatisticsDocument = `
    query GetGeneralOrderItemsStatistics($period: PeriodFilter) {
  getRecievedOrderItemsStatistics(period: $period) {
    countDelivered
    all
    totalEarnings
    totalNewCustomers
  }
}
    `;

export const useGetGeneralOrderItemsStatisticsQuery = <
      TData = GetGeneralOrderItemsStatisticsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetGeneralOrderItemsStatisticsQueryVariables,
      options?: UseQueryOptions<GetGeneralOrderItemsStatisticsQuery, TError, TData>
    ) => {
    
    return useQuery<GetGeneralOrderItemsStatisticsQuery, TError, TData>(
      variables === undefined ? ['GetGeneralOrderItemsStatistics'] : ['GetGeneralOrderItemsStatistics', variables],
      fetcher<GetGeneralOrderItemsStatisticsQuery, GetGeneralOrderItemsStatisticsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetGeneralOrderItemsStatisticsDocument, variables),
      options
    )};

export const GetEarningByPeriodDocument = `
    query GetEarningByPeriod($period: PeriodFilter) {
  getEarningByPeriod(period: $period)
}
    `;

export const useGetEarningByPeriodQuery = <
      TData = GetEarningByPeriodQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetEarningByPeriodQueryVariables,
      options?: UseQueryOptions<GetEarningByPeriodQuery, TError, TData>
    ) => {
    
    return useQuery<GetEarningByPeriodQuery, TError, TData>(
      variables === undefined ? ['GetEarningByPeriod'] : ['GetEarningByPeriod', variables],
      fetcher<GetEarningByPeriodQuery, GetEarningByPeriodQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetEarningByPeriodDocument, variables),
      options
    )};

export const GetOrdersByPeriodDocument = `
    query GetOrdersByPeriod($period: PeriodFilter) {
  getOrdersByPeriod(period: $period)
}
    `;

export const useGetOrdersByPeriodQuery = <
      TData = GetOrdersByPeriodQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetOrdersByPeriodQueryVariables,
      options?: UseQueryOptions<GetOrdersByPeriodQuery, TError, TData>
    ) => {
    
    return useQuery<GetOrdersByPeriodQuery, TError, TData>(
      variables === undefined ? ['GetOrdersByPeriod'] : ['GetOrdersByPeriod', variables],
      fetcher<GetOrdersByPeriodQuery, GetOrdersByPeriodQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetOrdersByPeriodDocument, variables),
      options
    )};

export const CreatPaymentIntentDocument = `
    mutation CreatPaymentIntent {
  creatPaymentIntent {
    sessionUrl
    sessionId
  }
}
    `;

export const useCreatPaymentIntentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreatPaymentIntentMutation, TError, CreatPaymentIntentMutationVariables, TContext>
    ) => {
    
    return useMutation<CreatPaymentIntentMutation, TError, CreatPaymentIntentMutationVariables, TContext>(
      ['CreatPaymentIntent'],
      (variables?: CreatPaymentIntentMutationVariables) => fetcher<CreatPaymentIntentMutation, CreatPaymentIntentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreatPaymentIntentDocument, variables)(),
      options
    )};

export const VerifyPaymentDocument = `
    mutation VerifyPayment($sessionId: String!) {
  verifyPayment(sessionId: $sessionId)
}
    `;

export const useVerifyPaymentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<VerifyPaymentMutation, TError, VerifyPaymentMutationVariables, TContext>
    ) => {
    
    return useMutation<VerifyPaymentMutation, TError, VerifyPaymentMutationVariables, TContext>(
      ['VerifyPayment'],
      (variables?: VerifyPaymentMutationVariables) => fetcher<VerifyPaymentMutation, VerifyPaymentMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, VerifyPaymentDocument, variables)(),
      options
    )};

export const CreateProductDocument = `
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    name
    reference
    images
    rating
    description
    quantity
    price
    category {
      id
    }
    createdAt
  }
}
    `;

export const useCreateProductMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateProductMutation, TError, CreateProductMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateProductMutation, TError, CreateProductMutationVariables, TContext>(
      ['CreateProduct'],
      (variables?: CreateProductMutationVariables) => fetcher<CreateProductMutation, CreateProductMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateProductDocument, variables)(),
      options
    )};

export const UpdateProductDocument = `
    mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
    id
    name
    reference
    images
    rating
    description
    quantity
    price
    category {
      id
    }
    createdAt
    numberOfReviews
  }
}
    `;

export const useUpdateProductMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateProductMutation, TError, UpdateProductMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateProductMutation, TError, UpdateProductMutationVariables, TContext>(
      ['UpdateProduct'],
      (variables?: UpdateProductMutationVariables) => fetcher<UpdateProductMutation, UpdateProductMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateProductDocument, variables)(),
      options
    )};

export const GetAllProductsDocument = `
    query GetAllProducts($input: ProductFilter) {
  getAllProducts(input: $input) {
    products {
      id
      name
      reference
      images
      rating
      description
      quantity
      price
      category {
        id
        name
      }
      owner {
        id
        firstName
        lastName
      }
      createdAt
      isDisabled
      numberOfReviews
      totalOrders
    }
    count
  }
}
    `;

export const useGetAllProductsQuery = <
      TData = GetAllProductsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetAllProductsQueryVariables,
      options?: UseQueryOptions<GetAllProductsQuery, TError, TData>
    ) => {
    
    return useQuery<GetAllProductsQuery, TError, TData>(
      variables === undefined ? ['GetAllProducts'] : ['GetAllProducts', variables],
      fetcher<GetAllProductsQuery, GetAllProductsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAllProductsDocument, variables),
      options
    )};

export const GetProductDocument = `
    query GetProduct($productId: Int!) {
  getProduct(id: $productId) {
    id
    name
    reference
    images
    rating
    description
    quantity
    price
    category {
      id
      name
    }
    createdAt
  }
}
    `;

export const useGetProductQuery = <
      TData = GetProductQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetProductQueryVariables,
      options?: UseQueryOptions<GetProductQuery, TError, TData>
    ) => {
    
    return useQuery<GetProductQuery, TError, TData>(
      ['GetProduct', variables],
      fetcher<GetProductQuery, GetProductQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetProductDocument, variables),
      options
    )};

export const GetProductDetailsDocument = `
    query GetProductDetails($productId: Int!) {
  getProduct(id: $productId) {
    id
    name
    reference
    images
    rating
    numberOfReviews
    description
    quantity
    price
    category {
      id
      name
    }
    createdAt
    totalOrders
    isDisabled
    owner {
      id
      firstName
      lastName
    }
    reviews {
      id
      rating
      comment
      createdAt
      reviewer {
        id
        firstName
        lastName
      }
    }
  }
}
    `;

export const useGetProductDetailsQuery = <
      TData = GetProductDetailsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetProductDetailsQueryVariables,
      options?: UseQueryOptions<GetProductDetailsQuery, TError, TData>
    ) => {
    
    return useQuery<GetProductDetailsQuery, TError, TData>(
      ['GetProductDetails', variables],
      fetcher<GetProductDetailsQuery, GetProductDetailsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetProductDetailsDocument, variables),
      options
    )};

export const GetAllMyProductsDocument = `
    query GetAllMyProducts($input: ProductFilter) {
  getAllMyProducts(input: $input) {
    products {
      id
      name
      reference
      images
      rating
      description
      quantity
      price
      category {
        name
      }
      createdAt
      totalOrders
    }
    count
  }
}
    `;

export const useGetAllMyProductsQuery = <
      TData = GetAllMyProductsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetAllMyProductsQueryVariables,
      options?: UseQueryOptions<GetAllMyProductsQuery, TError, TData>
    ) => {
    
    return useQuery<GetAllMyProductsQuery, TError, TData>(
      variables === undefined ? ['GetAllMyProducts'] : ['GetAllMyProducts', variables],
      fetcher<GetAllMyProductsQuery, GetAllMyProductsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAllMyProductsDocument, variables),
      options
    )};

export const GetMyProductsStatisticsDocument = `
    query GetMyProductsStatistics {
  getMyProductsStatistics {
    countAvailable
    countOutOfStock
  }
}
    `;

export const useGetMyProductsStatisticsQuery = <
      TData = GetMyProductsStatisticsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetMyProductsStatisticsQueryVariables,
      options?: UseQueryOptions<GetMyProductsStatisticsQuery, TError, TData>
    ) => {
    
    return useQuery<GetMyProductsStatisticsQuery, TError, TData>(
      variables === undefined ? ['GetMyProductsStatistics'] : ['GetMyProductsStatistics', variables],
      fetcher<GetMyProductsStatisticsQuery, GetMyProductsStatisticsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetMyProductsStatisticsDocument, variables),
      options
    )};

export const RemoveProductDocument = `
    mutation RemoveProduct($productId: Int!) {
  removeProduct(productId: $productId)
}
    `;

export const useRemoveProductMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<RemoveProductMutation, TError, RemoveProductMutationVariables, TContext>
    ) => {
    
    return useMutation<RemoveProductMutation, TError, RemoveProductMutationVariables, TContext>(
      ['RemoveProduct'],
      (variables?: RemoveProductMutationVariables) => fetcher<RemoveProductMutation, RemoveProductMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, RemoveProductDocument, variables)(),
      options
    )};

export const GetSellerTopProductsDocument = `
    query GetSellerTopProducts($nbProduct: Int!) {
  getSellerTopProducts(nbProduct: $nbProduct) {
    product {
      id
      name
      rating
    }
    totalSold
  }
}
    `;

export const useGetSellerTopProductsQuery = <
      TData = GetSellerTopProductsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetSellerTopProductsQueryVariables,
      options?: UseQueryOptions<GetSellerTopProductsQuery, TError, TData>
    ) => {
    
    return useQuery<GetSellerTopProductsQuery, TError, TData>(
      ['GetSellerTopProducts', variables],
      fetcher<GetSellerTopProductsQuery, GetSellerTopProductsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetSellerTopProductsDocument, variables),
      options
    )};

export const IsBuyerAllowedToReviewDocument = `
    query IsBuyerAllowedToReview($productId: Int!) {
  isBuyerAllowedToReview(productId: $productId)
}
    `;

export const useIsBuyerAllowedToReviewQuery = <
      TData = IsBuyerAllowedToReviewQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: IsBuyerAllowedToReviewQueryVariables,
      options?: UseQueryOptions<IsBuyerAllowedToReviewQuery, TError, TData>
    ) => {
    
    return useQuery<IsBuyerAllowedToReviewQuery, TError, TData>(
      ['IsBuyerAllowedToReview', variables],
      fetcher<IsBuyerAllowedToReviewQuery, IsBuyerAllowedToReviewQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, IsBuyerAllowedToReviewDocument, variables),
      options
    )};

export const CreateReviewDocument = `
    mutation CreateReview($input: CreateReviewInput!) {
  createReview(input: $input) {
    id
    rating
    comment
    createdAt
    updatedAt
  }
}
    `;

export const useCreateReviewMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateReviewMutation, TError, CreateReviewMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateReviewMutation, TError, CreateReviewMutationVariables, TContext>(
      ['CreateReview'],
      (variables?: CreateReviewMutationVariables) => fetcher<CreateReviewMutation, CreateReviewMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateReviewDocument, variables)(),
      options
    )};

export const UpdateReviewDocument = `
    mutation UpdateReview($input: UpdateReviewInput!) {
  updateReview(input: $input) {
    id
    rating
    comment
    createdAt
    updatedAt
  }
}
    `;

export const useUpdateReviewMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateReviewMutation, TError, UpdateReviewMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateReviewMutation, TError, UpdateReviewMutationVariables, TContext>(
      ['UpdateReview'],
      (variables?: UpdateReviewMutationVariables) => fetcher<UpdateReviewMutation, UpdateReviewMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateReviewDocument, variables)(),
      options
    )};

export const GetMyProductReviewDocument = `
    query GetMyProductReview($productId: Int!) {
  getMyProductReview(productId: $productId) {
    id
    rating
    comment
    createdAt
    updatedAt
  }
}
    `;

export const useGetMyProductReviewQuery = <
      TData = GetMyProductReviewQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetMyProductReviewQueryVariables,
      options?: UseQueryOptions<GetMyProductReviewQuery, TError, TData>
    ) => {
    
    return useQuery<GetMyProductReviewQuery, TError, TData>(
      ['GetMyProductReview', variables],
      fetcher<GetMyProductReviewQuery, GetMyProductReviewQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetMyProductReviewDocument, variables),
      options
    )};

export const GetCustomerInfoDocument = `
    query GetCustomerInfo($Id: Int!) {
  getUserById(id: $Id) {
    id
    email
    firstName
    lastName
    country
    city
    street
    postalCode
    phoneNumber
    birthDay
    gender
    profileImg
    coverImg
    role
  }
}
    `;

export const useGetCustomerInfoQuery = <
      TData = GetCustomerInfoQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetCustomerInfoQueryVariables,
      options?: UseQueryOptions<GetCustomerInfoQuery, TError, TData>
    ) => {
    
    return useQuery<GetCustomerInfoQuery, TError, TData>(
      ['GetCustomerInfo', variables],
      fetcher<GetCustomerInfoQuery, GetCustomerInfoQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCustomerInfoDocument, variables),
      options
    )};

export const GetCustomerPastOrderItemsDocument = `
    query GetCustomerPastOrderItems($customerId: Int!) {
  getCustomerPastOrderItems(customerId: $customerId) {
    id
    quantity
    price
    status
    createdAt
    updatedAt
    product {
      id
      name
    }
  }
}
    `;

export const useGetCustomerPastOrderItemsQuery = <
      TData = GetCustomerPastOrderItemsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetCustomerPastOrderItemsQueryVariables,
      options?: UseQueryOptions<GetCustomerPastOrderItemsQuery, TError, TData>
    ) => {
    
    return useQuery<GetCustomerPastOrderItemsQuery, TError, TData>(
      ['GetCustomerPastOrderItems', variables],
      fetcher<GetCustomerPastOrderItemsQuery, GetCustomerPastOrderItemsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCustomerPastOrderItemsDocument, variables),
      options
    )};

export const GetShoppingCartDocument = `
    query GetShoppingCart {
  getShoppingCart {
    id
    totalAmount
    cartItems {
      id
      price
      quantity
      product {
        id
        name
        reference
        images
        price
        rating
        numberOfReviews
        category {
          name
        }
      }
    }
  }
}
    `;

export const useGetShoppingCartQuery = <
      TData = GetShoppingCartQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetShoppingCartQueryVariables,
      options?: UseQueryOptions<GetShoppingCartQuery, TError, TData>
    ) => {
    
    return useQuery<GetShoppingCartQuery, TError, TData>(
      variables === undefined ? ['GetShoppingCart'] : ['GetShoppingCart', variables],
      fetcher<GetShoppingCartQuery, GetShoppingCartQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetShoppingCartDocument, variables),
      options
    )};

export const CancelShoppingCartDocument = `
    mutation CancelShoppingCart {
  cancelShoppingCart
}
    `;

export const useCancelShoppingCartMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CancelShoppingCartMutation, TError, CancelShoppingCartMutationVariables, TContext>
    ) => {
    
    return useMutation<CancelShoppingCartMutation, TError, CancelShoppingCartMutationVariables, TContext>(
      ['CancelShoppingCart'],
      (variables?: CancelShoppingCartMutationVariables) => fetcher<CancelShoppingCartMutation, CancelShoppingCartMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CancelShoppingCartDocument, variables)(),
      options
    )};

export const GetParamUploadImageDocument = `
    query GetParamUploadImage($folder: String!) {
  getParamUploadImage(folder: $folder) {
    signature
    timestamp
    cloudName
    apiKey
  }
}
    `;

export const useGetParamUploadImageQuery = <
      TData = GetParamUploadImageQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetParamUploadImageQueryVariables,
      options?: UseQueryOptions<GetParamUploadImageQuery, TError, TData>
    ) => {
    
    return useQuery<GetParamUploadImageQuery, TError, TData>(
      ['GetParamUploadImage', variables],
      fetcher<GetParamUploadImageQuery, GetParamUploadImageQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetParamUploadImageDocument, variables),
      options
    )};

export const GetUsersDocument = `
    query GetUsers($input: usersFilter) {
  getUsers(input: $input) {
    users {
      id
      email
      firstName
      lastName
      country
      city
      street
      postalCode
      phoneNumber
      birthDay
      gender
      profileImg
      coverImg
      role
      isBlocked
    }
    totalCount
  }
}
    `;

export const useGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetUsersQueryVariables,
      options?: UseQueryOptions<GetUsersQuery, TError, TData>
    ) => {
    
    return useQuery<GetUsersQuery, TError, TData>(
      variables === undefined ? ['GetUsers'] : ['GetUsers', variables],
      fetcher<GetUsersQuery, GetUsersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUsersDocument, variables),
      options
    )};

export const GetWishListDocument = `
    query GetWishList {
  getWishList {
    id
    products {
      id
      name
      price
      images
      quantity
      category {
        id
        name
      }
      rating
    }
  }
}
    `;

export const useGetWishListQuery = <
      TData = GetWishListQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetWishListQueryVariables,
      options?: UseQueryOptions<GetWishListQuery, TError, TData>
    ) => {
    
    return useQuery<GetWishListQuery, TError, TData>(
      variables === undefined ? ['GetWishList'] : ['GetWishList', variables],
      fetcher<GetWishListQuery, GetWishListQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetWishListDocument, variables),
      options
    )};

export const AddProductToWishListDocument = `
    mutation AddProductToWishList($productId: Int!) {
  addProductToWishList(productId: $productId) {
    id
    products {
      id
    }
  }
}
    `;

export const useAddProductToWishListMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<AddProductToWishListMutation, TError, AddProductToWishListMutationVariables, TContext>
    ) => {
    
    return useMutation<AddProductToWishListMutation, TError, AddProductToWishListMutationVariables, TContext>(
      ['AddProductToWishList'],
      (variables?: AddProductToWishListMutationVariables) => fetcher<AddProductToWishListMutation, AddProductToWishListMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AddProductToWishListDocument, variables)(),
      options
    )};

export const DeleteProductFromWishListDocument = `
    mutation DeleteProductFromWishList($productId: Int!) {
  deleteProductFromWishList(productId: $productId)
}
    `;

export const useDeleteProductFromWishListMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<DeleteProductFromWishListMutation, TError, DeleteProductFromWishListMutationVariables, TContext>
    ) => {
    
    return useMutation<DeleteProductFromWishListMutation, TError, DeleteProductFromWishListMutationVariables, TContext>(
      ['DeleteProductFromWishList'],
      (variables?: DeleteProductFromWishListMutationVariables) => fetcher<DeleteProductFromWishListMutation, DeleteProductFromWishListMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, DeleteProductFromWishListDocument, variables)(),
      options
    )};

export const GetFilteredWishListDocument = `
    query GetFilteredWishList($input: ProductFilterInput) {
  getFilteredWishList(input: $input) {
    id
    name
    price
    rating
    quantity
    category {
      id
      name
    }
  }
}
    `;

export const useGetFilteredWishListQuery = <
      TData = GetFilteredWishListQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetFilteredWishListQueryVariables,
      options?: UseQueryOptions<GetFilteredWishListQuery, TError, TData>
    ) => {
    
    return useQuery<GetFilteredWishListQuery, TError, TData>(
      variables === undefined ? ['GetFilteredWishList'] : ['GetFilteredWishList', variables],
      fetcher<GetFilteredWishListQuery, GetFilteredWishListQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetFilteredWishListDocument, variables),
      options
    )};
