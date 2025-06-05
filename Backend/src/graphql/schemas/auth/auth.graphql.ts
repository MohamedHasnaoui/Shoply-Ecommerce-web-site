import { gql } from "graphql-tag";
export const authSchema = gql`
  #graphql
  scalar DateTime
  enum Gender {
    MALE
    FEMALE
  }
  enum Role {
    ADMIN
    BUYER
    SELLER
  }
  enum TokenType {
    EMAIL
    PASSWORD
  }
  input SignupIpnut {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    role: Role!
  }
  input SignInInput {
    email: String!
    password: String!
  }
  input UpdateUserInput {
    firstName: String
    lastName: String
    country: String
    city: String
    street: String
    postalCode: String
    phoneNumber: String
    birthDay: DateTime
    gender: Gender
    profileImg: String
    coverImg: String
    password: String
  }
  type User {
    id: Int!
    email: String
    firstName: String
    lastName: String
    country: String
    city: String
    street: String
    postalCode: String
    phoneNumber: String
    birthDay: DateTime
    gender: Gender
    profileImg: String
    coverImg: String
    role: Role
    isBlocked: Boolean
  }
  type AuthResponse {
    user: User!
    jwt: String!
  }
  type JwtPayload {
    email: String!
    userId: Int!
  }
  input usersFilter {
    id: Int
    role: Role
    pageNb: Int
    pageSize: Int
    isBlocked: Boolean
  }
  type UserPaginationResult {
    users: [User!]!
    totalCount: Int!
  }
  type Query {
    currentUser: User
    getUserById(id: Int!): User!
    getUsers(input: usersFilter): UserPaginationResult!
  }
  type Mutation {
    signup(input: SignupIpnut!): Boolean!
    signin(input: SignInInput!): AuthResponse!
    VerificationEmailRequest(email: String!): Boolean!
    verifyEmail(email: String!, token: String!): Boolean!
    addResetPasswordRequest(email: String!): Boolean!
    resetPassword(userId: Int!, token: String!, password: String!): Boolean!
    updateUser(input: UpdateUserInput!): User!
  }
`;
