import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
const JWT_ISS = process.env.JWT_ISS || "";
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || "15m";

interface JwtArgs {
  iss: string;
  usr: string;
  admin: boolean;
  sub: number;
}

export const getToken = (id: number, usr: string, admin: boolean) =>
  jwt.sign(
    {
      iss: JWT_ISS,
      usr,
      admin,
      sub: id,
    } as JwtArgs,
    JWT_SECRET_KEY,
    {
      algorithm: "HS512",
      expiresIn: JWT_EXPIRATION_TIME,
    }
  );
