import { info, internalError } from "../../shared/utils";

export const activateUser = async (req: any, res: any) => {
  let token = req.body.token;

  try {
    console.log(token);
    info(`User activated !`);
    return res.status(200);
  } catch (e) {
    return internalError(res)(e);
  } finally {
  }
};
