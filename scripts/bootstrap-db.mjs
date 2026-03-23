import { readFile } from "node:fs/promises";
import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;
const BOOTSTRAP_SQL_PATH = new URL("../db/init/00-bootstrap.sql", import.meta.url);
const RETRY_DELAY_MS = 2000;
const MAX_ATTEMPTS = 30;

if (!DATABASE_URL) {
  console.error("DATABASE_URL is required to bootstrap the database.");
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function connectWithRetry() {
  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const connection = await mysql.createConnection({
        uri: DATABASE_URL,
        multipleStatements: true,
      });

      await connection.query("SELECT 1");
      return connection;
    } catch (error) {
      lastError = error;
      console.log(
        `Database connection attempt ${attempt}/${MAX_ATTEMPTS} failed. Retrying in ${RETRY_DELAY_MS}ms.`
      );
      await sleep(RETRY_DELAY_MS);
    }
  }

  throw lastError;
}

async function tableExists(connection, tableName) {
  const [rows] = await connection.query("SHOW TABLES LIKE ?", [tableName]);
  return Array.isArray(rows) && rows.length > 0;
}

function stripUseStatement(sql) {
  return sql.replace(/^\s*USE\s+[^;]+;\s*/i, "");
}

async function bootstrapIfNeeded() {
  const connection = await connectWithRetry();

  try {
    const hasUsers = await tableExists(connection, "users");
    const hasSessions = await tableExists(connection, "sessions");
    const hasStores = await tableExists(connection, "stores");

    if (hasUsers && hasSessions && hasStores) {
      console.log("Database bootstrap skipped because required tables already exist.");
      return;
    }

    const sql = await readFile(BOOTSTRAP_SQL_PATH, "utf8");
    await connection.query(stripUseStatement(sql));
    console.log("Database bootstrap completed from db/init/00-bootstrap.sql.");
  } finally {
    await connection.end();
  }
}

bootstrapIfNeeded().catch((error) => {
  console.error("Database bootstrap failed.", error);
  process.exit(1);
});
