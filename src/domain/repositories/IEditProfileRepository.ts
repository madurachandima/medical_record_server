import {IUserProfile} from "../entities/userProfile";



export interface IEditProfileRepository{
    create(profile:IUserProfile):Promise<IUserProfile | null>;
    update(id:string,profile:IUserProfile):Promise<IUserProfile | null>;
    get(userId:string):Promise<IUserProfile | null>;
    delete(id:string):Promise<boolean>;
}