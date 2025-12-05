import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(500).json({ massage: "you are not allowed" });
      }
      const decoded = jwt.verify(token, config.jwtStr as string) as JwtPayload;
      req.user = decoded;
      console.log(decoded);
      if (roles.length && !roles.includes(decoded.roles as string)) {
        res.status(500).json({ massage: "you are not allowed" });
      }
      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        massage: err.massage,
      });
    }
  };
};

export default auth;
