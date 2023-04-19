import * as bcrypt from "bcrypt";

export async function checkPassword(password: string, hash: string) {
  const checkedPassword: boolean = await new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result: boolean) {
      if (err) reject(err);
      resolve(result);
    });
  });

  return checkedPassword;
}
