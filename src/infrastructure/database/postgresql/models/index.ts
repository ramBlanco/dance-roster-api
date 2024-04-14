import { Sequelize } from "sequelize";
import { loadEventModel, loadEventRelations } from "./event.model";
import { loadStudentModel } from "./student.model";
import { loadPersonModel, loadPersonRelations } from "./person.model";
import { loadTenantModel } from "./tenant.model";
import { loadEventPersonModel, loadEventPersonRelations } from "./eventPerson.model";
import { loadLocationModel, loadLocationRelation } from "./location.model";
import { loadUserModel } from "./user.model";

export const loadModules = (db: Sequelize) => {
  loadEventModel(db)
  loadEventPersonModel(db)
  loadLocationModel(db)
  loadPersonModel(db)
  loadStudentModel(db)
  loadTenantModel(db)
  loadUserModel(db)

  // ------------------------------- LOAD RELATIONS AFTER MODELS

  loadEventRelations()
  loadLocationRelation()
  loadPersonRelations()
  loadEventPersonRelations()
}