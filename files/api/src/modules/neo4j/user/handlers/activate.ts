import { getSession } from "@shared/neo4j/neo4j";
import { conflict, info, internalError } from "@shared/utils";
import { getUser } from "../utils/getUser";
import { updateUser } from "../utils/updateUser";
import { Request, Response } from "express";

export const activateUser = async (req: Request, res: Response) => {
  const session = getSession();
  const auth = req.get("Authorization");

  try {
    if (!auth) return conflict(res, `Your token is invalid`);
    const userInfo = await getUser(session, { token: auth });
    if (!userInfo) return conflict(res, `Your token is invalid`);
    const active = true;
    const email = userInfo.properties.Email;
    const username = userInfo.properties.Username;
    const updated = await updateUser(
      session,
      { email, username, active },
      auth
    );

    info(`User activated !`);
    return res.status(200).json({ updated });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
};
