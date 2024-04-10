import { Sequelize } from "sequelize";
import { loadEventModel } from "./event.model";
import { loadStudentModel } from "./student.model";
import { loadPersonModel } from "./person.model";
import { loadTenantModel } from "./tenant.model";
import { loadEventPersonModel } from "./eventPerson.model";
import { loadLocationModel } from "./location.model";
import { loadUserModel } from "./user.model";

export const loadModules = (db: Sequelize) => {
  loadEventModel(db)
  loadEventPersonModel(db)
  loadLocationModel(db)
  loadPersonModel(db)
  loadStudentModel(db)
  loadTenantModel(db)
  loadUserModel(db)
}