import { getSession } from "@shared/neo4j/neo4j";
import { conflict, info, internalError } from "@shared/utils";
import { hashPassword } from "@shared/bcrypt/hashPassword";
import { getUser } from "../utils/getUser";
import { updateUser } from "../utils/updateUser";
import { Request, Response } from "express";

export const changePassword = async (req: Request, res: Response) => {
  const session = getSession();
  const { _token } = req.body;
  const password = await hashPassword(req.body.password);

  try {
    const userInfo = await getUser(session, { username: _token.usr });
    if (!userInfo) return conflict(res, `Your token is invalid`);

    const updated = await updateUser(
      session,
      { password },
      userInfo.properties.Username
    );

    info(`Password Updated !`);
    return res.status(200).json({ updated });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
};
