import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('tenants', {
        id: {
          allowNull: false,
          primaryKey: true,
          unique: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        deleted_at: {
          allowNull: true,
          type: DataTypes.DATE,
        },
      }, { transaction })

      await queryInterface.sequelize.query(
        `ALTER TABLE tenants ALTER COLUMN id SET DEFAULT uuid_generate_v1();`,
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('tenants');
  },
};

