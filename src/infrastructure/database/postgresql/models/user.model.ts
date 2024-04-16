import { Model, InferAttributes, InferCreationAttributes, Sequelize, CreationOptional, Association, NonAttribute } from 'sequelize';
import { DataType } from 'sequelize-typescript';
import { Tenant } from './tenant.model';

export class User extends Model<InferAttributes<User,  { omit: 'tenant' }>, InferCreationAttributes<User,  { omit: 'tenant' }>> {
  declare id: CreationOptional<string>
  declare username: string;
  declare password: string;
  declare tenantId: string;
  declare verifiedAt: CreationOptional<Date>;
  declare verifyToken: CreationOptional<string>;
  declare verifyExpiryAt: CreationOptional<Date>;

  declare tenant?: NonAttribute<Tenant>;
 
  declare static associations: {
    tenant: Association<Tenant>;
  };
  
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

export const loadUserModel = (db: Sequelize) => {
  User.init(
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
      username: {
        type: DataType.STRING,
        allowNull: false,
      },
      password: {
        type: DataType.STRING,
        allowNull: false
      },
      verifiedAt: {
        type: DataType.DATE,
        allowNull: true,
        field: 'verified_at'
      },
      verifyToken: {
        type: DataType.STRING,
        allowNull: true,
        field: 'verify_token'
      },
      verifyExpiryAt: {
        type: DataType.DATE,
        allowNull: true,
        field: 'verify_expiry_at'
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
      tableName: 'users',
      sequelize: db
    }
  )
}

export const loadUserRelations = () => {
  User.belongsTo(Tenant, { targetKey: 'id', foreignKey: 'tenantId', as: 'tenant' });
}

