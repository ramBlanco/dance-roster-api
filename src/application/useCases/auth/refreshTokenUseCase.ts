import { UserService } from "../../../application/services/userService";
import { UseCaseBase } from "../../../domain/interfaces/useCaseInterface";
import { DecodedRefreshToken } from "../../../domain/interfaces/jwtInterfaces";
import { HttpNotFound } from "../../../application/libraries/httpErrors";
import { User } from "~src/infrastructure/database/postgresql/models/user.model";
import { IRefreshTokenResponse } from "~src/domain/interfaces/responses/auth/refreshTokenResponse";

export class RefreshTokenUseCase extends UseCaseBase {

  constructor(
    private readonly userService: UserService
  ) {
    super()
  }

  private async validateUserExists(id: string): Promise<User> {
    const user = await this.userService.getUserById(id)
    if (!user) throw new HttpNotFound('USER_NOT_FOUND')
    return user
  }

  async handler(jwtDecoded: DecodedRefreshToken): Promise<IRefreshTokenResponse> {
    const user = await this.validateUserExists(jwtDecoded.userId);
    const tokens = await this.userService.generateAccessTokenAndRefreshToken(user)
    return tokens;
  }
}