import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
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
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
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
  updateReview: Review;
  updateUser: User;
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


export type MutationUpdateReviewArgs = {
  input: UpdateReviewInput;
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
  category: Category;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  quantity: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
  reference: Scalars['String']['output'];
};

export type ProductFilter = {
  available?: InputMaybe<Scalars['Boolean']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pageNb?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
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
  getAllCartItems?: Maybe<Array<Maybe<CartItem>>>;
  getAllCategories?: Maybe<Array<Maybe<Category>>>;
  getAllMyProducts: ProductListResult;
  getAllProducts: ProductListResult;
  getCartItem: CartItem;
  getCategory?: Maybe<Category>;
  getMyOrders?: Maybe<Array<Maybe<Order>>>;
  getMyProductsStatistics: ProductsStatistics;
  getOrder: Order;
  getOrderItem: OrderItem;
  getOrderItemsByOrderId: Array<Maybe<OrderItem>>;
  getOrderItemsForSeller: Array<Maybe<OrderItem>>;
  getParamUploadImage: UploadCloud;
  getProduct: Product;
  getReviewsByProductId?: Maybe<Array<Maybe<Review>>>;
  getShoppingCart?: Maybe<ShoppingCart>;
  getWishList: WishList;
};


export type QueryGetAllMyProductsArgs = {
  input?: InputMaybe<ProductFilter>;
};


export type QueryGetAllProductsArgs = {
  input?: InputMaybe<ProductFilter>;
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
  OrderItemId: Scalars['Int']['input'];
};


export type QueryGetOrderItemsByOrderIdArgs = {
  orderId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetParamUploadImageArgs = {
  folder: Scalars['String']['input'];
};


export type QueryGetProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetReviewsByProductIdArgs = {
  productId: Scalars['Int']['input'];
};

export type Review = {
  __typename?: 'Review';
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  product: Product;
  rating: Scalars['Int']['output'];
  reviewer: User;
  updatedAt: Scalars['DateTime']['output'];
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
  comment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  productId?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
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

export type UploadCloud = {
  __typename?: 'UploadCloud';
  apiKey: Scalars['String']['output'];
  cloudName: Scalars['String']['output'];
  signature: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
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

export type SigninMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'AuthResponse', jwt: string, user: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string, address?: string | null, phoneNumber?: string | null, birthDay?: any | null, gender?: Gender | null, profileImg?: string | null, coverImg?: string | null, role?: Role | null } } };

export type SignupMutationVariables = Exact<{
  input: SignupIpnut;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: boolean };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string, address?: string | null, phoneNumber?: string | null, birthDay?: any | null, gender?: Gender | null, profileImg?: string | null, coverImg?: string | null, role?: Role | null } | null };

export type VerifyEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: boolean };

export type VerificationEmailRequestMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type VerificationEmailRequestMutation = { __typename?: 'Mutation', VerificationEmailRequest: boolean };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories?: Array<{ __typename?: 'Category', id?: number | null, name?: string | null } | null> | null };

export type GetProductsByCategoryQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
  pageNb?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetProductsByCategoryQuery = { __typename?: 'Query', getProductsByCategory?: Array<{ __typename?: 'Product', id: number, name: string, reference: string, images: Array<string>, rating: number, quantity: number, price: number } | null> | null };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct?: { __typename?: 'Product', id: number, name: string, reference: string, images: Array<string>, rating: number, description: string, quantity: number, price: number, createdAt: any, category: { __typename?: 'Category', id?: number | null } } | null };

export type UpdateProductMutationVariables = Exact<{
  input: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct?: { __typename?: 'Product', id: number, name: string, reference: string, images: Array<string>, rating: number, description: string, quantity: number, price: number, createdAt: any, category: { __typename?: 'Category', id?: number | null } } | null };

export type GetProductQueryVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', getProduct: { __typename?: 'Product', id: number, name: string, reference: string, images: Array<string>, rating: number, description: string, quantity: number, price: number, createdAt: any, category: { __typename?: 'Category', id?: number | null, name?: string | null } } };

export type GetAllMyProductsQueryVariables = Exact<{
  input?: InputMaybe<ProductFilter>;
}>;


export type GetAllMyProductsQuery = { __typename?: 'Query', getAllMyProducts: { __typename?: 'ProductListResult', count: number, products: Array<{ __typename?: 'Product', id: number, name: string, reference: string, images: Array<string>, rating: number, description: string, quantity: number, price: number, createdAt: any, category: { __typename?: 'Category', name?: string | null } }> } };

export type GetMyProductsStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProductsStatisticsQuery = { __typename?: 'Query', getMyProductsStatistics: { __typename?: 'ProductsStatistics', countAvailable: number, countOutOfStock: number } };

export type RemoveProductMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type RemoveProductMutation = { __typename?: 'Mutation', removeProduct: boolean };

export type GetParamUploadImageQueryVariables = Exact<{
  folder: Scalars['String']['input'];
}>;


export type GetParamUploadImageQuery = { __typename?: 'Query', getParamUploadImage: { __typename?: 'UploadCloud', signature: string, timestamp: number, cloudName: string, apiKey: string } };



export const SigninDocument = `
    mutation Signin($input: SignInInput!) {
  signin(input: $input) {
    user {
      id
      email
      firstName
      lastName
      address
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
    address
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

export const GetAllCategoriesDocument = `
    query GetAllCategories {
  getAllCategories {
    id
    name
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

export const GetProductsByCategoryDocument = `
    query GetProductsByCategory($categoryId: Int!, $pageNb: Int, $pageSize: Int) {
  getProductsByCategory(
    categoryId: $categoryId
    pageNb: $pageNb
    pageSize: $pageSize
  ) {
    id
    name
    reference
    images
    rating
    quantity
    price
  }
}
    `;

export const useGetProductsByCategoryQuery = <
      TData = GetProductsByCategoryQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetProductsByCategoryQueryVariables,
      options?: UseQueryOptions<GetProductsByCategoryQuery, TError, TData>
    ) => {
    
    return useQuery<GetProductsByCategoryQuery, TError, TData>(
      ['GetProductsByCategory', variables],
      fetcher<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetProductsByCategoryDocument, variables),
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
