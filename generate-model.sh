#!/bin/bash

model_name=$1

if [[ -z "$model_name" ]]; then
  echo "Por favor, proporciona un nombre para el seed."
  exit 1
fi

capitalize_name=$(echo "$model_name" | sed -e 's/\b\(.\)/\u\1/g')

touch ./src/infrastructure/database/postgresql/models/"$model_name".model.ts

echo "import { Model, InferAttributes, InferCreationAttributes, Sequelize, CreationOptional } from 'sequelize';
import { DataType } from 'sequelize-typescript';

export class $capitalize_name extends Model<InferAttributes<$capitalize_name>, InferCreationAttributes<$capitalize_name>> {
  declare id: CreationOptional<number>
  
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const load"$capitalize_name"Model = (db: Sequelize) => {
  $capitalize_name.init(
    {
      id: {
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
    },
    {
      timestamps: true,
      paranoid: true,
      tableName: 'CHANGE_ME', //TODO: change me
      sequelize: db
    }
  )
}

" > ./src/infrastructure/database/postgresql/models/"$model_name".model.ts

echo "El modelo $model_name.model.ts ha sido generado."