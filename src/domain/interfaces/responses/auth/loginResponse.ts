import { UserEntity } from "../../../entities/userEntity"

export interface ILoginResponse {
  user: UserEntity
  token: string
  refreshToken: string
}