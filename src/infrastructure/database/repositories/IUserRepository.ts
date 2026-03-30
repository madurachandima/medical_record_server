import { IUser } from "domain/entities/User";
import { IUserRepository } from "domain/repositories/IUserRepository";
import { UserModel } from "../models/UserModel";

export class MongoUserRepository implements IUserRepository {
    async create(user: IUser): Promise<IUser> {
        const created = await UserModel.create(user);
        return created.toObject();
    }
    async findByEmail(email: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ email });
        return user ? user.toObject() : null;
    }
    async findById(id: string): Promise<IUser | null> {
        const user = await UserModel.findById(id);
        return user ? user.toObject() : null;
    }
    async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
} 