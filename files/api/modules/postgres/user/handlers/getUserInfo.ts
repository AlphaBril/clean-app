import { getClient } from "@shared/postgres/postgres";
import { info, internalError } from "@shared/utils";
import { Request, Response } from "express";
import { getUser } from "../utils/getUser";

export const getUserInfo = async (req: Request, res: Response) => {
  const connection = getClient();
  await connection.connect();
  const { _token } = req.body;
  try {
    const userInfo = await getUser(connection, _token.usr);
    const user = {
      username: userInfo.username,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
    };

    info(`User info collected !`);
    return res.status(200).json({ user });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await connection.end();
  }
};
