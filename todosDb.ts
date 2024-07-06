import { Pool } from "pg";

const POSGRES_PASSWORD = process.env.POSGRES_PASSWORD;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PORT = process.env.POSTGRES_PORT;
const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_DB = process.env.POSTGRES_DB;

const pool = new Pool({
  user: POSTGRES_USER,
  password: POSGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT ?? 5432),
  database: "todo",
});

export default pool;

interface QueryResult {
  rows: any[];
  rowCount: number | null;
}

export const query = (text: string, params: any[]): Promise<QueryResult> => {
  return pool.query(text, params);
};
