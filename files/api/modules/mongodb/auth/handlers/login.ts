import { getDriver } from "@shared/mysql/mysql";
import { info, internalError, conflict } from "@shared/utils";
import { checkPassword } from "@shared/bcrypt/checkPassword";
import { getUser } from "@modules/user/utils/getUser";
import { Request, Response } from "express";
import { getAccessToken, getRefreshToken } from "@shared/jwt/jwt";

export const login = async (req: Request, res: Response) => {
  const connection = getDriver();
  const { username, password } = req.body;

  try {
    const userInfo = await getUser(connection, username);
    if (!userInfo)
      return conflict(res, `Credentials for (${username}) are incorrect`);
    const matchingPassword = userInfo.password;
    if (!matchingPassword)
      return conflict(res, `Credentials for (${username}) are incorrect`);
    const passwordMatch = await checkPassword(password, matchingPassword);
    if (!passwordMatch)
      return conflict(res, `Credentials for (${username}) are incorrect`);

    if (!userInfo.active)
      return conflict(
        res,
        `You must activate your account, check your emails !`
      );

    const accessToken = getAccessToken(
      `${req.protocol}://${req.get("host")}`,
      userInfo.username,
      false
    );

    const refreshToken = getRefreshToken(
      `${req.protocol}://${req.get("host")}`,
      userInfo.username,
      false
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    info(`User '${username}' logged in`);
    return res.status(200).json({ accessToken });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await connection.end();
  }
};
