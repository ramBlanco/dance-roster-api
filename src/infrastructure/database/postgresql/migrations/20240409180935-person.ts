import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('persons', {
        id: {
          allowNull: false,
          primaryKey: true,
          unique: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
        },
        birth_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false
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
      }, { transaction })

      await queryInterface.sequelize.query(
        `ALTER TABLE persons ALTER COLUMN id SET DEFAULT uuid_generate_v1();`,
        { transaction },
      );

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('persons');
  },
};

