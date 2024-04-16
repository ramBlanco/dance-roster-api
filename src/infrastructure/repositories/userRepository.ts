import { HttpNotFound } from "../../application/libraries/httpErrors";
import { UserEntity } from "../../domain/entities/userEntity";
import { Tenant } from "../database/postgresql/models/tenant.model";
import { User } from "../database/postgresql/models/user.model";

export class UserRepository {
  public name(): string {
    return 'my name is...'
  }

  public async getUserByEmail(username: string): Promise<User> {
    const user = await User.findOne({ where: { username: username }, include: { model: Tenant, required: true, as: 'tenant' } })
    if (!user) throw new HttpNotFound("USER NOT FOUND")
    return user
  }

  public async getUserById(id: string): Promise<User | null> {
    const user = await User.findOne({ where: { id } })
    return user
  }
}
