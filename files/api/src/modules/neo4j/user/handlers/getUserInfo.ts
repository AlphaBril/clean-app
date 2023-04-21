import { getSession } from "@shared/neo4j/neo4j";
import { info, internalError } from "@shared/utils";
import { Request, Response } from "express";
import { getUser } from "../utils/getUser";

export const getUserInfo = async (req: Request, res: Response) => {
  const session = getSession();
  const { _token } = req.body;
  try {
    const userInfo = await getUser(session, { username: _token.usr });
    const user = {
      username: userInfo.properties.Username,
      firstname: userInfo.properties.Firstname,
      lastname: userInfo.properties.Lastname,
      email: userInfo.properties.Email,
    };

    info(`User info collected !`);
    return res.status(200).json({ user });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
};
