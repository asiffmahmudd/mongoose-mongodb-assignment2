import {Model, model} from 'mongoose'

export type TAddress = {
    street: string,
    city: string,
    country: string
}

export type TFullName = {
    firstName: string,
    lastName: string
}

export type TUser = {
    userId: string,
    username: string,
    password: string,
    fullName: TFullName,
    age: number,
    email: string,
    isActive: boolean,
    hobbies: string[]
    address: TAddress
}

export interface UserModel extends Model<TUser> {
    isUserExists(id: string): Promise<TUser | null>
}

