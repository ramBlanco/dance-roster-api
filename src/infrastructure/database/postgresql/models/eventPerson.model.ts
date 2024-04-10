import { Model, InferAttributes, InferCreationAttributes, Sequelize, CreationOptional } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export class EventPerson extends Model<InferAttributes<EventPerson>, InferCreationAttributes<EventPerson>> {
  declare id: CreationOptional<string>
  declare tenantId: string
  declare personId: string
  declare eventId: string
  declare locationId: string
  
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

export const loadEventPersonModel = (db: Sequelize) => {
  EventPerson.init(
    {
      id: {
        type: DataType.BIGINT,
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
      personId: {
        type: DataType.UUID,
        allowNull: false,
        field: 'person_id',
        references: {
          model: 'persons',
          key: 'id',
        },
      },
      eventId: {
        type: DataType.UUID,
        allowNull: false,
        field: 'event_id',
        references: {
          model: 'events',
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
      tableName: 'event_persons',
      sequelize: db
    }
  )
}


