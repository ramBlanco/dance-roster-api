#!/bin/bash

migration_name=$1

if [[ -z "$migration_name" ]]; then
  echo "Por favor, proporciona un nombre de migración."
  exit 1
fi

npm run build
npx sequelize-cli migration:generate --name "$migration_name"

file=$(find ./build/infrastructure/database/postgresql/migrations/ -name "*$migration_name*.js")
file_typescript=$(echo "$file" | sed 's/build/src/g')

mv "$file" "$file_typescript"
mv "$file_typescript" "${file_typescript%.js}.ts"

echo "import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => { },
  down: async (queryInterface: QueryInterface): Promise<void> => { },
};
" > ${file_typescript%.js}.ts


echo "La migración $migration_name.ts ha sido generada."
npm run clean
