import { getDriver } from "@shared/mysql/mysql";
import { conflict, info, internalError } from "@shared/utils";
import { getUser } from "../utils/getUser";
import { updateUser } from "../utils/updateUser";
import { Request, Response } from "express";

export const activateUser = async (req: Request, res: Response) => {
  const connection = getDriver();
  const { _token } = req.body;

  try {
    if (!_token) return conflict(res, `Your token is invalid`);
    const userInfo = await getUser(connection, _token.usr);
    if (!userInfo) return conflict(res, `Your token is invalid`);
    userInfo.active = true;
    const updated = await updateUser(connection, userInfo, userInfo.username);

    info(`User activated !`);
    return res.status(200).json({ updated });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await connection.end();
  }
};
