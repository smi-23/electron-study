import { RowDataPacket } from "mysql2";
import { pool } from "../db"

export default async function login(username: string, password: string) {
  const connection = await pool.getConnection()
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(`select id, username, password from users where username = ?`, [username])

    // check if user exists
    if (!Array.isArray(rows) || rows.length === 0) {
      console.log("user not found")
      return { success: false, message: '존재하지 않는 유저입니다.' }
    }

    // check password match
    if (password !== rows[0].password) {
      console.log('password incorrect')
      return { success: false, message: '비밀번호가 틀렸습니다.' }
    }

    console.log('login success')
    const user = rows[0]
    return { success: true, user_info: { user_id: user.id, username: user.username } }
  } catch (error) {
    console.error(error)
    return { success: false, message: '로그인 중 에러가 발생했습니다.' }
  } finally {
    connection.release()
  }
}