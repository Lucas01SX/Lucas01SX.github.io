import { execSync } from 'child_process';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

try {
  await import('@resvg/resvg-js');
} catch {
  console.log('Installing @resvg/resvg-js...');
  execSync('npm install @resvg/resvg-js --no-save', { stdio: 'inherit', cwd: root });
}

const { Resvg } = await import('@resvg/resvg-js');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0a0a0f"/>
  <defs>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1e1e2e" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <rect x="80" y="160" width="4" height="310" fill="#3b82f6" rx="2"/>

  <text x="112" y="265"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="72" font-weight="700" fill="#e2e8f0" letter-spacing="-1"
  >Lucas Santana</text>

  <text x="112" y="340"
    font-family="system-ui, -apple-system, sans-serif"
    font-size="32" font-weight="500" fill="#3b82f6"
  >Backend Developer</text>

  <!-- Stack chips — centered on x=600 (total block 434px, startX=383) -->
  <rect x="383" y="380" width="140" height="42" rx="6" fill="#1e1e2e"/>
  <text x="453" y="406" font-family="monospace, monospace" font-size="18" fill="#3b82f6" text-anchor="middle">.NET / C#</text>

  <rect x="535" y="380" width="120" height="42" rx="6" fill="#1e1e2e"/>
  <text x="595" y="406" font-family="monospace, monospace" font-size="18" fill="#3b82f6" text-anchor="middle">Angular</text>

  <rect x="667" y="380" width="150" height="42" rx="6" fill="#1e1e2e"/>
  <text x="742" y="406" font-family="monospace, monospace" font-size="18" fill="#3b82f6" text-anchor="middle">TypeScript</text>

  <line x1="80" y1="450" x2="1120" y2="450" stroke="#1e1e2e" stroke-width="1"/>

  <text x="112" y="500"
    font-family="monospace, monospace" font-size="22" fill="#475569"
  >lucas01sx.github.io</text>

  <circle cx="1000" cy="180" r="3" fill="#1e1e2e"/>
  <circle cx="1040" cy="180" r="3" fill="#1e1e2e"/>
  <circle cx="1080" cy="180" r="3" fill="#3b82f6"/>
  <circle cx="1120" cy="180" r="3" fill="#1e1e2e"/>
  <circle cx="1000" cy="220" r="3" fill="#1e1e2e"/>
  <circle cx="1040" cy="220" r="3" fill="#3b82f6"/>
  <circle cx="1080" cy="220" r="3" fill="#1e1e2e"/>
  <circle cx="1120" cy="220" r="3" fill="#1e1e2e"/>
  <circle cx="1000" cy="260" r="3" fill="#3b82f6"/>
  <circle cx="1040" cy="260" r="3" fill="#1e1e2e"/>
  <circle cx="1080" cy="260" r="3" fill="#1e1e2e"/>
  <circle cx="1120" cy="260" r="3" fill="#3b82f6"/>
  <circle cx="1000" cy="300" r="3" fill="#1e1e2e"/>
  <circle cx="1040" cy="300" r="3" fill="#1e1e2e"/>
  <circle cx="1080" cy="300" r="3" fill="#3b82f6"/>
  <circle cx="1120" cy="300" r="3" fill="#1e1e2e"/>
</svg>`;

const outPath = join(root, 'public', 'assets', 'og-image.png');
mkdirSync(join(root, 'public', 'assets'), { recursive: true });

const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
writeFileSync(outPath, resvg.render().asPng());

console.log('OG image generated → public/assets/og-image.png');
