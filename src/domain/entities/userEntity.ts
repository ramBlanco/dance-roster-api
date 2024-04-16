import { User } from "../../infrastructure/database/postgresql/models/user.model";

export type UserEntity = Pick<User, "username">