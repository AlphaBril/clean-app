import { Client } from "pg";
import { User } from "./user.d";

export const getUser = async (connection: Client, userName: string) => {
  const query = `SELECT * FROM users WHERE users.username = $1;`;
  const { rows } = await connection.query(query, [userName]);
  return rows[0] as User;
};
