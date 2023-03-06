import { getSession } from "../../../shared/neo4j/neo4j";
import { conflict, info, internalError } from "../../../shared/utils";
import { hashPassword } from "../utils/hashPassword";
import { getToken } from "../../../shared/jwt/getToken";
import { getUser } from "../utils/getUser";
import { updateUser } from "../utils/updateUser";

export const changePassword = async (req: any, res: any) => {
  const session = getSession();
  let token = req.body.token;
  const password = await hashPassword(req.body.password);

  try {
    const userInfo = await getUser(session, { token });
    if (!userInfo[0]) {
      return conflict(res, `Your token is invalid`);
    } else {
      const username = userInfo[0].properties.Username;
      token = getToken({ username });
      const updated = await updateUser(
        session,
        { password, token },
        userInfo[0].properties.Token
      );
      if (!updated[0] || token !== updated[0].properties.Token)
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
