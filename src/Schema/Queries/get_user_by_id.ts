import { UserType } from '../Db_table_TypeDefs/UserTableDef';
import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import { Users } from '../../Mysql_Entities/TableUsers';
import { FindOneOptions } from 'typeorm';

export const GET_USER_BY_ID = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent: any, args: { id?: string }) {
    const { id } = args;
    if (!id) {
      throw new Error('ID is required');
    }
    const parsedId = parseInt(id, 10); // Parse the ID as a number
    const options: FindOneOptions<Users> = { where: { id: parsedId } };
    return await Users.findOne(options);
  },
};
