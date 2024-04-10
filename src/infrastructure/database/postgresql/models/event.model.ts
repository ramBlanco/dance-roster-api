import { Model, InferAttributes, InferCreationAttributes, Sequelize, CreationOptional } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
  declare id: CreationOptional<string>
  declare tenantId: string
  declare locationId: string
  declare date: Date
  declare title: string
  
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

export const loadEventModel = (db: Sequelize) => {
  Event.init(
    {
      id: {
        type: DataType.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
      locationId: {
        type: DataType.UUID,
        allowNull: false,
        field: 'location_id',
        references: {
          model: 'locations',
          key: 'id',
        },
      },
      date: {
        allowNull: false,
        type: DataType.DATE,
      },
      title: {
        allowNull: false,
        type: DataType.STRING,
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
      tableName: 'events',
      sequelize: db
    }
  )
}


