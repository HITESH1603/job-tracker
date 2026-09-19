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


 export async function createApplicationService(
              userId: number,
              company: string,
              role: string,
              status: string,
              location?: string,
              job_url?: string,
              date_applied?: string,
              notes?: string
 ) {
    const result = await pool.query(`INSERT INTO applications
                                      (user_id, company, role, status, location, job_url ,date_applied, notes)
                                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                                      RETURNING id, user_id, company, role, status, location, job_url, date_applied, notes, created_at, updated_at`,
                                     [userId, company, role, status, location, job_url, date_applied, notes]);

        return result.rows[0];
 }


