import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

interface JwtArgs {
  username: string;
}

export const getToken = (args: JwtArgs) =>
  jwt.sign(args, JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: 90,
  });
