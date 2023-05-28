import { GraphQLString } from 'graphql';
import { Users } from '../../Mysql_Entities/TableUsers';
import { Messages } from '../Db_table_TypeDefs/Mesaages';
import { hashPassword } from '../../auth';

export const CREATE_USER = {
  type: Messages,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email:{type: GraphQLString},
    password: { type: GraphQLString },
    passwordtwo: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name, username, email, password, passwordtwo } = args;

    try {
      // Hash the passwords
      const hashedPassword = await hashPassword(password);
      const hashedPasswordTwo = await hashPassword(passwordtwo);

      // Creating users in the table
      await Users.insert({
        name,
        username,
        email,
        password: hashedPassword,
        passwordtwo: hashedPasswordTwo,
      });

      return { success: true, Messages: `User with the name ${name} created successfully` };

    } catch (error:any) {

      return { success: false, Messages: `Failed to create user: ${error.message}` };
    }
  },
};
