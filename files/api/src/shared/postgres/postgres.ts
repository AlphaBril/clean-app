import { Client } from "pg";

import {
  POSTGRES_ADDRESS,
  POSTGRES_LOGIN,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_PROTOCOL,
  POSTGRES_DATABASE,
} from "../../constants/postgres";

const connectionString =
  POSTGRES_PROTOCOL +
  "://" +
  POSTGRES_LOGIN +
  ":" +
  POSTGRES_PASSWORD +
  "@" +
  POSTGRES_ADDRESS +
  ":" +
  POSTGRES_PORT +
  "/" +
  POSTGRES_DATABASE;

export const getClient = () => new Client({ connectionString });
// client.connect() -> client.query() -> client.end()
