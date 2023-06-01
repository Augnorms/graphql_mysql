import {GraphQLString} from 'graphql'
import { Todo } from '../../Mysql_Entities/TableForToDo'
import { todoMessages } from '../Db_table_TypeDefs/ToDoMessages'

export const CREATE_TODO = {
    type:todoMessages,
    args:{
        name:{type:GraphQLString},
        time:{type:GraphQLString}
    },
    async resolve(parent:any, args:any){
        const {name, time} = args

        try{

            await Todo.insert({
                name,
                time
            })

            return{success:true, messages:'todo created successfully'}

        }catch(e:any){

            return{success:false, messages:`todo creation unsuccessful ${e.message}`}
        }

    }
}