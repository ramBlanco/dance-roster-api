import { Model, InferAttributes, InferCreationAttributes, Sequelize, CreationOptional, ForeignKey, NonAttribute } from 'sequelize';
import { DataType } from 'sequelize-typescript';
import { Person } from './person.model';
import { Tenant } from './tenant.model';
import { Event } from './event.model';
import { Location } from './location.model';

export class EventPerson extends Model<InferAttributes<EventPerson>, InferCreationAttributes<EventPerson>> {
  declare id: CreationOptional<string>
  declare tenantId: ForeignKey<Tenant['id']>
  declare personId: ForeignKey<Person['id']>
  declare eventId: ForeignKey<Event['id']>
  declare locationId: ForeignKey<Location['id']>

  declare tenant?: NonAttribute<Tenant>;
  declare person?: NonAttribute<Person>;
  declare event?: NonAttribute<Event>;
  declare location?: NonAttribute<Location>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

export const loadEventPersonModel = (db: Sequelize) => {
  EventPerson.init(
    {
      id: {
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false
      },
      tenantId: {
        type: DataType.UUID,
        allowNull: false,
        field: 'tenant_id',
      },
      personId: {
        type: DataType.UUID,
        allowNull: false,
        field: 'person_id',
      },
      eventId: {
        type: DataType.UUID,
        allowNull: false,
        field: 'event_id',
      },
      locationId: {
        type: DataType.UUID,
        allowNull: false,
        field: 'location_id',
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
      sequelize: db,
    }
  )
}

export const loadEventPersonRelations = () => {
  EventPerson.belongsTo(Person, { targetKey: 'id', foreignKey: 'personId' })
  EventPerson.belongsTo(Tenant, { targetKey: 'id', foreignKey: 'tenantId' })
  EventPerson.belongsTo(Location, { targetKey: 'id', foreignKey: 'locationId' })
  EventPerson.belongsTo(Event, { targetKey: 'id', foreignKey: 'eventId' })
}


