import { AwilixContainer, Lifetime, asFunction } from "awilix";
import { INJECTIONS } from "./di";
import { LoginUseCase } from "../../../application/useCases/auth/loginUseCase";
import { RefreshTokenUseCase } from "../../../application/useCases/auth/refreshTokenUseCase";

export function authDependency(container: AwilixContainer): void {
  container.register({
    [INJECTIONS.LOGIN_USE_CASE]: asFunction(
      () => new LoginUseCase(),
      { lifetime: Lifetime.SCOPED }
    )
  })

  container.register({
    [INJECTIONS.REFRESH_TOKEN_USE_CASE]: asFunction(
      ({ userService }) => new RefreshTokenUseCase(userService),
      { lifetime: Lifetime.SCOPED }
    )
  })
}
