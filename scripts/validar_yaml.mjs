// Valida o frontmatter com o parser YAML real (pacote "yaml"). Uso:
//   npm install yaml        (uma vez, na pasta deste script)
//   node validar_yaml.mjs [caminho-da-skill]
// Sem argumento, a skill é procurada como na validar_skill.mjs.
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
  console.log("Pacote 'yaml' não encontrado. Rode 'npm install yaml' na pasta deste script.");
  process.exit(2);
}

const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const candidatos = [process.argv[2], scriptDir, path.join(scriptDir, 'skill'), path.resolve('skill'), path.resolve('.')].filter(Boolean);
const root = path.resolve(candidatos.find((c) => fs.existsSync(path.join(path.resolve(c), 'SKILL.md'))) ?? candidatos[0]);
console.log('raiz: ' + root);

function parseFrontmatter(texto) {
  const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!m) return null;
  return { data: YAML.parse(m[1]), body: texto.slice(m[0].length) };
}

let erros = 0;
let avisos = 0;
const checar = (rotulo, texto, exigirNomeDescricao) => {
  let fm;
  try { fm = parseFrontmatter(texto); }
  catch (e) { console.log('  ERRO  ' + rotulo + ': YAML inválido -> ' + String(e.message).split('\n')[0]); erros++; return; }
  if (!fm) { console.log('  ERRO  ' + rotulo + ': sem frontmatter'); erros++; return; }
  if (typeof fm.data !== 'object' || fm.data === null) { console.log('  ERRO  ' + rotulo + ': frontmatter não é objeto'); erros++; return; }
  const problemas = [];
  if (exigirNomeDescricao) {
    if (typeof fm.data.name !== 'string') problemas.push('name não é string');
    else if (!SKILL_NAME.test(fm.data.name)) problemas.push('name não casa o padrão');
    if (typeof fm.data.description !== 'string' || fm.data.description.trim() === '') problemas.push('description vazia ou ausente');
    if (fm.data.whenToUse !== undefined && typeof fm.data.whenToUse !== 'string') problemas.push('whenToUse não é string');
  }
  if (problemas.length) { console.log('  ERRO  ' + rotulo + ': ' + problemas.join('; ')); erros++; }
  else console.log('  OK    ' + rotulo.padEnd(42) + ' chaves: ' + Object.keys(fm.data).join(', '));
};

console.log('\n=== SKILL.md ===');
checar('SKILL.md', fs.readFileSync(path.join(root, 'SKILL.md'), 'utf8'), true);

console.log('\n=== references/ e templates/ ===');
for (const sub of ['references', 'templates']) {
  const dir = path.join(root, sub);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md')).sort())
    checar(sub + '/' + f, fs.readFileSync(path.join(dir, f), 'utf8'), false);
}

console.log('\n=== caracteres invisíveis no frontmatter do SKILL.md ===');
const bruto = fs.readFileSync(path.join(root, 'SKILL.md'), 'utf8');
const fmBruto = bruto.match(/^---\r?\n([\s\S]*?)\r?\n---/);
// Só caracteres invisíveis de verdade. Acentos (á, ç, ã...) são normais em português.
const INVISIVEIS = /[ ­​-‏‪-‮⁠﻿]/g;
const achados = fmBruto ? [...fmBruto[1].matchAll(INVISIVEIS)].map((m) => 'U+' + m[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')) : [];
if (achados.length) { console.log('  AVISO caracteres invisíveis: ' + [...new Set(achados)].join(', ')); avisos++; }
else console.log('  OK    nenhum caractere invisível no frontmatter');

console.log(`\nRESULTADO: ${erros === 0 ? 'frontmatter compatível com o parser YAML' : erros + ' erro(s)'}; avisos: ${avisos}`);
process.exit(erros === 0 ? 0 : 1);
