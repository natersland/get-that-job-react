import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export const connectionString = `${process.env.DATABASE}`;
const databaseName = "gtj-database";
//connect cloud database (Mongoose)
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

// โค้ด MongoDB Local อันเก่า
/* const connectionString = "mongodb://127.0.0.1:27017"; // If localhost is not work, use this instead -> IPv4 address 127.0.0.1:27017 

export const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

export const db = client.db("users");
 */
