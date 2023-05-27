import { GraphQLID} from 'graphql'
import { Users } from "../../Mysql_Entities/TableUsers";
import { Messages } from "../Db_table_TypeDefs/Mesaages";


export const DELETE_USER = {
   type:Messages,
   args:{
        id: {type: GraphQLID},
   },
   async resolve(parent:any, args:any){
      const id = args.id;
      await Users.delete(id)

      return {success:true, Messages:`${id} has been deleted successfully`}
   }
}