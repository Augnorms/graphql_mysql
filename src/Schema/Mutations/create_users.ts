import { UserType } from "../Db_table_TypeDefs/User";
import {GraphQLString} from 'graphql'
import { Users } from "../../Mysql_Entities/TableUsers";


export const CREATE_USER = {
    type:UserType,
    args:{
        name:{type: GraphQLString},
        username:{type: GraphQLString},
        password:{type: GraphQLString}
    },
    async resolve(parent:any, args:any){
         const {name, username, password} = args
    
          //creating users in table
          await Users.insert(args)  

         return args
    }
}