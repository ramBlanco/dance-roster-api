import { Model, InferAttributes, InferCreationAttributes, Sequelize, CreationOptional } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export class Person extends Model<InferAttributes<Person>, InferCreationAttributes<Person>> {
  declare id: CreationOptional<string>
  declare birthDate: Date
  declare email: string
  declare firstName: string
  declare lastName: string
  
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

export const loadPersonModel = (db: Sequelize) => {
  Person.init(
    {
      id: {
        type: DataType.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      birthDate: {
        field:'birth_date',
        type: DataType.DATE,
        allowNull: false,
      },
      email: {
        type: DataType.STRING,
        allowNull: false
      },
      firstName: {
        field:'first_name',
        type: DataType.STRING,
        allowNull: false
      },
      lastName: {
        field: 'last_name',
        type: DataType.STRING,
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
      deletedAt: {
        type: DataType.DATE,
        allowNull: true,
        field: 'deleted_at'
      },
    },
    {
      timestamps: true,
      paranoid: true,
      tableName: 'persons',
      sequelize: db
    }
  )
}


