import { Connection } from "mysql";
import { User } from "./user.d";

export const createUser = async (connection: Connection, userData: User) => {
  const query = `INSERT INTO users (username, firstname, lastname, password, email, active) VALUES (?, ?, ?, ?, ?, ?)`;
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
      ],
      (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      }
    );
  });
  return result;
};
