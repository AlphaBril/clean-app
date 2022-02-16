import { conflict, info, internalError } from '../../shared/utils';
import { CHANGE_PASSWORD_EMAIL, sendMail } from '../../shared/mail/mailer';



export const recoverPassword = async (req: any, res: any) => {
  const email = req.body.email;

  try {
    
    //sendMail(email, token, username, CHANGE_PASSWORD_EMAIL);
    
    info(`Email send !`);
    return res
      .status(200);
  } catch (e) {
    return internalError(res)(e);
  } finally {
  };
}