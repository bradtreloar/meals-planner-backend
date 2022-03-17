import "core-js/stable";
import "regenerator-runtime/runtime";
import dotenv from "dotenv";
import createApp from "./app";
import { initSQLiteSequelize } from "./database";

dotenv.config();

const port = process.env.PORT || 3000;

const sqliteDBPath = process.env.DB_PATH;
if (sqliteDBPath !== undefined) {
  initSQLiteSequelize(sqliteDBPath);
  console.log(`Connected to SQLite DB at ${sqliteDBPath}`);
} else {
  throw new Error("DB_PATH not set in environment.");
}

const app = createApp();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
