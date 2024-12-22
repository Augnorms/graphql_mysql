import { GraphQLString } from 'graphql';
import { Users } from '../../Mysql_Entities/TableUsers';
import { Messages } from '../Db_table_TypeDefs/Mesaages';
import { hashPassword } from '../../auth';

export const CREATE_USER = {
  type: Messages,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    passwordtwo: { type: GraphQLString },
  },
  async resolve(_parent: any, args: any, context: any) {

    try {

      if(context.token) throw new Error("unathorized: not authorised to access this endpoint")

      const { name, username, email, password, passwordtwo } = args;
      // Check if the email already exists
      const existingUser = await Users.findOne({ where: { email } });

      if (existingUser) {
        return {
          success: false,
          Messages: `User with the email ${email} already exists.`,
        };
      }

      // Hash the passwords
      const hashedPassword = await hashPassword(password);
      const hashedPasswordTwo = await hashPassword(passwordtwo);

      // Insert the new user into the database
      await Users.insert({
        name,
        username,
        email,
        password: hashedPassword,
        passwordtwo: hashedPasswordTwo,
      });

      return {
        success: true,
        Messages: `User with the name ${name} created successfully.`,
      };

    } catch (error: any) {
      return {
        success: false,
        Messages: `Failed to create user: ${error.message}`,
      };
    }
  },
};
