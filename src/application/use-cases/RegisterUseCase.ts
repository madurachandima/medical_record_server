import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { passwordHasher } from "../../shared/utils/passwordHasher";

export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
}


export class  RegisterUseCase {
    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(dto: RegisterDTO) {
        const existingUser = await this.userRepository.findByEmail(dto.email);

        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const hashedPassword = await passwordHasher.hash(dto.password);

        const newUser = await this.userRepository.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        return newUser;

    }
}