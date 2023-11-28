import { Request, Response } from "express";
import { UserServices } from "./user.service";
import userValidationSchema from "./user.validation";
import {CustomError} from "../error/customError";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const zodParsedData = userValidationSchema.parse(userData)
    const result = await UserServices.createUserIntoDB(zodParsedData);
    var {password, ...updatedResult} = result.toObject()

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: updatedResult,
    });
  } catch (err: any) {
    res.status(500).json({
        success: true,
        message: err.message || "Something went wrong!",
        error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    let updatedResult;
    if(result.length != 0){
      updatedResult = result.map(item => {
          const {_id, userId, isActive, hobbies, password, ...rest} = item.toObject();
          return rest
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: updatedResult,
    });
  } catch (err: any) {
    res.status(500).json({
        success: true,
        message: err.message || "Something went wrong!",
        error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);
    if(result.length != 0){
      var {_id, password, ...updatedResult} = result[0]
    }
    else{
      throw new CustomError(404, "User not found")
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: [updatedResult],
    });
  } catch (err: any) {
    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong!",
        error: {
          code: err.statusCode,
          description: err.message
        },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: userData } = req.body;
    const zodParsedData = userValidationSchema.parse(userData)
    const result = await UserServices.updateUserFromDB(userId, zodParsedData);
    var {password, ...updatedResult} = userData
    if(result.matchedCount == 0){
      throw new CustomError(404, "User not found")
    }
    res.status(200).json({
      success: true,
      message: "User is updated successfully!",
      data: updatedResult,
    });
  } catch (err: any) {
    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong!",
        error: {
          code: err.statusCode,
          description: err.message
        }
    });
  }
};


const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);
    if(result.deletedCount == 0){
      throw new CustomError(404, "User not found!")
    }
    res.status(200).json({
      success: true,
      message: "User is deleted successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
        error: {
          code: err.statusCode,
          description: err.message
        }
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
