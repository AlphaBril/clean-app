import { info, internalError } from "../../shared/utils";

export const changeSurname = async (req: any, res: any) => {
  let token = req.body.token;
  const surname = req.body.surname;

  try {
    console.log(token, surname);
    info(`Surname Updated !`);
    return res.status(200);
  } catch (e) {
    return internalError(res)(e);
  } finally {
  }
};
