import {GraphQLObjectType, GraphQLString, GraphQLBoolean} from 'graphql'

export const Messages = new GraphQLObjectType({
    name:"Message",
    fields:()=>({
        success:{type: GraphQLBoolean},
        failure:{type: GraphQLBoolean},
        Messages:{type: GraphQLString},
        token: { type: GraphQLString }
    })
})