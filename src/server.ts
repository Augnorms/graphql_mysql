import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors'
import {DataSource} from 'typeorm' //used to establish conection to mysql databae
import { schema } from './Schema'
import { Users } from './Mysql_Entities/TableUsers' //table in the database called Users
import {Todo} from './Mysql_Entities/TableForToDo' //table in the database called Todo
import { Request } from 'express-serve-static-core';


const main = async() =>{

    //db connections using typorm
   const AppDataSource = new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "Microvelli@027",
        database: "graphql",
        logging:true,
        synchronize:false,      // set this to true to sync to the database then set back to false
        entities: [Users, Todo]      //after creating some entities import and initialize here
    })


    AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

/* -------------------------------------------- */    
   //middleware
    const app = express()
    app.use(cors())
    app.use(express.json())

     // Apollo Server setup
     const server = new ApolloServer({ schema });
     await server.start();

/* -------------------------------------------- */  

const authenticateToken = (req: Request) => {
  const authHeader = req.headers.authorization
  return authHeader;
};


   //this handles the graphql routes graph studio
  app.use('/graphiql', graphqlHTTP((req: any) => {

        const token = authenticateToken(req); // Authenticate for GraphiQL
    
        return {
          schema,
          graphiql: true,
          context: { token }, // Pass authenticated user to resolvers
        };
    })
  );

    //using apolloserver to handle graphql routes
  app.use('/apolloserver', expressMiddleware(server, {
      context: async ({ req }) => {
        const token = authenticateToken(req); // Authenticate for Apollo
        return { token }; // Pass authenticated user to resolvers
      },
    })
  );

    //this handles handles the graphql connection server
  app.listen(3002, ()=>{
        console.log("Server is running on port 3002")
  })
}

main().catch((err)=>console.log(err))