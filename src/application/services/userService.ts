import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { UserRepository } from '../../infrastructure/repositories/userRepository'
import { diContainer } from '@fastify/awilix'
import { User } from '../../infrastructure/database/postgresql/models/user.model'
import { signJWTRefresh, signParamsWithJWT } from '../libraries/jwtSigner'
import { TokenTypes } from '../../domain/interfaces/jwtInterfaces'

export class UserService {
  private userRepository = diContainer.resolve<UserRepository>(INJECTIONS.USER_REPOSITORY)

  public async sayHello(): Promise<string> {
    return this.userRepository.name()
  }

  public async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.getUserById(id)
    return user
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email)
    return user
  }

  private generateAccessToken(user: User): string {
    const token = signParamsWithJWT({
      type: TokenTypes.AUTOLOGIN,
      userId: user.get('id'),
      tenantId: user.tenantId,
      verifiedAt: user.verifiedAt,
    })
    return token
  }

  public async generateAccessTokenAndRefreshToken(user: User): Promise<{ token: string; refreshToken: string }> {
    const token = this.generateAccessToken(user)
    const refreshToken = signJWTRefresh({ userId: user.id, type: TokenTypes.REFRESH })
    return { token, refreshToken: refreshToken }
  }
}
