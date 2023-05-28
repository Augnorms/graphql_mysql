import { GraphQLNonNull, GraphQLString } from 'graphql';
import { UserType } from '../Db_table_TypeDefs/UserTableDef';
import { Users } from '../../Mysql_Entities/TableUsers';
import { comparePassword, hashPassword } from '../../auth';
import { sendPasswordResetEmail } from '../../mailer';
import { FindOneOptions } from 'typeorm';


export const RESET_PASSWORD = {
    type: UserType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      newPassword: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(_: any, { email, newPassword }: any) {

      // Retrieve the user from the database based on the provided email
      const findOptions: FindOneOptions<Users> = {
        where: { email },
      };
      const user = await Users.findOne(findOptions);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Generate a hashed password for the new password
      const hashedPassword = await hashPassword(newPassword);
  
      // Update the user's password in the database
      user.password = hashedPassword;
      await user.save();
  
      // Send a password reset confirmation email to the user
      const resetEmail = 'https://example.com/reset-confirmation'; // Replace with your password reset confirmation URL
      
      await sendPasswordResetEmail(user.email, resetEmail);
  
      // Return the updated user object
      return user;
    },
  };
  