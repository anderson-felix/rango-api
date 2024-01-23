import { execSync } from 'child_process';

const migrationName = process.argv[2];

execSync(`yarn typeorm migration:create src/shared/infra/typeorm/migrations/${migrationName}`, { stdio: 'inherit' });

try {
  execSync(`sudo chmod 777 ${process.cwd()}/src/shared/infra/typeorm/migrations/*${migrationName}.ts`, { stdio: 'inherit' });
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(`Failed on change migration permissions`);
}
