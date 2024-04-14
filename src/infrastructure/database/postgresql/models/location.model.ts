import { Model, InferAttributes, InferCreationAttributes, Sequelize, CreationOptional, NonAttribute, Association } from 'sequelize';
import { DataType } from 'sequelize-typescript';
import { Event } from './event.model';

export class Location extends Model<InferAttributes<Location, { omit: 'events' }>, InferCreationAttributes<Location, { omit: 'events' }>> {
  declare id: CreationOptional<string>
  declare name: string
  declare address: CreationOptional<string>;
  declare tenantId: string

  declare events?: NonAttribute<Event[]>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare static associations: {
    events: Association<Location, Event>;
  };
}

export const loadLocationModel = (db: Sequelize) => {
  Location.init(
    {
      id: {
        type: DataType.UUID,
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
      modelName: 'locations',
      timestamps: true,
      paranoid: true,
      tableName: 'locations',
      sequelize: db
    }
  )
}

export const loadLocationRelation = () => {
  Location.hasMany(Event, { sourceKey: 'id', foreignKey: 'locationId', as: 'events' });
}
