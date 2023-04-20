import { getSession } from "@shared/neo4j/neo4j";
import { conflict, info, internalError } from "@shared/utils";
import { updateUser } from "../utils/updateUser";
import { Request, Response } from "express";

export const updateUserInfo = async (req: Request, res: Response) => {
  const session = getSession();
  const token = req.get("Authorization");
  const { username, email, firstname, lastname } = req.body.userData;
  const userParams = { username, email, firstname, lastname };

  try {
    if (!token) return conflict(res, `Your token is invalid`);
    const userInfo = await updateUser(session, userParams, token);

    info(`User Updated !`);
    return res.status(200).json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
};
