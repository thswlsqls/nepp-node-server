import conn from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY as secretKey } from '../config/index.js';

export const postUser = async (req, res) => {
  // 회원가입 폼에 사용자가 입력한 정보들을 구조분해 할당함
  const { userName, password, name } = req.body;

  // 사용자의 userName이 데이터베이스에 존재하는지 검사함
  const query = `SELECT id FROM user WHERE user_name = '${userName}';`;
  // query는 조건에 맞는 단수 또는 복수개의 row객체들(rows객체)을 반환함
  const [rows] = await conn.query(query);

  // 조회된 사용자 아이디 행이 있으면, 회원가입 실패 메시지를 응답함
  if (rows.length) {
    return res.send({
      success: false,
      message: '중복되는 아이디가 존재합니다.',
    });
  }

  // 비밀번호 암호화에 사용되는 salt를 생성함
  const salt = await bcrypt.genSalt(10);
  // 사용자가 입력한 비밀번호 원문과 랜덤하게 생성된 salt값을 사용하여 암호화함
  const hashedPW = await bcrypt.hash(password, salt);

  // user테이블의 user_name, password, salt, name컬럼의 값에 각각 userName, hashedPW, salt, name값을 insert함(데이터베이스에 저장함)
  const query2 = `
    INSERT INTO user(user_name, password, salt, name)
    VALUES('${userName}', '${hashedPW}', '${salt}', '${name}');
  `;
  await conn.query(query2);

  // 이상 명령에 오류가 없을 시, 성공 값을 응답함
  res.send({ success: true });
};

export const postUserLogin = async (req, res) => {
  // 1. userName으로 db에 해당하는 유저가 있는지 찾는다
  // 2-1. 없으면 return false;
  // 2-2. 있으면 해당하는 user의 salt와 받아온 password로
  //      회원가입할때와 같은 방법으로 암호화된 비밀번호를 생성한다
  // 3. 암호화된 비밀번호와 아이디가 일치하는 유저를 찾는다
  // 4-1. 없으면 비밀번호 틀림.
  // 4-2. 있으면 로그인성공. 토큰을 생성하여 클라이언트에 보내준다.

  // 로그인 페이지에서 사용자가 입력한 userName과 password를 구조분해 할당함
  const { userName, password } = req.body;

  // 데이터베이스에게 로그인 요청한 사용자의 salt값을 조회함
  const query1 = `
    SELECT salt FROM user WHERE user_name = '${userName}';
  `;

  // 해당하는 행을 users 변수에 저장함
  const [users] = await conn.query(query1);
  // 만약 해당하는 사용자의 salt값을 조회하지 못했으면,
  if (users.length === 0) {
    // 로그인 실패 메시지를 응답함
    return res.send({ success: false, message: '해당하는 유저가 없습니다.' });
  }

  // 조회한 데이터 행의 첫번째 필드, salt 값을 구조분해 할당함
  const { salt } = users[0];
  // 암호화된 비밀번호 값을 생성함
  const hashedPW = await bcrypt.hash(password, salt);

  // 아이디 - 비밀번호 검증
  // 데이터베이스에 저장된 암호화된 비밀번호와 사용자가 입력한 값이 매칭되는 데이터 행을 조회함
  const query2 = `
    SELECT id FROM user WHERE user_name='${userName}' AND password='${hashedPW}';
  `;
  const [rows] = await conn.query(query2);
  const user = rows[0];
  // 사용자 데이터가 조회되지 않으면,
  if (!user) {
    // 로그인 실패 메시지를 응답함
    return res.send({ success: false, message: '비밀번호가 틀렸습니다.' });
  }

  // 토큰 생성
  const payload = { userId: user.id };
  const option = { expiresIn: '1h' };
  // 사용자의 아이디, config폴더에 상수로 저장한 값으로 토큰을 생성하고 만기시간을 10초로 설정함
  const token = jwt.sign(payload, secretKey, option);

  // 이상 명령에 오류가 없으면 로그인 성공 메시지와 토큰을 응답함
  res.send({ success: true, token });
};
