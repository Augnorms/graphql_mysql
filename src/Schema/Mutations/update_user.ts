import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { Users } from "../../Mysql_Entities/TableUsers";
import { Messages } from "../Db_table_TypeDefs/Mesaages";
import { hashPassword } from "../../auth";

export const UPDATE_USER = {
  type: Messages,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type:GraphQLString },
    password: { type: GraphQLString },
    passwordtwo: { type: GraphQLString },
  },
  
  async resolve(parent: any, args: any) {
    const { id, name, username, email, password, passwordtwo } = args;

    try {
      // Find the user by ID
      const user = await Users.findOne({ where: { id } });

      if (!user) {
        throw new Error("User does not exist");
      }

      // Update the user with the provided fields
      if (name) user.name = name;
      if (username) user.username = username;
      if (email) user.email = email;

      // Hash the passwords if provided
      if (password) user.password = await hashPassword(password);
      if (passwordtwo) user.passwordtwo = await hashPassword(passwordtwo);

      // Save the changes to the user entity
      await user.save();

      // Return a success message
      return { success: true, Messages: `User with ID ${id} updated successfully` };

    } catch (error:any) {
      // Return an error message
      return { success: false, Messages: `Failed to update user with ID ${id}: ${error.message}` };
    }
  },
};
