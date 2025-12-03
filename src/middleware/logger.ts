import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`info [${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};

export default logger;