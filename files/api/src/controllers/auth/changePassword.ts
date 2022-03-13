import { info, internalError } from "../../shared/utils";
import { hashPassword } from "./hashPassword";
import { request, response } from "../../express.d";

export const changePassword = async (req: request, res: response) => {
  const token = req.body.token;
  const password = await hashPassword(req.body.password);

  try {
    console.log(token, password);
    info(`Password Updated !`);
    return res.status(200);
  } catch (e) {
    return internalError(res)(e);
  }
};
