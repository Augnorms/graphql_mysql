import { UserType } from "../Db_table_TypeDefs/UserTableDef";
import { GraphQLString, GraphQLID } from 'graphql'
import { Users } from "../../Mysql_Entities/TableUsers";



export const UPDATE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { id, name, username, password } = args;

    // Find the user by ID
    const user = await Users.findOne({ where: { id } });

    if (!user) {
    //   if user does not exist create one at  that index
      await Users.insert({id, name, username, password})

    }else{

        // Update the user
        user.name = name;
        user.username = username;
        user.password = password;
        await user.save();

    }

    

    return user;
  }
};
