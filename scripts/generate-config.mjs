import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { loadEnvFile } from 'node:process';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(projectRoot, '.env');
const angularConfigPath = join(projectRoot, 'angular.json');

try {
  if (existsSync(envPath)) {
    // Angular replaces this value during the browser build; it cannot read .env directly.
    loadEnvFile(envPath);
  }
} catch {
  // Ignore missing or unreadable .env files so builds do not fail in Vercel or CI.
}

const angularConfig = JSON.parse(await readFile(angularConfigPath, 'utf8'));
const buildOptions = angularConfig.projects['my-book-paperid'].architect.build.options;
const apiHost = process.env.API_HOST ?? '';

buildOptions.define = {
  ...(buildOptions.define ?? {}),
  'process.env.API_HOST': JSON.stringify(apiHost),
};

await writeFile(angularConfigPath, `${JSON.stringify(angularConfig, null, 2)}\n`);
console.log('Loaded env config into Angular build');
