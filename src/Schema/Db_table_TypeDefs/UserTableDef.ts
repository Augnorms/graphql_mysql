import {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLScalarType} from 'graphql'

export const UserType = new GraphQLObjectType({
    name:"User",
    fields:()=>({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        username:{type: GraphQLString},
        email:{type: GraphQLString},
        password:{type: GraphQLString},
        passwordtwo:{type: GraphQLString}
    })
})