import { ListType } from '../Db_table_TypeDefs/ToDoList';
import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import { Todo } from '../../Mysql_Entities/TableForToDo';
import { FindOneOptions } from 'typeorm';  

export const GET_TODO_BY_ID = {
    type: ListType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(parent: any, args: { id?: string }) {
        const { id } = args;
        if (!id) {
          throw new Error('ID is required');
        }
        const parsedId = parseInt(id, 10); // Parse the ID as a number
        const options: FindOneOptions<Todo> = { where: { id: parsedId } };
        return await Todo.findOne(options);
    },
}