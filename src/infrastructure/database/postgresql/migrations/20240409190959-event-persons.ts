import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('event_persons', {
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
        person_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'persons',
            key: 'id',
          },
        },
        event_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'events',
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
      }, {transaction})

      await queryInterface.sequelize.query(
        `ALTER TABLE event_persons ALTER COLUMN id SET DEFAULT uuid_generate_v1();`,
        { transaction },
      );

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('event_persons');
  },
};

