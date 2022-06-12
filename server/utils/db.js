import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export const connectionString = `${process.env.DATABASE}`;
const databaseName = "gtj-database";

export const client = new MongoClient(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  },
  console.log(`Connected to ${databaseName} database`)
);

export const db = client.db(databaseName);
