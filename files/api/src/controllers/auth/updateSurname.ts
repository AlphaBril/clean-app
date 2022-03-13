import { info, internalError } from "../../shared/utils";
import { request, response } from "../../express.d";

export const changeSurname = async (req: request, res: response) => {
  const token = req.body.token;
  const surname = req.body.surname;

  try {
    console.log(token, surname);
    info(`Surname Updated !`);
    return res.status(200);
  } catch (e) {
    return internalError(res)(e);
  }
};
