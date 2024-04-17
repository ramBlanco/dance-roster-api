import { Sequelize } from "sequelize"
import { sequelizeOptions } from "../../infrastructure/database/postgresql"
import { loadModules } from "../../infrastructure/database/postgresql/models"

export class DatabaseAdapter {
  private sequelize: Sequelize
  constructor() {
    this.sequelize = new Sequelize(sequelizeOptions)
  }

  async connect() {
    try {
      await this.sequelize.authenticate()
      console.info('Database connection is successfully established.')
      loadModules(this.sequelize)
    } catch (err) {
      console.error(`Connection could not be established: ${err}`)
    }
  }
  
}