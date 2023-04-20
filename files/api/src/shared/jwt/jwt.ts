import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || "";

interface JwtArgs {
  iss: string;
  usr: string;
  admin: boolean;
  sub: number;
}

export const getAccessToken = (host: string, usr: string, admin: boolean) =>
  jwt.sign(
    {
      iss: host,
      usr,
      admin,
    } as JwtArgs,
    ACCESS_TOKEN_SECRET,
    {
      algorithm: "HS512",
      expiresIn: "10s",
    }
  );

export const getRefreshToken = (host: string, usr: string, admin: boolean) =>
  jwt.sign(
    {
      iss: host,
      usr,
      admin,
    } as JwtArgs,
    REFRESH_TOKEN_SECRET,
    {
      algorithm: "HS512",
      expiresIn: "1d",
    }
  );

export const verifyToken = (refreshToken: string) =>
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
