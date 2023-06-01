import {GraphQLObjectType, GraphQLString, GraphQLBoolean} from 'graphql'

export const todoMessages = new GraphQLObjectType({
    name:"todomessages",

    fields:()=>({
        success:{type:GraphQLBoolean},
        messages:{type:GraphQLString}
    })

})