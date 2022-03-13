import { info, internalError } from "../../shared/utils";
import { CHANGE_PASSWORD_EMAIL, sendMail } from "../../shared/mail/mailer";
import { request, response } from "../../express.d";

export const recoverPassword = async (req: request, res: response) => {
  const email = req.body.email;

  try {
    sendMail(email, "test", "test", CHANGE_PASSWORD_EMAIL);
    info(`Email send !`);
    return res.status(200);
  } catch (e) {
    return internalError(res)(e);
  }
};
