import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const zodParsedData = userValidationSchema.parse(userData)
    const result = await UserServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
        success: true,
        message: err.message || "Something went wrong",
        error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    const updatedResult = result.map(item => {
        const {password, ...rest} = item.toObject();
        return rest
    });

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: updatedResult,
    });
  } catch (err: any) {
    res.status(500).json({
        success: true,
        message: err.message || "Something went wrong",
        error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);
    const {password, ...updatedResult} = result[0]

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: [updatedResult],
    });
  } catch (err: any) {
    res.status(500).json({
        success: true,
        message: err.message || "Something went wrong",
        error: err,
    });
  }
};


const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User is deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
        success: true,
        message: err.message || "Something went wrong",
        error: err,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
