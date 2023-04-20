import { getSession } from "@shared/neo4j/neo4j";
import { conflict, info, internalError } from "@shared/utils";
import { hashPassword } from "@shared/bcrypt/hashPassword";
import { getToken } from "@shared/jwt/getToken";
import { getUser } from "../utils/getUser";
import { updateUser } from "../utils/updateUser";
import { Request, Response } from "express";

export const changePassword = async (req: Request, res: Response) => {
  const session = getSession();
  let token = req.get("Authorization");
  const password = await hashPassword(req.body.password);

  try {
    const userInfo = await getUser(session, { token });
    if (!userInfo) {
      return conflict(res, `Your token is invalid`);
    } else {
      const username = userInfo.properties.Username;
      token = getToken({ username });
      const updated = await updateUser(
        session,
        { password, token },
        userInfo.properties.Token
      );
      if (!updated || token !== updated.properties.Token)
        return conflict(
          res,
          `Error when generating new token for (${username})`
        );
    }

    info(`Password Updated !`);
    return res.status(200).json({ token });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
};
