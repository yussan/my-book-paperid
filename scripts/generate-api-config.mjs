import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { loadEnvFile } from 'node:process';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(projectRoot, '.env');
const angularConfigPath = join(projectRoot, 'angular.json');

// Angular replaces this value during the browser build; it cannot read .env directly.
loadEnvFile(envPath);

const angularConfig = JSON.parse(await readFile(angularConfigPath, 'utf8'));
const buildOptions = angularConfig.projects['my-book-paperid'].architect.build.options;

buildOptions.define = {
  ...(buildOptions.define ?? {}),
  'process.env.API_HOST': JSON.stringify(process.env.API_HOST),
};

await writeFile(angularConfigPath, `${JSON.stringify(angularConfig, null, 2)}\n`);
console.log('Loaded .env into process.env');
