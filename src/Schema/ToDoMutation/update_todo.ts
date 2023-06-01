import {GraphQLString, GraphQLNonNull, GraphQLID} from 'graphql'
import { Todo } from '../../Mysql_Entities/TableForToDo'
import { todoMessages } from '../Db_table_TypeDefs/ToDoMessages'

export const UPDATE_TODO = {
    type: todoMessages,
    args:{
      id:{type:new GraphQLNonNull(GraphQLID)},
      name:{type:GraphQLString},
      starttime:{type:GraphQLString},
      endtime:{type:GraphQLString},
      date:{type:GraphQLString}
    },
    async resolve(parent:any, args:any){

        const {id, name, starttime, endtime, date} = args

        try{

            const todo = await Todo.findOne({where:{id}})

            if(!todo)return{messages:"no todo available"}

            if(name) todo.name = name
            if(starttime) todo.starttime = starttime
            if(endtime) todo.endtime = endtime
            if(date) todo.date = date

            await todo.save()

            return{success:true, messages:'todo updated successfully'}

        }catch(e:any){
            return{success:false, messages:'tupdate unsuccessful'}
        }

    }
}