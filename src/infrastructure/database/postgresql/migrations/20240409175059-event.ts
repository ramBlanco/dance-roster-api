import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('events', {
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
        location_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'locations',
            key: 'id',
          },
        },
        slug: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        date: {
          allowNull: true,
          type: DataTypes.DATE,
        },
        title: {
          allowNull: false,
          type: DataTypes.STRING,
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
        `ALTER TABLE events ALTER COLUMN id SET DEFAULT uuid_generate_v1();`,
        { transaction },
      );

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('events');
  },
};

