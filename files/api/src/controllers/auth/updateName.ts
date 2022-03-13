import { info, internalError } from "../../shared/utils";
import { request, response } from "../../express.d";

export const changeName = async (req: request, res: response) => {
  const token = req.body.token;
  const name = req.body.name;

  try {
    console.log(token, name);
    info(`Name Updated !`);
    return res.status(200);
  } catch (e) {
    return internalError(res)(e);
  }
};
