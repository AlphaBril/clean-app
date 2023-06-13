import { info, internalError, unauthorized } from "@shared/utils";
import { Request, Response } from "express";
import { getUser } from "@modules/user/utils/getUser";
import { getClient } from "@shared/postgres/postgres";
import { getAccessToken, verifyToken } from "@shared/jwt/jwt";

export const refresh = async (req: Request, res: Response) => {
  const connection = getClient();
  await connection.connect();
  const cookies = req.cookies;

  if (!cookies || !cookies.jwt) return unauthorized(res, `Unauthorized`);

  const refreshToken = cookies.jwt;
  try {
    const decoded = verifyToken(refreshToken);
    if (typeof decoded !== "string") {
      const userInfo = await getUser(connection, decoded.usr);
      if (!userInfo) return unauthorized(res, "Unauthorized");
      const accessToken = getAccessToken(
        `${req.protocol}://${req.get("host")}`,
        userInfo.username,
        false
      );
      info(`Token refreshed for ${userInfo.username}`);
      return res.status(200).json({ accessToken });
    }
    return unauthorized(res, "Unauthorized");
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await connection.end();
  }
};
