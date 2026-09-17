import bcrypt from "bcrypt"
import pool from "../db/connection"

export async function registerService( name: string ,email: string , password: string){

 const passwordHash = await bcrypt.hash(password,10)
 

 const result = await pool.query(`INSERT INTO users(name,email,password_hash) VALUES ($1,$2,$3) 
               RETURNING id , name , email, created_at`,
                  [name,email,passwordHash]
    )


    return result.rows[0];
} 
