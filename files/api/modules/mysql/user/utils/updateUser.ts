import { Connection } from "mysql";
import { User } from "./user.d";

export const updateUser = async (
  connection: Connection,
  userData: User,
  userName: string
) => {
  const query = `UPDATE users SET username = ?, firstname = ?, lastname = ?, password = ?, email = ?, active = ? WHERE users.username = ?;`;
  const result = new Promise<User>((resolve, reject) => {
    connection.query(
      query,
      [
        userData.username,
        userData.firstname,
        userData.lastname,
        userData.password,
        userData.email,
        userData.active,
        userName,
      ],
      (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      }
    );
  });
  return result;
};
