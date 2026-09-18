import pool from "../db/connection";


export async function getApplicationsService (userId:number) {

    const result =  await pool.query("SELECT * FROM applications WHERE user_id = $1",
        [userId]
    ) 
    return result.rows
 }


 
 
 
 export async function getApplicationByIDService (id:number , userId:number) {

    const result = await pool.query(` Select id,user_id, company, role, status, location,
        job_url,date_applied,notes ,created_at, updated_at
         From applications
        WHERE id = $1 and user_id = $2 ` ,
        [id,userId])

     return result.rows[0]

 }