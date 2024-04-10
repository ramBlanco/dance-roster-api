import { AwilixContainer, Lifetime, asFunction } from "awilix";
import { INJECTIONS } from "./di";
import { LoginUseCase } from "../../../application/useCases/auth/loginUseCase";

export function authDependency(container: AwilixContainer): void {
  container.register({
    [INJECTIONS.LOGIN_USE_CASE]: asFunction(
      () => new LoginUseCase(),
      { lifetime: Lifetime.SCOPED }
    )
  })
}
