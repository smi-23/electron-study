import { Pool } from "mysql2/promise";

export default async function signup(pool: Pool, username: string, password: string, passwordCheck:string ) {
  const connection = await pool.getConnection()
  try {
    // check if password match 
    if (password !== passwordCheck) {
      console.log("password and comfirmation do not match")
      return {success: false, message: '비밀번호가 일치하지 않습니다.'}
    }

    // check if user already exists
    const [rows] = await connection.execute(`
        select * from users where username = ?
        `, [username])

    if (Array.isArray(rows) && rows.length > 0) {
      console.log("user already exists")
      return { success: false, message: '이미 존재하는 유저네임입니다.' }
    }

    // insert users to db
    await connection.execute(`
        insert into users (username, password) value (?, ?)
        `,
      [username, password])
    console.log('signup success')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, message: '회원가입 중 에러가 발생했습니다.' }
  } finally {
    connection.release()
  }
}
