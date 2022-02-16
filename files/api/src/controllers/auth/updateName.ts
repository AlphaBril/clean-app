import { info, internalError } from "../../shared/utils";

export const changeName = async (req: any, res: any) => {
  let token = req.body.token;
  const name = req.body.name;

  try {
    console.log(token, name);
    info(`Name Updated !`);
    return res.status(200);
  } catch (e) {
    return internalError(res)(e);
  } finally {
  }
};
