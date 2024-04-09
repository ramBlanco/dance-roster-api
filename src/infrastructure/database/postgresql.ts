import { Options } from 'sequelize'
import Config from '../config/config'

export const sequelizeOptions: Options = {
  host: Config.database.postgresHost,
  database: Config.database.postgresDb,
  username: Config.database.postgresUser,
  password: Config.database.postgresPassword,
  port: Number(Config.database.postgresPort),
  dialect: 'postgres',
}
