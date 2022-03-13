import { info, internalError } from "../../shared/utils";
import { request, response } from "../../express.d";

export const changeEmail = async (req: request, res: response) => {
  const token = req.body.token;
  const email = req.body.email;

  try {
    console.log(token, email);
    info(`Email Updated !`);
    return res.status(200);
  } catch (e) {
    return internalError(res)(e);
  }
};
