import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' });

// connectDb
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

/**
 * create users table
 */

export async function createUserTbl() {
  const connection = await pool.getConnection()
  try {
    await connection.query(
      `CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      );`
    )
    console.log('create users tbl')
  } catch (error) {
    console.error(error)
  } finally {
    connection.release()
  }
}

/**
 * create posts table
 */
export async function createPostTbl() {
  const connection = await pool.getConnection();
  try {
    await connection.execute(
      `CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        author VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );`)
  } catch (error) {
    console.error(error)
  }
}