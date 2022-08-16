import { getSession } from '../../../shared/neo4j/neo4j'
import { conflict, info, internalError } from '../../../shared/utils';
import { CHANGE_PASSWORD_EMAIL, sendMail } from '../../../shared/mail/mailer';
import { getUser } from '../utils/getUser';



export const recoverPassword = async (req: any, res: any) => {
  const session = getSession();
  const email = req.body.email;

  try {
    const userInfo = await getUser(session, { email });
    if (!userInfo[0])
        return conflict(res, `No user with this email`);
    
    sendMail(email, userInfo[0].properties.Token, userInfo[0].properties.Username, CHANGE_PASSWORD_EMAIL, req);
    
    info(`Email send !`);
    return res
      .status(200)
      .json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.close();
  };
}