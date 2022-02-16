import { info, internalError } from "../../shared/utils";

export const login = async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    info(`User '${username}' logged in with '${password}'`);
    return res.status(200).json({ username });
  } catch (e) {
    return internalError(res)(e);
  } finally {
  }
};
