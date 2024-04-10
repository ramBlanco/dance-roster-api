import { Model, InferAttributes, InferCreationAttributes, Sequelize, CreationOptional } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export class Location extends Model<InferAttributes<Location>, InferCreationAttributes<Location>> {
  declare id: CreationOptional<string>
  declare name: string
  declare address: CreationOptional<string>;
  declare tenantId: string
  
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

export const loadLocationModel = (db: Sequelize) => {
  Location.init(
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
      address: {
        type: DataType.STRING,
        allowNull: true,
      },
      tenantId: {
        type: DataType.UUID,
        allowNull: false,
        field: 'tenant_id',
        references: {
          model: 'tenants',
          key: 'id',
        },
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
      tableName: 'locations',
      sequelize: db
    }
  )
}


