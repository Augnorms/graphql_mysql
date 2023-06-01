import { ListType } from "../Db_table_TypeDefs/ToDoList";
import { GraphQLList } from "graphql";
import { Todo } from "../../Mysql_Entities/TableForToDo";


export const GET_ALL_TODOS = {
    type:GraphQLList(ListType),
    async resolve():Promise<Todo[]>{
      return await Todo.find()
    }
}