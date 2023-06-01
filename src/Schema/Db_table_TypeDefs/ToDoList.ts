import { GraphQLObjectType, GraphQLID, GraphQLString} from "graphql";

export const ListType = new GraphQLObjectType({
    name:"List",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        starttime:{type:GraphQLString},
        endtime:{type:GraphQLString},
        date:{type:GraphQLString}
    })
})