import { pool } from "../db";

/**
 * Creates a new post in the database.
 *
 * @param {string} user_id - The ID of the user creating the post (used as foreign key).
 * @param {string} username - The username of the author.
 * @param {string} title - The title of the post.
 * @param {string} content - The content/body of the post.
 * @returns {Promise<{ success: boolean; message?: string }>} Operation result.
 */
export async function createPost(user_id: string, username: string, title: string, content: string) {
  const connection = await pool.getConnection()
  try {
    // 토큰방식으로 변경한다면 유저정보를 찾아야 할지도 모름
    await connection.execute(`
      insert into posts (author, title, content, user_id) values (?, ?, ?, ?)`,
      [username, title, content, user_id])

    console.log('post created')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false, message: "게시글 작성 중 에러가 발생했습니다." }
  } finally {
    connection.release()
  }
}

export async function getAllPost() {
  const connection = await pool.getConnection()
  try {
    const [rows] = await connection.execute(`select id, author, title, content, created_at from posts`)
    
    // 게시글이 0개인 경우 프론트에서 백에서 어떻게 처리할지 고민하기
    if(rows.length === 0) {
      console.log("posts do not exist")
      return {success: }
    }
  } catch (error) {
    console.error(error)
    return { success: false, message: "전체 게시글 조회 중 에러가 발생했습니다." }
  }
  finally { connection.release() }
}