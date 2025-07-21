import { NextFunction, Response, Request } from "express";
import { SigninUserDTO } from "@/application/dto/SigninUserDTO";
import { SignInUser } from "@/application/usecases/auth/SignInUser";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { HttpStatusCodes } from "@/shared/utils/httpStatusCodes";

export class UserController {
    userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = SigninUserDTO.fromRequest(req.body)
            const signinUserUseCase = new SignInUser(this.userRepository)
            const signin = await signinUserUseCase.execute(dto.email, dto.password)
            res.status(HttpStatusCodes.OK).json(signin)
        }catch (error) {
            next(error)
        }
    }
}