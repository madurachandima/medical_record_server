import { RegisterUseCase } from "../../application/use-cases/RegisterUseCase";
import { NextFunction, Request, Response } from "express";
import { MongoUserRepository } from "../../infrastructure/database/repositories/IUserRepository";
import { LoginUseCase } from "../../application/use-cases/LoginUseCase";
import { json } from "body-parser";




export class AuthController {
    private registerUseCase: RegisterUseCase;
    private loginUseCase: LoginUseCase;


    constructor() {
        const userRepository = new MongoUserRepository();
        this.registerUseCase = new RegisterUseCase(userRepository);
        this.loginUseCase = new LoginUseCase(userRepository);
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.registerUseCase.execute(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }

    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.loginUseCase.execute(req.body);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }

    }

}