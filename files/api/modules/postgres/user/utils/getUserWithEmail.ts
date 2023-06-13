import { Client } from "pg";
import { User } from "./user.d";

export const getUserWithEmail = async (connection: Client, email: string) => {
  const query = `SELECT * FROM users WHERE users.email = $1;`;
  const { rows } = await connection.query(query, [email]);
  return rows[0] as User;
};
