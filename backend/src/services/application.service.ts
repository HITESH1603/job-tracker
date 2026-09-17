import pool from "../db/connection";


export async function getApplicationsService () {

    const result =  await pool.query("SELECT * FROM applications") 
    return result.rows
 }


 export async function getApplicationByIDService (id:number) {

    const result = await pool.query(" Select id, name, email, created_at, updated_at From applications WHERE id = $1 " ,
        [id])

     return result.rows[0]

 }