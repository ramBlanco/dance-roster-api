#!/bin/bash

migration_name=$1

if [[ -z "$migration_name" ]]; then
  echo "Por favor, proporciona un nombre para el seed."
  exit 1
fi

npm run build
npx sequelize-cli seed:generate --name "$migration_name"

file=$(find ./build/infrastructure/database/postgresql/seeders/ -name "*$migration_name*.js")
file_typescript=$(echo "$file" | sed 's/build/src/g')

mv "$file" "$file_typescript"
mv "$file_typescript" "${file_typescript%.js}.ts"

echo "import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkInsert(
      'table_name',
      []
    );
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete('table_name', null);
  },
};
" > ${file_typescript%.js}.ts


echo "El seeder $migration_name.ts ha sido generado."
npm run clean
