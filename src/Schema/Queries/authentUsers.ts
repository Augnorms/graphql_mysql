import { Users } from '../../Mysql_Entities/TableUsers';
import { GraphQLString } from 'graphql';
import { Messages } from '../Db_table_TypeDefs/Mesaages';
import { comparePassword, generateToken } from '../../auth';

export const AUTHENTICATE_USER = {
  type: Messages,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, password } = args;

    const user = await Users.findOne({ where: { username } });

    if (!user || !(await comparePassword(password, user.password))) {
      return {
        success: false,
        Messages: 'Invalid username or password',
      };
    }

    const token = generateToken({ id: String(user.id) });

    return {
      success: true,
      Messages: 'Authentication successful',
      token,
    };
  },
};
