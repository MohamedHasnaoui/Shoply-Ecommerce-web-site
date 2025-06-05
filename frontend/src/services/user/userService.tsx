import { QueryOptions } from "@apollo/client";
import { GetUsersQuery, GetUsersQueryVariables, UsersFilter } from "../../generated";
import { GET_USERS } from "../../graphql/user.graphql";
import { client } from "../../graphqlProvider";

class UserService {
    async getUsers(input:UsersFilter){
        const options : QueryOptions<GetUsersQueryVariables,GetUsersQuery> = {
            variables:{input},
            query:GET_USERS
        }
        const response = await client.query(options);
        return response;
    }
}

export const userService = new UserService();