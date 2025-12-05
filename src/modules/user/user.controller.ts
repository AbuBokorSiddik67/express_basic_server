import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req.body);
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
};
const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    res.status(200).json({
      success: true,
      massage: "user data recevied successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      massage: `${err.massage}`,
      datails: err,
    });
  }
};
const singleUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.singleUser(req.params.id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        massage: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        massage: "user data fetched succussfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      massage: `${error.massage}`,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await userServices.updateUser(name, email, req.params.id!);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        massage: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        massage: "user data updated succussfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      massage: `${err.massage}`,
    });
  }
};
const deleteUser=async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.id!);

    if (result.rows.length === 0) {
      res.status(200).json({
        success: true,
        massage: "User DATA DELETED",
      });
    } else {
      res.status(200).json({
        success: false,
        massage: "user data not deleted",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      massage: `${error.massage}`,
    });
  }
}

export const userController = {
  createUser,
  getUser,
  singleUser,
  updateUser,
  deleteUser,
}
