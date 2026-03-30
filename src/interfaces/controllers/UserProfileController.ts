import { Request, Response, NextFunction } from "express";
import { EditProfileUseCase } from "../../application/use-cases/EditProfileUseCase";
import { GetProfileUseCase } from "../../application/use-cases/GetProfileUseCase";
import { MongoUserProfileRepository } from "../../infrastructure/database/repositories/IUserProfileRepository";

export class UserProfileController {
    private editProfileUserCase: EditProfileUseCase;
    private getProfileUserCase: GetProfileUseCase;

    constructor() {
        const profileRepository = new MongoUserProfileRepository();
        this.editProfileUserCase = new EditProfileUseCase(profileRepository);
        this.getProfileUserCase = new GetProfileUseCase(profileRepository);
    }

    editProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.editProfileUserCase.execute(req.body);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    getProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.query.userId as string;
            if (!userId) {
                return res.status(400).json({ message: "userId is required" });
            }
            const result = await this.getProfileUserCase.execute(userId);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }


}