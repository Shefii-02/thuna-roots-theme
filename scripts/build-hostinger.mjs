import { cpSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');
const outputDir = join(root, 'hostinger');

mkdirSync(outputDir, { recursive: true });

if (!existsSync(distDir)) {
  console.error('dist directory not found. Run npm run build first.');
  process.exit(1);
}

cpSync(distDir, outputDir, { recursive: true });

const publicHtaccess = join(root, 'public', '.htaccess');
if (existsSync(publicHtaccess)) {
  copyFileSync(publicHtaccess, join(outputDir, '.htaccess'));
}

console.log(`Hostinger deployment files prepared in ${outputDir}`);
