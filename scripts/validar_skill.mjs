// Valida a estrutura da skill. Uso:
//   node validar_skill.mjs [caminho-da-skill]
// Sem argumento: usa a pasta onde este script está (se houver ./SKILL.md) ou ./skill.
// Regras: SKILL.md com frontmatter YAML; name casa ^[a-z0-9]+(?:-[a-z0-9]+)*$; description não vazia;
// referencias/templates citados existem; cada arquivo de references/templates tem frontmatter.
// Parser simples de frontmatter (chave: valor). Para validação com o parser YAML real, use validar_yaml.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const candidatos = [process.argv[2], scriptDir, path.join(scriptDir, 'skill'), path.resolve('skill'), path.resolve('.')].filter(Boolean);
const root = path.resolve(candidatos.find((c) => fs.existsSync(path.join(path.resolve(c), 'SKILL.md'))) ?? candidatos[0]);

let erros = 0;
let avisos = 0;
const ok = (m) => console.log('  OK    ' + m);
const erro = (m) => { erros++; console.log('  ERRO  ' + m); };
const aviso = (m) => { avisos++; console.log('  AVISO ' + m); };

function frontmatter(texto) {
  const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return null;
  const dados = {};
  let chaveAtual = null;
  for (const linha of m[1].split(/\r?\n/)) {
    const kv = linha.match(/^([A-Za-z][A-Za-z0-9_-]*):\s?(.*)$/);
    if (kv) { chaveAtual = kv[1]; dados[chaveAtual] = kv[2].trim(); }
    else if (chaveAtual && linha.trim()) dados[chaveAtual] += ' ' + linha.trim();
  }
  return { dados, corpo: texto.slice(m[0].length) };
}

console.log('=== 1. Estrutura ===');
console.log('  raiz: ' + root);
if (!fs.existsSync(path.join(root, 'SKILL.md'))) { erro('SKILL.md não encontrado em ' + root); process.exit(1); }
ok('SKILL.md presente');
for (const sub of ['references', 'templates']) {
  if (fs.existsSync(path.join(root, sub))) ok(sub + '/ presente');
  else erro(sub + '/ ausente');
}

console.log('\n=== 2. Frontmatter do SKILL.md ===');
const textoSkill = fs.readFileSync(path.join(root, 'SKILL.md'), 'utf8');
const fm = frontmatter(textoSkill);
if (!fm) erro('SKILL.md sem frontmatter YAML: o loader ignora a skill');
else {
  const { dados, corpo } = fm;
  if (!dados.name) erro('campo "name" ausente');
  else if (!SKILL_NAME.test(dados.name)) erro(`name "${dados.name}" não casa ${SKILL_NAME}`);
  else ok(`name válido: "${dados.name}"`);
  if (dados.name && path.basename(root) !== 'skill' && dados.name !== path.basename(root))
    aviso(`name ("${dados.name}") difere do nome da pasta ("${path.basename(root)}")`);
  if (!dados.description) erro('campo "description" ausente ou vazio');
  else if (dados.description.length < 40) aviso(`description curta (${dados.description.length} chars): pode não rotear bem`);
  else ok(`description: ${dados.description.length} chars`);
  if (dados.whenToUse) ok(`whenToUse presente: ${dados.whenToUse.length} chars`);
  else aviso('whenToUse ausente (opcional)');
  console.log(`  corpo: ${corpo.trim().split(/\r?\n/).length} linhas, ${corpo.length} chars`);
  if (/^## (Limites conhecidos|Límites conocidos|Known limits)/m.test(corpo)) ok('seção "Limites conhecidos" presente');
  else aviso('seção "Limites conhecidos" ausente: a skill deveria declarar o que não foi verificado');
}

console.log('\n=== 3. Arquivos de references e templates ===');
const listar = (sub) => fs.existsSync(path.join(root, sub))
  ? fs.readdirSync(path.join(root, sub)).filter((f) => f.endsWith('.md')).sort() : [];
const arquivos = [...listar('references').map((f) => 'references/' + f), ...listar('templates').map((f) => 'templates/' + f)];
for (const rel of arquivos) {
  const f2 = frontmatter(fs.readFileSync(path.join(root, rel), 'utf8'));
  if (!f2) erro(`${rel}: sem frontmatter`);
  else if (!f2.dados.title) erro(`${rel}: frontmatter sem "title"`);
  else ok(`${rel}`);
}

console.log('\n=== 4. Referências cruzadas (SKILL.md e demais arquivos) ===');
const alvos = new Set();
const origens = [['SKILL.md', textoSkill], ...arquivos.map((rel) => [rel, fs.readFileSync(path.join(root, rel), 'utf8')])];
for (const [origem, texto] of origens) {
  for (const m of texto.matchAll(/(?:references|templates)\/[a-z0-9-]+\.md/g)) {
    alvos.add(m[0]);
    if (!fs.existsSync(path.join(root, m[0]))) erro(`${origem} aponta para ${m[0]}, que não existe`);
  }
}
ok(`${alvos.size} alvos internos distintos verificados`);
for (const rel of arquivos) if (!alvos.has(rel)) aviso(`arquivo não citado em nenhum lugar: ${rel}`);

console.log('\n=== 5. Marcadores de honestidade ===');
let nPreencher = 0;
let nNaoVerificado = 0;
for (const rel of arquivos) {
  const txt = fs.readFileSync(path.join(root, rel), 'utf8');
  nPreencher += (txt.match(/\[a preencher\]/g) || []).length;
  nNaoVerificado += (txt.match(/não verificado/g) || []).length;
}
console.log(`  info  ${nPreencher} marcadores [a preencher]; ${nNaoVerificado} marcações "não verificado"`);

console.log('\n=== RESUMO ===');
console.log(`  erros: ${erros}   avisos: ${avisos}`);
console.log(erros === 0 ? '  RESULTADO: estrutura VÁLIDA' : '  RESULTADO: CORRIGIR os erros acima');
process.exit(erros === 0 ? 0 : 1);
