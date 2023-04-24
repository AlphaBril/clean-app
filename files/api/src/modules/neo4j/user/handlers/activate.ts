import { getSession } from "@shared/neo4j/neo4j";
import { conflict, info, internalError } from "@shared/utils";
import { getUser } from "../utils/getUser";
import { updateUser } from "../utils/updateUser";
import { Request, Response } from "express";

export const activateUser = async (req: Request, res: Response) => {
  const session = getSession();
  const { _token } = req.body;

  try {
    if (!_token) return conflict(res, `Your token is invalid`);
    const userInfo = await getUser(session, { username: _token.usr });
    if (!userInfo) return conflict(res, `Your token is invalid`);
    const active = true;
    const updated = await updateUser(
      session,
      { active },
      userInfo.properties.Username
    );

    info(`User activated !`);
    return res.status(200).json({ updated });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
};
