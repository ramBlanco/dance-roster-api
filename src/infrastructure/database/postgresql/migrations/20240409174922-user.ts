import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          primaryKey: true,
          unique: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
        },
        tenant_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'tenants',
            key: 'id',
          },
        },
        username: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        verified_at: {
          allowNull: true,
          type: DataTypes.DATE,
        },
        verify_token: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        verify_expiry_at: {
          allowNull: true,
          type: DataTypes.DATE,
        },
        created_at: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updated_at: {
          allowNull: true,
          type: DataTypes.DATE,
        },
        deleted_at: {
          allowNull: true,
          type: DataTypes.DATE,
        },
      }, { transaction });

      await queryInterface.sequelize.query(
        `ALTER TABLE users ALTER COLUMN id SET DEFAULT uuid_generate_v1();`,
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('users');
  },
};

