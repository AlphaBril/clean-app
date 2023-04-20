import { getSession } from "@shared/neo4j/neo4j";
import { conflict, info, internalError } from "@shared/utils";
import { hashPassword } from "@shared/bcrypt/hashPassword";
import { getUser } from "../utils/getUser";
import { updateUser } from "../utils/updateUser";
import { Request, Response } from "express";

export const changePassword = async (req: Request, res: Response) => {
  const session = getSession();
  const token = req.get("Authorization");
  const password = await hashPassword(req.body.password);

  try {
    const userInfo = await getUser(session, { token });
    if (!userInfo) return conflict(res, `Your token is invalid`);

    const updated = await updateUser(
      session,
      { password, token },
      userInfo.properties.Token
    );

    info(`Password Updated !`);
    return res.status(200).json({ updated });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
};
