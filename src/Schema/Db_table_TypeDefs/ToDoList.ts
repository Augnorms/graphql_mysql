import { GraphQLObjectType, GraphQLID, GraphQLString} from "graphql";

export const ListType = new GraphQLObjectType({
    name:"List",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        time:{type:GraphQLString}
    })
})