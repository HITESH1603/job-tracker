import pool from "../db/connection";

export async function getApplicationsService () {
    const result =  await pool.query("SELECT * FROM applications") 
    return result
 }