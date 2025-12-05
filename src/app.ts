import express, { Request, Response } from "express";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRouter } from "./modules/user/user.route";
import { todoRouter } from "./modules/todo/todo.routes";
import { authRouter } from "./modules/auth/auth.route";

const app = express();

// initialize db
initDB();

app.use(express.json());
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Abdullah Al Jubyer...");
});

//todo>>> USER CURD...
app.use("/users", userRouter);

//todo>>> Todos curd...
app.use("/todos", todoRouter);

//todo>>> auth
app.use("/auth", authRouter);

export default app;
