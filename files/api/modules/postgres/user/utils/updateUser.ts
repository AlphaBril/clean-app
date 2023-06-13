import { Client } from "pg";
import { User } from "./user.d";

export const updateUser = async (
  connection: Client,
  userData: User,
  userName: string
) => {
  const query = `UPDATE users SET username = $1, firstname = $2, lastname = $3, password = $4, email = $5, active = $6 WHERE users.username = $7;`;
  const { rows } = await connection.query(query, [
    userData.username,
    userData.firstname,
    userData.lastname,
    userData.password,
    userData.email,
    userData.active,
    userName,
  ]);
  return rows[0] as User;
};
