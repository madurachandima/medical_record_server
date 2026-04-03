import { IEditProfileRepository } from "../../domain/repositories/IEditProfileRepository";

export interface EditProfileDTO {
    userId?: string;
    dateOfBirth?: string;
    bloodGroup?: string;
    gender?: string;
    email?: string;
    phoneNumber?: string;
}


export class EditProfileUseCase {
    constructor(
        private editProfileRepository: IEditProfileRepository
    ) { }

    async execute(dto: EditProfileDTO) {
        if (!dto.userId) {
            throw new Error("User ID is required");
        }
        const existingProfile = await this.editProfileRepository.get(dto.userId)

        if (existingProfile) {
            const updatedProfile = await this.editProfileRepository.update(dto.userId, {
                dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
                bloodGroup: dto.bloodGroup,
                gender: dto.gender,
                email: dto.email,
                phoneNumber: dto.phoneNumber,
                updatedAt: new Date(),
            })
            return updatedProfile;
        } else {
            const createdProfile = await this.editProfileRepository.create({
                userId: dto.userId,
                dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
                bloodGroup: dto.bloodGroup,
                gender: dto.gender,
                email: dto.email,
                phoneNumber: dto.phoneNumber,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            return createdProfile;
        }


    }

}
