import { getClient } from "@shared/postgres/postgres";
import { conflict, info, internalError } from "@shared/utils";
import { CHANGE_PASSWORD_EMAIL, sendMail } from "@shared/mail/mailer";
import { Request, Response } from "express";
import { getAccessToken } from "@shared/jwt/jwt";
import { getUserWithEmail } from "../utils/getUserWithEmail";

export const recoverPassword = async (req: Request, res: Response) => {
  const connection = getClient();
  await connection.connect();
  const email = req.body.email;

  try {
    const userInfo = await getUserWithEmail(connection, email);
    if (!userInfo) return conflict(res, `No user with this email`);
    const accessToken = getAccessToken(
      `${req.protocol}://${req.get("host")}`,
      userInfo.username,
      false
    );
    const mail = sendMail(
      `${req.protocol}://${req.get("host")}`,
      email,
      accessToken,
      userInfo.username,
      CHANGE_PASSWORD_EMAIL
    );
    if (!mail) return conflict(res, `Registration email could not be sent`);

    info(`Email send !`);
    return res.status(200).json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await connection.end();
  }
};
