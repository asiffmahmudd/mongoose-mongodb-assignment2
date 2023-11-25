import { Schema, model } from "mongoose";
import { TUser, TFullName, TAddress, UserModel } from "./user.interface";

const fullNameSchema =  new Schema<TFullName>({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required'],
    }
})

const addressSchema =  new Schema<TAddress>({
    street: {
        type: String,
        trim: true,
        required: [true, 'Street is required'],
    },
    city: {
        type: String,
        trim: true,
        required: [true, 'City is required'],
    },
    country: {
        type: String,
        trim: true,
        required: [true, 'Country is required'],
    }
})

const userSchema = new Schema<TUser, UserModel>({
    userId: {
      type: String,
      required: [true, 'User id is required'],
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    fullName: {
        type: fullNameSchema,
        required: [true, "Full name is required"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Age is required"]
    },
    isActive: {
        type: Boolean,
        required: [true, "Age is required"]
    },
    hobbies: [{
        type: String,
    }],
    address: {
        type: addressSchema,
        required: [true, "Age is required"]
    }
  });

  export const User = model<TUser, UserModel>("Student", userSchema);