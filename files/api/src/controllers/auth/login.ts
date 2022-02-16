import { info, internalError } from "../../shared/utils";
import { getToken } from "../../shared/jwt/getToken";

export const login = async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    info(`User '${username}' logged in with '${password}'`);
    const token = getToken({username});
    return res.status(200).json({ token });
  } catch (e) {
    return internalError(res)(e);
  } finally {
  }
};
