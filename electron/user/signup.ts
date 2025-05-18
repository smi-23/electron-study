import { Pool } from "mysql2/promise";

export async function signup(pool: Pool, username: string, password: string, passwordCheck:string ) {
  const connection = await pool.getConnection()
  try {
    // check if password match 
    if (password !== passwordCheck) {
      console.log("password !== passwordCheck")
      return {success: false}
    }

    // check if user already exists
    const [rows] = await connection.execute(`
        select * from users where username = ?
        `, [username])

    if (Array.isArray(rows) && rows.length > 0) {
      console.log("this user already exists")
      return { success: false }
    }

    // insert users to db
    await connection.execute(`
        insert into users (username, password) value (?, ?)
        `,
      [username, password])
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  } finally {
    connection.release()
  }
}
