import { INJECTIONS } from '../../infrastructure/config/dependencyInjection/di'
import { UserRepository } from '../../infrastructure/repositories/userRepository'
import { UserInterface } from '../../domain/interfaces/userInterface'
import { diContainer } from '@fastify/awilix'

export class UserService {
  private userRepository = diContainer.resolve<UserRepository>(INJECTIONS.USER_REPOSITORY)

  public async sayHello(): Promise<string> {
    return this.userRepository.name()
  }

  public async getUserByEmail(email: string): Promise<UserInterface> {
    return {
      email: email,
      username: email,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }
}
