import { getDriver } from "@shared/mysql/mysql";
import { conflict, info, internalError } from "@shared/utils";
import { hashPassword } from "@shared/bcrypt/hashPassword";
import { getUser } from "../utils/getUser";
import { updateUser } from "../utils/updateUser";
import { Request, Response } from "express";

export const changePassword = async (req: Request, res: Response) => {
  const connection = getDriver();
  const { _token } = req.body;
  const password = await hashPassword(req.body.password);

  try {
    const userInfo = await getUser(connection, _token.usr);
    if (!userInfo) return conflict(res, `Your token is invalid`);

    userInfo.password = password;

    const updated = await updateUser(connection, userInfo, userInfo.username);

    info(`Password Updated !`);
    return res.status(200).json({ updated });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await connection.end();
  }
};
