import { AwilixContainer, Lifetime, asFunction } from "awilix";
import { UserService } from "../../../application/services/userService";
import { INJECTIONS } from "./di";
import { UserRepository } from "../../../infrastructure/repositories/userRepository";

export function userDependency(container: AwilixContainer): void {
  container.register({
    [INJECTIONS.USER_SERVICE]: asFunction(
      () => new UserService(),
      { lifetime: Lifetime.SCOPED }
    )
  })

  container.register({
    [INJECTIONS.USER_REPOSITORY]: asFunction(
      () => new UserRepository(),
      { lifetime: Lifetime.SINGLETON }
    )
  })
}
