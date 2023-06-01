import {GraphQLString} from 'graphql'
import { Todo } from '../../Mysql_Entities/TableForToDo'
import { todoMessages } from '../Db_table_TypeDefs/ToDoMessages'

export const CREATE_TODO = {
    type:todoMessages,
    args:{
        name:{type:GraphQLString},
        starttime:{type:GraphQLString},
        endtime:{type:GraphQLString},
        date:{type:GraphQLString}
     },
    async resolve(parent:any, args:any){
        const {name, starttime, endtime, date} = args

        try{

            await Todo.insert({
                name,
                starttime,
                endtime,
                date
            })

            return{success:true, messages:'todo created successfully'}

        }catch(e:any){

            return{success:false, messages:`todo creation unsuccessful ${e.message}`}
        }

    }
}