import { Client } from "pg";
import { User } from "./user.d";

export const getUserWithId = async (connection: Client, id: number) => {
  const query = `SELECT * FROM users WHERE users.id = $1;`;
  const { rows } = await connection.query(query, [id]);
  return rows[0] as User;
};
