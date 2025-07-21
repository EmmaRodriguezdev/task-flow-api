import { SignInUser } from "@/application/usecases/auth/SignInUser";
import { userRepository } from "../repositories/UserRepository";
import { SigninUserDTO } from "@/application/dto/SigninUserDTO";

export class UserService {
    private signinUser: SignInUser
    constructor(private userRepository: userRepository) {
        this.signinUser = new SignInUser(userRepository)
    }
    async signin(dto: SigninUserDTO) {
        return await this.userRepository.findByEmailWithProfile(dto.email)
    }
}