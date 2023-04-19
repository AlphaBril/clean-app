import { getSession } from "@shared/neo4j/neo4j";
import { conflict, info, internalError } from "@shared/utils";
import { CHANGE_PASSWORD_EMAIL, sendMail } from "@shared/mail/mailer";
import { getUser } from "../utils/getUser";
import { Request, Response } from "express";

export const recoverPassword = async (req: Request, res: Response) => {
  const session = getSession();
  const email = req.body.email;

  try {
    const userInfo = await getUser(session, { email });
    if (!userInfo) return conflict(res, `No user with this email`);

    sendMail(
      email,
      userInfo.properties.Token,
      userInfo.properties.Username,
      CHANGE_PASSWORD_EMAIL
    );

    info(`Email send !`);
    return res.status(200).json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  }
};
