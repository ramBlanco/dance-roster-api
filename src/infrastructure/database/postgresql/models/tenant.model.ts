import { Model, InferAttributes, InferCreationAttributes, Sequelize, CreationOptional } from 'sequelize';
import { DataType } from 'sequelize-typescript';
import { User } from './user.model';

export class Tenant extends Model<InferAttributes<Tenant>, InferCreationAttributes<Tenant>> {
  declare id: CreationOptional<string>
  declare name: string
  
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

export const loadTenantModel = (db: Sequelize) => {
  Tenant.init(
    {
      id: {
        type: DataType.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
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
      tableName: 'tenants',
      sequelize: db
    }
  )
}

export const loadTenantRelations = () => {
  Tenant.hasOne(User, { sourceKey: 'id', foreignKey: 'tenantId' });
}

