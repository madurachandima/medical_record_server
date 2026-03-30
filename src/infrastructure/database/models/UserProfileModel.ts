import { IUserProfile } from "domain/entities/userProfile";
import mongoose, { Schema } from "mongoose";

export interface IUserProfileModel extends IUserProfile, Document { }

const UserProfileSchema: Schema = new Schema({
    userId: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    bloodGroup: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const UserProfileModel = mongoose.model<IUserProfileModel>('UserProfile', UserProfileSchema);
