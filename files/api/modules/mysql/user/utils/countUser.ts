import { Connection } from "mysql";

export const countSimilarUsers = async (
  connection: Connection,
  userName: string
) => {
  const query = `SELECT * FROM users WHERE users.username = ?;`;
  const result = new Promise<number>((resolve, reject) => {
    connection.query(query, [userName], (err, results) => {
      if (err) reject(err);
      resolve(results.length);
    });
  });
  return result;
};
