export async function checkPassword(password: string, hash: string) {
  const bcrypt = require("bcrypt");

  const checkedPassword: boolean = await new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err: any, result: boolean) {
      if (err) reject(err);
      resolve(result);
    });
  });

  return checkedPassword;
}
