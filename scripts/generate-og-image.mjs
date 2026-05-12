import { execSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Install resvg-js if not present
try {
  await import('@resvg/resvg-js');
} catch {
  console.log('Installing @resvg/resvg-js...');
  execSync('npm install @resvg/resvg-js --no-save', { stdio: 'inherit', cwd: root });
}

const { Resvg } = await import('@resvg/resvg-js');

const svgPath = join(__dirname, 'og-image.svg');
const outPath = join(root, 'public', 'assets', 'og-image.png');

mkdirSync(join(root, 'public', 'assets'), { recursive: true });

const svg = readFileSync(svgPath, 'utf8');
const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
});
const png = resvg.render().asPng();
writeFileSync(outPath, png);

console.log(`OG image generated → public/assets/og-image.png`);
