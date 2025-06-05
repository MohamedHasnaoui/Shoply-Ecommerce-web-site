import { gql } from "@apollo/client";

export const GET_USERS = gql`
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
