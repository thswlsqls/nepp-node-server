import connection from '../db/index.js';

export const getPostMain = async (req, res) => {
  const query = `
        SELECT post.*, user.user_name, user.profile_image,
        GROUP_CONCAT(image.url) AS imageList
        FROM post
        JOIN image ON image.post_id = post.id
        JOIN user ON user.id = post.user_id
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
