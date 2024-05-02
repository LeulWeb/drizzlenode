import {drizzle} from 'drizzle-orm/mysql2'
import mysql from 'mysql2'


// check for connection

if(!process.env.DB_HOST){
    throw new Error("DB credential error")
}


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});


export const db = drizzle(connection)