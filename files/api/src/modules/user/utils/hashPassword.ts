export async function hashPassword (password: string) {
    const bcrypt = require('bcrypt');
  
    const hashedPassword: string = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, function(err: any, hash: string) {
        if (err) reject(err)
        resolve(hash)
      });
    })

    return hashedPassword;
}