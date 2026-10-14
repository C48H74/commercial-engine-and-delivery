// Validates the frontmatter with the real YAML parser (package "yaml"). Usage:
//   npm install yaml        (once, in this script's folder)
//   node validate_yaml.mjs [skill-path]
// With no argument, the skill is searched for the same way as in validate_skill.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
let YAML;
try {
  YAML = require('yaml');
} catch {
  console.log("Package 'yaml' not found. Run 'npm install yaml' in this script's folder.");
  process.exit(2);
}

const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const candidates = [process.argv[2], scriptDir, path.join(scriptDir, 'skill'), path.resolve('skill'), path.resolve('.')].filter(Boolean);
const root = path.resolve(candidates.find((c) => fs.existsSync(path.join(path.resolve(c), 'SKILL.md'))) ?? candidates[0]);
console.log('root: ' + root);

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!m) return null;
  return { data: YAML.parse(m[1]), body: text.slice(m[0].length) };
}

let errors = 0;
let warnings = 0;
const check = (label, text, requireNameDescription) => {
  let fm;
  try { fm = parseFrontmatter(text); }
  catch (e) { console.log('  ERROR ' + label + ': invalid YAML -> ' + String(e.message).split('\n')[0]); errors++; return; }
  if (!fm) { console.log('  ERROR ' + label + ': no frontmatter'); errors++; return; }
  if (typeof fm.data !== 'object' || fm.data === null) { console.log('  ERROR ' + label + ': frontmatter is not an object'); errors++; return; }
  const problems = [];
  if (requireNameDescription) {
    if (typeof fm.data.name !== 'string') problems.push('name is not a string');
    else if (!SKILL_NAME.test(fm.data.name)) problems.push('name does not match the pattern');
    if (typeof fm.data.description !== 'string' || fm.data.description.trim() === '') problems.push('description empty or missing');
    if (fm.data.whenToUse !== undefined && typeof fm.data.whenToUse !== 'string') problems.push('whenToUse is not a string');
  }
  if (problems.length) { console.log('  ERROR ' + label + ': ' + problems.join('; ')); errors++; }
  else console.log('  OK    ' + label.padEnd(42) + ' keys: ' + Object.keys(fm.data).join(', '));
};

console.log('\n=== SKILL.md ===');
check('SKILL.md', fs.readFileSync(path.join(root, 'SKILL.md'), 'utf8'), true);

console.log('\n=== references/ and templates/ ===');
for (const sub of ['references', 'templates']) {
  const dir = path.join(root, sub);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md')).sort())
    check(sub + '/' + f, fs.readFileSync(path.join(dir, f), 'utf8'), false);
}

console.log('\n=== invisible characters in SKILL.md frontmatter ===');
const raw = fs.readFileSync(path.join(root, 'SKILL.md'), 'utf8');
const rawFm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
// Only real invisible characters. Accents (á, ç, ã...) are normal in Portuguese and Spanish.
const INVISIBLE = /[ ­​-‏‪-‮⁠﻿]/g;
const found = rawFm ? [...rawFm[1].matchAll(INVISIBLE)].map((m) => 'U+' + m[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')) : [];
if (found.length) { console.log('  WARN  invisible characters: ' + [...new Set(found)].join(', ')); warnings++; }
else console.log('  OK    no invisible characters in the frontmatter');

console.log(`\nRESULT: ${errors === 0 ? 'frontmatter compatible with the YAML parser' : errors + ' error(s)'}; warnings: ${warnings}`);
process.exit(errors === 0 ? 0 : 1);
