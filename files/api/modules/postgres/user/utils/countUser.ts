import { Client } from "pg";

export const countSimilarUsers = async (
  connection: Client,
  userName: string
) => {
  const query = `SELECT * FROM users WHERE users.username = $1;`;
  const { rows } = await connection.query(query, [userName]);
  return rows.length;
};
