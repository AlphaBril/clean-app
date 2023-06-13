import { Connection } from "mysql";
import { User } from "./user.d";

export const getUser = async (connection: Connection, userName: string) => {
  const query = `SELECT * FROM users WHERE users.username = ?;`;
  const result = new Promise<User>((resolve, reject) => {
    connection.query(query, [userName], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
  return result;
};
