const { MongoClient } = require("mongodb");

import {
  MONGO_ADDRESS,
  MONGO_LOGIN,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_PROTOCOL
} from '../../constants/mongo';

const connectionString = MONGO_PROTOCOL + '://' + MONGO_LOGIN
                + ':' + MONGO_PASSWORD + '@' + MONGO_ADDRESS
                + ':' + MONGO_PORT;

export const getClient = () => new MongoClient(connectionString)
// client.connect() -> client.query() -> client.end()