import { getSession } from "@shared/neo4j/neo4j";
import { info, internalError, conflict } from "@shared/utils";
import { hashPassword } from "@shared/bcrypt/hashPassword";
import { ACTIVATION_EMAIL, sendMail } from "@shared/mail/mailer";
import { createUser } from "../utils/createUser";
import { countSimilarUsers } from "../utils/countUser";
import { Request, Response } from "express";
import { getAccessToken } from "@shared/jwt/jwt";

export const signup = async (req: Request, res: Response) => {
  const session = getSession();
  const { username, email, password, firstname, lastname } = req.body;
  const userParams = {
    username,
    email,
    password,
    firstname,
    lastname,
    active: false,
  };
  userParams.password = await hashPassword(password);

  try {
    const userMatch = await countSimilarUsers(session, { username });
    if (userMatch > 0)
      return conflict(res, `Username (${username}) already in use`);

    const emailMatch = await countSimilarUsers(session, { email });
    if (emailMatch > 0) return conflict(res, `Email (${email}) already in use`);

    await createUser(session, userParams);

    const accessToken = getAccessToken(
      `${req.protocol}://${req.get("host")}`,
      username,
      false
    );

    const mail = await sendMail(
      `${req.protocol}://${req.get("host")}`,
      email,
      accessToken,
      username,
      ACTIVATION_EMAIL
    );
    if (!mail) return conflict(res, `Registration email could not be sent`);

    info(`New user account, welcome to ${username}`);
    return res.status(200);
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
};
