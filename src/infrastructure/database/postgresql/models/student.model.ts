import { Model, InferAttributes, InferCreationAttributes, Sequelize, CreationOptional } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export class Student extends Model<InferAttributes<Student>, InferCreationAttributes<Student>> {
  declare id: CreationOptional<string>
  
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const loadStudentModel = (db: Sequelize) => {
  Student.init(
    {
      id: {
        type: DataType.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      createdAt: {
        type: DataType.DATE,
        allowNull: true,
        field: 'created_at'
      },
      updatedAt: {
        type: DataType.DATE,
        allowNull: true,
        field: 'updated_at'
      },
    },
    {
      timestamps: true,
      paranoid: true,
      tableName: 'students',
      sequelize: db
    }
  )
}


