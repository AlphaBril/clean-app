import { getSession } from "../../../shared/neo4j/neo4j";
import { getToken } from "../../../shared/jwt/getToken";
import { info, internalError, conflict } from "../../../shared/utils";
import { hashPassword } from "../utils/hashPassword";
import { ACTIVATION_EMAIL, sendMail } from "../../../shared/mail/mailer";
import { createUser } from "../utils/createUser";
import { countSimilarUsers } from "../utils/countUser";

export const signup = async (req: any, res: any) => {
  const session = getSession();
  const { username, email, password, firstname, lastname } = req.body;
  const pictures = ["", "", "", "", ""];
  const active = false;
  const valid = false;
  const token = getToken({ username });
  const popularity = 1200;
  const userParams = {
    username,
    email,
    password,
    token,
    pictures,
    active,
    valid,
    firstname,
    lastname,
    popularity,
  };
  userParams.password = await hashPassword(password);

  try {
    const userMatch = await countSimilarUsers(session, { username });
    if (userMatch[0] > 0)
      return conflict(res, `Username (${username}) already in use`);

    const emailMatch = await countSimilarUsers(session, { email });
    if (emailMatch[0] > 0)
      return conflict(res, `Email (${email}) already in use`);

    await createUser(session, userParams);
    sendMail(email, token, username, ACTIVATION_EMAIL);

    info(`New user account, welcome to ${username}`);
    return res.status(200).json({ token });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
};
