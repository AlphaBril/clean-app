import { getSession } from "@shared/neo4j/neo4j";
import { conflict, info, internalError } from "@shared/utils";
import { getToken } from "@shared/jwt/getToken";
import { getUser } from "../utils/getUser";
import { updateUser } from "../utils/updateUser";
import { Request, Response } from "express";

export const activateUser = async (req: Request, res: Response) => {
  const session = getSession();
  let token = req.get("Authorization");

  try {
    const userInfo = await getUser(session, { token });
    if (!userInfo) {
      return conflict(res, `Your token is invalid`);
    } else {
      const active = true;
      const email = userInfo.properties.Email;
      const username = userInfo.properties.Username;
      token = getToken({ username });
      const updated = await updateUser(
        session,
        { token, email, username, active },
        req.body.token
      );
      if (!updated || token !== updated.properties.Token)
        return conflict(
          res,
          `Error when generating new token for (${username})`
        );
    }

    info(`User activated !`);
    return res.status(200).json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
};
