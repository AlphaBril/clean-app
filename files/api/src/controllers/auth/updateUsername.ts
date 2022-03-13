import { info, internalError } from "../../shared/utils";
import { request, response } from "../../express.d";

export const changeUsername = async (req: request, res: response) => {
  const token = req.body.token;
  const username = req.body.username;

  try {
    console.log(token, username);
    info(`Username Updated !`);
    return res.status(200);
  } catch (e) {
    return internalError(res)(e);
  }
};
