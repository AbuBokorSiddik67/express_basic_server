import express, { Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRouter } from "./modules/user/user.route";

const app = express();
const port = config.port;

// initialize db
initDB();

app.use(express.json());
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Abdullah Al Jubyer...");
});

//todo>>> USER CURD...
app.use("/users", userRouter);

//todo>>> Todos curd...
// Post todos data
app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
      [user_id, title]
    );
    res.status(201).json({
      success: false,
      message: "Data Instered Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      massage: err.massage,
    });
  }
});
// get todos data
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);

    res.status(200).json({
      success: true,
      massage: "todos data recevied successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      massage: `${err.massage}`,
      datails: err,
    });
  }
});
// get single todo data
app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        massage: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        massage: "todos data fetched succussfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      massage: `${error.massage}`,
    });
  }
});
// update todos data
app.put("/todos/:id", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await pool.query(
      `UPDATE todos SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
      [user_id, title, req.params.id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        massage: "todos not found",
      });
    } else {
      res.status(200).json({
        success: true,
        massage: "todos data updated succussfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      massage: `${err.massage}`,
    });
  }
});
// delete todos data
app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      res.status(200).json({
        success: true,
        massage: "todos DATA DELETED",
      });
    } else {
      res.status(200).json({
        success: false,
        massage: "todos data not deleted",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      massage: `${error.massage}`,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
