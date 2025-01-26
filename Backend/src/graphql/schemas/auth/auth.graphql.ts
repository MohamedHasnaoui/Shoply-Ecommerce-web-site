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
  type User {
    id: Int!
    email: String!
    firstName: String!
    lastName: String!
    address: String
    phoneNumber: String
    birthDay: DateTime
    gender: Gender
    profileImg: String
    coverImg: String
    role: Role
  }
  type AuthResponse {
    user: User!
    jwt: String!
  }
  type JwtPayload {
    email: String!
    userId: Int!
  }
  type Query {
    currentUser: User
  }
  type Mutation {
    signup(input: SignupIpnut!): AuthResponse!
    signin(input: SignInInput!): AuthResponse!
  }
`;
