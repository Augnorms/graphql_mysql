import {GraphQLSchema, GraphQLObjectType} from 'graphql'
import {GET_ALL_USERS } from './Queries/get_all_users'
import { CREATE_USER } from './Mutations/create_users'

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields: {
        getAllUsers:GET_ALL_USERS
    },
})

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields: {
        createUser:CREATE_USER
    },
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})