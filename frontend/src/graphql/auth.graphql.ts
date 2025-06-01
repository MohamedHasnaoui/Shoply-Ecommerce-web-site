import { gql } from "@apollo/client";

export const SIGNIN_MUTATION = gql`
  #graphql
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

export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupIpnut!) {
    signup(input: $input)
  }
`;

export const GET_CURRENT_USER = gql`
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

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($email: String!, $token: String!) {
    verifyEmail(email: $email, token: $token)
  }
`;

export const VERIFY_EMAIL_REQUEST = gql`
  mutation VerificationEmailRequest($email: String!) {
    VerificationEmailRequest(email: $email)
  }
`;
export const UPDATE_USER = gql`
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
