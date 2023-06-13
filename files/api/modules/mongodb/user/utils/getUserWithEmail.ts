import { Connection } from "mysql";
import { User } from "./user.d";

export const getUserWithEmail = async (
  connection: Connection,
  email: string
) => {
  const query = `SELECT * FROM users WHERE users.email = ?;`;
  const result = new Promise<User>((resolve, reject) => {
    connection.query(query, [email], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
  return result;
};
