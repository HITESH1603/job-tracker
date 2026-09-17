import bcrypt from "bcrypt"
import pool from "../db/connection"
import jwt from "jsonwebtoken"

export async function registerService( name: string ,email: string , password: string){

 const passwordHash = await bcrypt.hash(password,10)
 

 const result = await pool.query(`INSERT INTO users(name,email,password_hash) VALUES ($1,$2,$3) 
               RETURNING id , name , email, created_at`,
                  [name,email,passwordHash]
    )


    return result.rows[0];
} 


export async function loginService(email:string , password: string){
    const result = await pool.query(`Select id ,name ,email ,password_hash
         FROM users
        WHERE email = $1`,
        [email])
    const user = result.rows[0]

     if(!user){
        return null
     }
     
     const isPasswordValid = await bcrypt.compare(password,user.password_hash)

     if(!isPasswordValid){
        return null
     }

     const token = jwt.sign(
        {userId : user.id},
        process.env.JWT_SECRET!,
        {expiresIn : "1h"}
     )

     return {
       user: {
        id: user.id,
        name: user.name,
        email: user.email,
       },
     token
      }
}