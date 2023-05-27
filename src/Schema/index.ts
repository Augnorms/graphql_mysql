import { GraphQLSchema, GraphQLObjectType, GraphQLFieldConfig } from 'graphql';
import { GET_ALL_USERS } from './Queries/get_all_users';
import { CREATE_USER } from './Mutations/create_users';
import { DELETE_USER } from './Mutations/delete_user';
import { UPDATE_USER } from './Mutations/update_user';
import { GET_USER_BY_ID } from './Queries/get_user_by_id';
import {AUTHENTICATE_USER} from './Queries/authentUsers'


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      getAllUsers: GET_ALL_USERS,
      getUserById: GET_USER_BY_ID,
    },
  });
  
  const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: CREATE_USER,
      deleteUser: DELETE_USER,
      updateUser: UPDATE_USER,
      authenticateUser:AUTHENTICATE_USER
    },
  });
  
  
  export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
  });