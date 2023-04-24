import { getSession } from "@shared/neo4j/neo4j";
import { conflict, info, internalError } from "@shared/utils";
import { CHANGE_PASSWORD_EMAIL, sendMail } from "@shared/mail/mailer";
import { getUser } from "../utils/getUser";
import { Request, Response } from "express";
import { getAccessToken } from "@shared/jwt/jwt";

export const recoverPassword = async (req: Request, res: Response) => {
  const session = getSession();
  const email = req.body.email;

  try {
    const userInfo = await getUser(session, { email });
    if (!userInfo) return conflict(res, `No user with this email`);
    const accessToken = getAccessToken(
      `${req.protocol}://${req.get("host")}`,
      userInfo.properties.Username,
      false
    );
    const mail = sendMail(
      `${req.protocol}://${req.get("host")}`,
      email,
      accessToken,
      userInfo.properties.Username,
      CHANGE_PASSWORD_EMAIL
    );
    if (!mail) return conflict(res, `Registration email could not be sent`);

    info(`Email send !`);
    return res.status(200).json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
};
