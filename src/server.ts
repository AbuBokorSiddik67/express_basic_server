import { Pool } from "pg";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
//? DB
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
});
//? Create table
const initDB = async () => {
  await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(10) NOT NULL,
        email VARCHAR(20) UNIQUE NOT NULL,
        phone VARCHAR(13) NOT NULL,
        age INT,
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS todos(
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
      `);
};
initDB();

const app = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Abdullah Al Jubyer...");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
