import { getToken } from '../../shared/jwt/getToken';
import { info, internalError, conflict } from '../../shared/utils';
import { checkPassword } from './checkPassword';



export const login = async (req: any, res: any) => {
  const {
    username,
    password
  } = req.body;

  try {
    //const passwordMatch = await checkPassword(password, matchingPassword[0]);

    info(`User '${username}' logged in`);
    return res
      .status(200)
      .json({ username });
  } catch (e) {
    return internalError(res)(e);
  } finally {
  };
}