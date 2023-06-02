import { GraphQLSchema, GraphQLObjectType, GraphQLFieldConfig } from 'graphql';
import { GET_ALL_USERS } from './Queries/get_all_users';
import { CREATE_USER } from './Mutations/create_users';
import { DELETE_USER } from './Mutations/delete_user';
import { UPDATE_USER } from './Mutations/update_user';
import { GET_USER_BY_ID } from './Queries/get_user_by_id';
import {AUTHENTICATE_USER} from './Queries/authentUsers'
import { RESET_PASSWORD } from './Mutations/reset_password';

import { CREATE_TODO } from './ToDoMutation/create_todo';
import { UPDATE_TODO } from './ToDoMutation/update_todo';
import { DELETE_TODO } from './ToDoMutation/delete_todo';
import { GET_ALL_TODOS } from './ToDoQueries/get_all_todolists';
import { GET_TODO_BY_ID } from './ToDoQueries/get_todo_by_id';


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      getAllUsers: GET_ALL_USERS,
      getUserById: GET_USER_BY_ID,

      get_all_todos:GET_ALL_TODOS,
      getTodoById:GET_TODO_BY_ID
    },
  });
  
  const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: CREATE_USER,
      deleteUser: DELETE_USER,
      updateUser: UPDATE_USER,
      authenticateUser:AUTHENTICATE_USER,
      resetPassword:RESET_PASSWORD, 

      createTodo:CREATE_TODO,
      updateTodo:UPDATE_TODO,
      deleteTodo:DELETE_TODO
    },
  });
  
  
  export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
  });