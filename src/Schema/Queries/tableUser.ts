import {UserType} from '../Db_table_TypeDefs/User'
import {GraphQLList} from 'graphql'
import { Users } from '../../Mysql_Entities/TableUsers'


export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  async resolve(): Promise<Users[]> {
    return await Users.find();
  },
};
