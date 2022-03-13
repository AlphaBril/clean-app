import { getToken } from "../../shared/jwt/getToken";
import { info, internalError } from "../../shared/utils";
import { hashPassword } from "./hashPassword";
import { ACTIVATION_EMAIL, sendMail } from "../../shared/mail/mailer";
import { request, response } from "../../express.d";

export const signup = async (req: request, res: response) => {
  const { username, email, password, name, surname } = req.body;
  const active = false;
  const valid = false;
  const token = getToken({ username });
  const userParams = {
    username,
    email,
    password,
    token,
    active,
    valid,
    name,
    surname,
  };
  userParams.password = await hashPassword(password);

  try {
    sendMail(email, token, username, ACTIVATION_EMAIL);

    info(`New user account, welcome to ${username}`);
    return res.status(200);
  } catch (e) {
    return internalError(res)(e);
  }
};
