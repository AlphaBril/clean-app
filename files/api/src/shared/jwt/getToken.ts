import jwt from "jsonwebtoken";

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || "";

interface JwtArgs {
  username: string;
}

export const getToken = (args: JwtArgs) =>
  jwt.sign(args, JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: Date.now() + JWT_EXPIRATION_TIME,
  });
