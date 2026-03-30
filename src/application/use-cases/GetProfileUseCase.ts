import { IEditProfileRepository } from "../../domain/repositories/IEditProfileRepository";


export class GetProfileUseCase {
    constructor(
        private getProfileRepository: IEditProfileRepository
    ) { }

    async execute(userId: string) {
        const profile = await this.getProfileRepository.get(userId);
        if (!profile) {
            throw new Error("Profile not found");
        }
        return profile;
    }
}