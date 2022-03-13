import { info, internalError } from "../../shared/utils";
import { getToken } from "../../shared/jwt/getToken";
import { request, response } from "../../express.d";

export const login = async (req: request, res: response) => {
  const { username, password } = req.body;

  try {
    info(`User '${username}' logged in with '${password}'`);
    const token = getToken({ username });
    return res.status(200).json({ token });
  } catch (e) {
    return internalError(res)(e);
  }
};
