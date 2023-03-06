import { getSession } from "../../../shared/neo4j/neo4j";
import { info, internalError } from "../../../shared/utils";
import { updateUser } from "../utils/updateUser";

export const updateUserInfo = async (req: any, res: any) => {
  const session = getSession();
  const token = req.body.token;
  const { username, email, firstname, lastname } = req.body.userData;
  const userParams = { username, email, firstname, lastname };

  try {
    const userInfo = await updateUser(session, userParams, token);

    info(`User Updated !`);
    return res.status(200).json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
};
