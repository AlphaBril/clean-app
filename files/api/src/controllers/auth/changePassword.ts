import { conflict, info, internalError } from '../../shared/utils';
import { hashPassword } from './hashPassword';
import { getToken } from '../../shared/jwt/getToken';



export const changePassword = async (req: any, res: any) => {
  let token = req.body.token;
  const password = await hashPassword(req.body.password);

  try {
    console.log(token, password);

    info(`Password Updated !`);
    return res
      .status(200);
  } catch (e) {
    return internalError(res)(e);
  } finally {
  };
}