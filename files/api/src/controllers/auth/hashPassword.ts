import bcrypt = require("bcrypt");

export async function hashPassword(password: string) {
  const hashedPassword: string = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err: Error | undefined, hash: string) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}
