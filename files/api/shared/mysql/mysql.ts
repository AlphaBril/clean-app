import mysql = require("mysql");

import {
  MYSQL_ADDRESS,
  MYSQL_LOGIN,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_PROTOCOL,
  MYSQL_DATABASE,
} from "@constants/mysql";

const connectionString =
  MYSQL_PROTOCOL +
  "://" +
  MYSQL_LOGIN +
  ":" +
  MYSQL_PASSWORD +
  "@" +
  MYSQL_ADDRESS +
  ":" +
  MYSQL_PORT +
  "/" +
  MYSQL_DATABASE;

export const getDriver = () => mysql.createConnection(connectionString);
// client.connect() -> client.query() -> client.end()
