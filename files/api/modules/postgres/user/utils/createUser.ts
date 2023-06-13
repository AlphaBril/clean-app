import { Client } from "pg";
import { User } from "./user.d";

export const createUser = async (connection: Client, userData: User) => {
  const query = `INSERT INTO users (username, firstname, lastname, password, email, active) VALUES ($1, $2, $3, $4, $5, $6)`;
  const { rows } = await connection.query(query, [
    userData.username,
    userData.firstname,
    userData.lastname,
    userData.password,
    userData.email,
    userData.active,
  ]);
  return rows[0];
};
