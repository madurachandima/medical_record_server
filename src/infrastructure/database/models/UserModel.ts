import { IUser } from "domain/entities/User";
import mongoose, { Schema } from "mongoose";

export interface IUserModel extends IUser, Document { }

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const UserModel = mongoose.model<IUserModel>('User', UserSchema);