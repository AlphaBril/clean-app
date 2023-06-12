import { getDriver } from "@shared/mysql/mysql";
import { conflict, info, internalError } from "@shared/utils";
import { updateUser } from "../utils/updateUser";
import { Request, Response } from "express";

export const updateUserInfo = async (req: Request, res: Response) => {
  const connection = getDriver();
  const { _token } = req.body;
  const { username, email, firstname, lastname } = req.body.userData;
  const userParams = {
    username,
    email,
    firstname,
    lastname,
    password: "test",
    active: true,
  };

  try {
    if (!_token) return conflict(res, `Your token is invalid`);
    const userInfo = await updateUser(connection, userParams, _token.usr);

    info(`User Updated !`);
    return res.status(200).json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await connection.end();
  }
};
