import { IUserProfile } from "@domain/entities/userProfile";
import { IEditProfileRepository } from "@domain/repositories/IEditProfileRepository";
import { UserProfileModel } from "@infrastructure/database/models/UserProfileModel";

export class MongoUserProfileRepository implements IEditProfileRepository {
    async create(profile: IUserProfile): Promise<IUserProfile> {
        const created = await UserProfileModel.create(profile);
        return created.toObject();
    }
    async update(id: string, profile: IUserProfile): Promise<IUserProfile | null> {
        const updated = await UserProfileModel.findByIdAndUpdate(id, profile, { new: true });
        return updated ? updated.toObject() : null;
    }
    async get(userId: string): Promise<IUserProfile | null> {
       const userProfile = await UserProfileModel.findOne({ userId });
       return userProfile ? userProfile.toObject() : null;
    }
    async delete(id: string): Promise<boolean> {
        const deleted = await UserProfileModel.findByIdAndDelete(id);
        return !!deleted;
    }

}