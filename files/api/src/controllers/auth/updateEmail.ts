import { info, internalError } from "../../shared/utils";

export const changeEmail = async (req: any, res: any) => {
  let token = req.body.token;
  const email = req.body.email;

  try {
    console.log(token, email);
    info(`Email Updated !`);
    return res.status(200);
  } catch (e) {
    return internalError(res)(e);
  } finally {
  }
};
