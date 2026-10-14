// Validates the skill structure. Usage:
//   node validate_skill.mjs [skill-path]
// No argument: uses the folder containing this script (if it has ./SKILL.md) or ./skill.
// Rules: SKILL.md has YAML frontmatter; name matches ^[a-z0-9]+(?:-[a-z0-9]+)*$; description is not empty;
// cited references/templates exist; every references/templates file has frontmatter.
// Simple frontmatter parser (key: value). For validation with the real YAML parser, use validate_yaml.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const candidates = [process.argv[2], scriptDir, path.join(scriptDir, 'skill'), path.resolve('skill'), path.resolve('.')].filter(Boolean);
const root = path.resolve(candidates.find((c) => fs.existsSync(path.join(path.resolve(c), 'SKILL.md'))) ?? candidates[0]);

let errors = 0;
let warnings = 0;
const ok = (m) => console.log('  OK    ' + m);
const error = (m) => { errors++; console.log('  ERROR ' + m); };
const warn = (m) => { warnings++; console.log('  WARN  ' + m); };

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return null;
  const data = {};
  let currentKey = null;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s?(.*)$/);
    if (kv) { currentKey = kv[1]; data[currentKey] = kv[2].trim(); }
    else if (currentKey && line.trim()) data[currentKey] += ' ' + line.trim();
  }
  return { data, body: text.slice(m[0].length) };
}

console.log('=== 1. Structure ===');
console.log('  root: ' + root);
if (!fs.existsSync(path.join(root, 'SKILL.md'))) { error('SKILL.md not found in ' + root); process.exit(1); }
ok('SKILL.md present');
for (const sub of ['references', 'templates']) {
  if (fs.existsSync(path.join(root, sub))) ok(sub + '/ present');
  else error(sub + '/ missing');
}

console.log('\n=== 2. SKILL.md frontmatter ===');
const skillText = fs.readFileSync(path.join(root, 'SKILL.md'), 'utf8');
const fm = frontmatter(skillText);
if (!fm) error('SKILL.md has no YAML frontmatter: the loader ignores the skill');
else {
  const { data, body } = fm;
  if (!data.name) error('"name" field missing');
  else if (!SKILL_NAME.test(data.name)) error(`name "${data.name}" does not match ${SKILL_NAME}`);
  else ok(`valid name: "${data.name}"`);
  if (data.name && path.basename(root) !== 'skill' && data.name !== path.basename(root))
    warn(`name ("${data.name}") differs from the folder name ("${path.basename(root)}")`);
  if (!data.description) error('"description" field missing or empty');
  else if (data.description.length < 40) warn(`short description (${data.description.length} chars): may not route well`);
  else ok(`description: ${data.description.length} chars`);
  if (data.whenToUse) ok(`whenToUse present: ${data.whenToUse.length} chars`);
  else warn('whenToUse missing (optional)');
  console.log(`  body: ${body.trim().split(/\r?\n/).length} lines, ${body.length} chars`);
  if (/^## (Limites conhecidos|Límites conocidos|Known limits)/m.test(body)) ok('"Known limits" section present');
  else warn('"Known limits" section missing: the skill should declare what was not verified');
}

console.log('\n=== 3. references and templates files ===');
const listFiles = (sub) => fs.existsSync(path.join(root, sub))
  ? fs.readdirSync(path.join(root, sub)).filter((f) => f.endsWith('.md')).sort() : [];
const files = [...listFiles('references').map((f) => 'references/' + f), ...listFiles('templates').map((f) => 'templates/' + f)];
for (const rel of files) {
  const f2 = frontmatter(fs.readFileSync(path.join(root, rel), 'utf8'));
  if (!f2) error(`${rel}: no frontmatter`);
  else if (!f2.data.title) error(`${rel}: frontmatter without "title"`);
  else ok(`${rel}`);
}

console.log('\n=== 4. Cross-references (SKILL.md and other files) ===');
const targets = new Set();
const origins = [['SKILL.md', skillText], ...files.map((rel) => [rel, fs.readFileSync(path.join(root, rel), 'utf8')])];
for (const [origin, text] of origins) {
  for (const m of text.matchAll(/(?:references|templates)\/[a-z0-9-]+\.md/g)) {
    targets.add(m[0]);
    if (!fs.existsSync(path.join(root, m[0]))) error(`${origin} points to ${m[0]}, which does not exist`);
  }
}
ok(`${targets.size} distinct internal targets verified`);
for (const rel of files) if (!targets.has(rel)) warn(`file not cited anywhere: ${rel}`);

console.log('\n=== 5. Honesty markers ===');
let nPlaceholder = 0;
let nUnverified = 0;
for (const rel of files) {
  const txt = fs.readFileSync(path.join(root, rel), 'utf8');
  nPlaceholder += (txt.match(/\[to fill in\]/g) || []).length;
  nUnverified += (txt.match(/not verified/g) || []).length;
}
console.log(`  info  ${nPlaceholder} [to fill in] placeholders; ${nUnverified} "not verified" markers`);

console.log('\n=== SUMMARY ===');
console.log(`  errors: ${errors}   warnings: ${warnings}`);
console.log(errors === 0 ? '  RESULT: structure VALID' : '  RESULT: fix the errors above');
process.exit(errors === 0 ? 0 : 1);
