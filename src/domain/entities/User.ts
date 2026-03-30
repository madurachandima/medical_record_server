export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}