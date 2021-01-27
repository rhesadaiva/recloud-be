import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const databaseConfig = {
  host: process.env.DATABASE_PG_URL,
  database: process.env.DATABASE_PG,
  user: process.env.DATABASE_PG_USERNAME,
  password: process.env.DATABASE_PG_PASSWORD,
  port: process.env.DATABASE_PG_PORT,
};

const pool = new Pool(databaseConfig);

export default pool;
