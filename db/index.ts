import * as schema from './schema';
// import { drizzle } from "drizzle-orm/planetscale-serverless";
// import { connect } from "@planetscale/database";

// const connection = connect({
//   host: process.env["DATABASE_HOST"],
//   username: process.env["DATABASE_USERNAME"],
//   password: process.env["DATABASE_PASSWORD"],
// });

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
 
const connection = await mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "pass123",
  database: "twitter",
});
 
export const db = drizzle(connection, {
  schema,
});