import { diContainer } from '@fastify/awilix'
import { UserService } from '../../../application/services/userService'
import { ILoginBodyRequest } from '../../../domain/interfaces/requests/authRequestInterface'
import { UseCaseBase } from '../../../domain/interfaces/useCaseInterface'
import { UserInterface } from '../../../domain/interfaces/userInterface'
import { INJECTIONS } from '../../../infrastructure/config/dependencyInjection/di'
import { UserEntity } from '../../../domain/entities/userEntity'
import { compareSync, hashSync } from "bcryptjs"
import { HttpNotFound } from '../../../application/libraries/httpErrors'
import config from '../../../infrastructure/config/config'
import {  } from "@fastify/jwt";
import { ILoginResponse } from '../../../domain/interfaces/responses/auth/loginResponse'

export class LoginUseCase extends UseCaseBase {
  private userService = diContainer.resolve<UserService>(INJECTIONS.USER_SERVICE)

  override async handler(bodyRequest: ILoginBodyRequest): Promise<ILoginResponse> {
    const user = await this.userService.getUserByEmail(bodyRequest.email)
    if (!compareSync(bodyRequest.password, user.password)) throw new HttpNotFound("USER NOT FOUND");
    const { token, refreshToken } = await this.userService.generateAccessTokenAndRefreshToken(user)
    return {
      user,
      token,
      refreshToken
    }
  }
}
