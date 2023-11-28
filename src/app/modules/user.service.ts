import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
  if (await User.doesUserExist(userData.userId)) {
    throw new Error("User already exists!");
  }
  const result = await User.create(userData); // built-in static method
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.aggregate([{ $match: { userId: userId } }]);
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const result = await User.deleteOne({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
