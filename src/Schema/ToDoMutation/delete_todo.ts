import { GraphQLID } from 'graphql';
import { Todo } from '../../Mysql_Entities/TableForToDo';
import { todoMessages } from '../Db_table_TypeDefs/ToDoMessages';

export const DELETE_TODO = {
    type:todoMessages,
    args:{
        id:{type:GraphQLID}
    },
    async resolve(parent:any, args:any){
        const id = args.id

        try{

            await Todo.delete(id)

            return {success:true, messages:'todo deleted successfully'}

        }catch(e:any){
            
            return {success:false, messages:'deletion unsuccessful'}

        }

    }
}