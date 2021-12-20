import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY as secretKey } from "../config/index.js";

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    console.log(e);
    return false;
  }
};
