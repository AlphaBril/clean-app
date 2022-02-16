import { info, internalError } from "../../shared/utils";

export const changeUsername = async (req: any, res: any) => {
  let token = req.body.token;
  const username = req.body.username;

  try {
    console.log(token, username);
    info(`Username Updated !`);
    return res.status(200);
  } catch (e) {
    return internalError(res)(e);
  } finally {
  }
};
