import { UserType } from "../Db_table_TypeDefs/UserTableDef";
import {GraphQLString, GraphQLID} from 'graphql'
import { Users } from "../../Mysql_Entities/TableUsers";


export const DELETE_USER = {
   type:UserType,
   args:{
        id: {type: GraphQLID},
   },
   async resolve(parent:any, args:any){
      const id = args.id;
      await Users.delete(id)
      return args
   }
}