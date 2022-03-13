import { info, internalError } from "../../shared/utils";
import { request, response } from "../../express.d";

export const activateUser = async (req: request, res: response) => {
  const token = req.body.token;

  try {
    console.log(token);
    info(`User activated !`);
    return res.status(200);
  } catch (e) {
    return internalError(res)(e);
  }
};
