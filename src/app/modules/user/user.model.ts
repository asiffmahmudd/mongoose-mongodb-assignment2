import { Schema, model } from "mongoose";
import { TUser, TFullName, TAddress, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last name is required"],
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    trim: true,
    required: [true, "Street is required"],
  },
  city: {
    type: String,
    trim: true,
    required: [true, "City is required"],
  },
  country: {
    type: String,
    trim: true,
    required: [true, "Country is required"],
  },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: String,
    required: [true, "User id is required"],
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, "Full name is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Age is required"],
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: [true, "Age is required"],
  },
  hobbies: [
    {
      type: String,
    },
  ],
  address: {
    type: addressSchema,
    required: [true, "Age is required"],
  },
});

//pre save middleware/hook will work on create or save function
userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//post save middleware/hook
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

//   userSchema.post('findOne', function(doc, next){
//     doc.password = '';
//     next();
//   })

userSchema.statics.doesUserExist = async function (id: string) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

export const User = model<TUser, UserModel>("User", userSchema);
