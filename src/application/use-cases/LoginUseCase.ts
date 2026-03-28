import { passwordHasher } from "../../shared/utils/passwordHasher";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import jwt from "jsonwebtoken";
export interface LoginDTO {
    email: string,
    password: string
}

export class LoginUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(dto: LoginDTO) {

        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await passwordHasher.compire(dto.password, user.password!);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name
        },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        };
    }

}