import connection from '../db/index.js';
import { verifyToken } from '../helper/user.js';

export const getPostMain = async (req, res) => {
  const token = req.headers.authorization;
  const jwtResult = verifyToken(token);
  if (!jwtResult) {
    return res.send({ success: false });
  }
  const userId = jwtResult.userId;

  const query = `
        SELECT post.*, user.user_name, user.profile_image,
        GROUP_CONCAT(image.url) AS imageList
        FROM post
        JOIN image ON image.post_id = post.id
        JOIN user ON user.id = post.user_id
        WHERE post.user_id = ${userId}
        GROUP BY post.id
        ORDER BY post.created_at DESC;
    `;
  const [rows] = await connection.query(query);
  console.log(rows);
  const postList = rows.map((post) => {
    const imageList = post.imageList.split(',');
    return { ...post, imageList };
  });
  res.send({ success: true, postList });
};

export const postPost = async (req, res) => {
  // 1. 토큰으로 누가 올린 포스트인지 확인
  // 2. content와 userId로 포스트 생성
  // 3. 2에서 생성한 post_id로 urlList에온 이미지들을 생성
  const token = req.headers.authorization;
  const jwtResult = verifyToken(token);
  if (!jwtResult) {
    return res.send({ success: false });
  }
  const userId = jwtResult.userId;

  const { content, imageList } = req.body;
  const query1 = `
    INSERT INTO post(user_id, content) VALUES(${userId}, '${content}');
  `;
  const [newPost] = await connection.query(query1);

  const postId = newPost.insertId;
  const promiseList = imageList.map((url) => {
    const query2 = `
        INSERT INTO image(post_id, url) VALUES(${postId}, '${url}')
    `;
    return connection.query(query2);
  });
  await Promise.all(promiseList);
  return res.send({ success: true });
};
