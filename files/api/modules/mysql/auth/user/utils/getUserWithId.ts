import { Connection } from "mysql";
import { User } from "./user.d";

export const getUserWithId = async (connection: Connection, id: number) => {
  const query = `SELECT * FROM users WHERE users.id = ?;`;
  const result = new Promise<User>((resolve, reject) => {
    connection.query(query, [id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
  return result;
};
