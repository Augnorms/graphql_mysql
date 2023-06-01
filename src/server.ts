import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import cors from 'cors'
import {DataSource} from 'typeorm' //used to establish conection to mysql databae
import { schema } from './Schema'
import { Users } from './Mysql_Entities/TableUsers' //table in the database called Users
import {Todo} from './Mysql_Entities/TableForToDo'



const main = async() =>{

    //db connections using typorm
   const AppDataSource = new DataSource({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "Password@1",
        database: "graphql",
        logging:true,
        synchronize:false,      // set this to true to sync to the database then set back to false
        entities: [Todo]      //after creating some entities import and initialize here
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

/* -------------------------------------------- */   
   

   //this handles the graphql routes
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql:true,
    })) 


    //this handles handles the graphql connection server
    app.listen(3002, ()=>{
        console.log("Server is running on port 3002")
    })
}

main().catch((err)=>console.log(err))