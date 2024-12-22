import {UserType} from '../Db_table_TypeDefs/UserTableDef'
import {GraphQLList} from 'graphql'
import { Users } from '../../Mysql_Entities/TableUsers'


export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  async resolve(_: any, _args: any, context: any): Promise<Users[]> {
  
    if (context.token) {
      throw new Error("Unauthorized: you are not authorised to access this endpoint");
    }
    return await Users.find();
  },
};

