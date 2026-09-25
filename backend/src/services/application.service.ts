import pool from "../db/connection";


export async function getApplicationsService (userId:number, status?:string, search?:string, 
                                               sortBy: string = "created_at", order:string = "desc",
                                               page:number = 1, limit:number = 10) {

     const offset = (page-1)* limit;

     const sortColumns : Record<string,string> = {
        company: "company",
        role: "role",
        created_at: "created_at",
        updated_at: "updated_at",
        status: "status",
        date_applied: "date_applied"
     };

     const sortColumn = sortColumns[sortBy] ?? "created_at";
     const sortOrder = order === "asc" ? "ASC" : "DESC";

     const conditions: string[] = ["user_id= $1"];
     const values: unknown[] = [userId];

    if(status) {
        conditions.push(`status = $${values.length+1}`);
        values.push(status);
    }

    if(search){
        conditions.push(`(
            company ILIKE $${values.length+1}
         OR role ILIKE $${values.length+1})`);
        values.push(`%${search}%`);
    }
       

    const limitPlaceholder = values.length +1 ;
    values.push(limit);

    const offsetPlaceholder = values.length + 1;
       values.push(offset); 

    const result = await pool.query(
        ` SELECT id, user_id, company, role, status, location,
          job_url, date_applied, notes, created_at, updated_at
          FROM applications
          WHERE ${conditions.join(" AND ")}
          ORDER BY ${sortColumn} ${sortOrder}
          LIMIT $${limitPlaceholder}
          OFFSET $${offsetPlaceholder} `,
         values);

         return result.rows;
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




 export async function updateApplicationService (applicationId: number, userId: number, updates: Record<string,unknown>) {

            const allowedFields = ["company", "role", "status", "location", "job_url", "date_applied", "notes" ];

            const fields: string[] = [];
            const values: unknown[] = [];

            for(const field of allowedFields){
                if(field in updates){
                    fields.push(`${field} = $${values.length + 1}`);
                    values.push(updates[field]);
                }
            }

            fields.push("updated_at = NOW()");

            values.push(applicationId);

            values.push(userId);

            const result = await pool.query(`UPDATE applications SET ${fields.join(" ,")} 
                                            WHERE id = $${values.length-1} AND user_id = $${values.length}
                                            RETURNING id, user_id, company, role, status, location,
                                             job_url, date_applied, notes, created_at, updated_at`,
                                             values);

            
             return result.rows[0];
 }



 export async function deleteApplicationService(applicationId:number, userId:number){
              const result = await pool.query(`DELETE FROM applications WHERE id = $1 AND user_id = $2 RETURNING id `,
                [applicationId,userId]
              ) ;
              
              return result.rows[0];
 }