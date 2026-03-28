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
    findById(id: string): Promise<IUser | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, user: Partial<IUser>): Promise<IUser | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
} 