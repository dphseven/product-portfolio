#!/usr/bin/env node
/**
 * Lightweight fuzzy-ish search across all wiki Markdown files (no npm deps).
 * Usage: node scripts/search-wiki.mjs [query]
 * If no query, reads from stdin (first line) or prints help.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "fs";
import { join, relative, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const wikiRoot = join(root, "wiki");

function walkMarkdownFiles(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walkMarkdownFiles(full, acc);
    else if (name.endsWith(".md")) acc.push(full);
  }
  return acc;
}

function normalize(s) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

/** Simple subsequence + token overlap score for "fuzzy" feel without deps */
function score(query, text) {
  const q = normalize(query);
  const t = normalize(text);
  if (!q) return 0;
  if (t.includes(q)) return 1000 + q.length;

  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  let subseq = qi / q.length;

  const qt = q.split(/[^a-z0-9]+/).filter(Boolean);
  const tt = new Set(t.split(/[^a-z0-9]+/).filter(Boolean));
  let overlap = 0;
  for (const w of qt) {
    if (tt.has(w)) overlap++;
  }
  const tok = qt.length ? overlap / qt.length : 0;

  return subseq * 400 + tok * 200;
}

async function main() {
  const arg = process.argv.slice(2).join(" ").trim();
  let query = arg;

  if (!query && !process.stdin.isTTY) {
    const chunks = [];
    for await (const c of process.stdin) chunks.push(c);
    query = Buffer.concat(chunks).toString("utf8").split("\n")[0]?.trim() ?? "";
  }

  if (!query) {
    console.log('Usage: npm run search -- "your query"');
    console.log("Searches markdown under wiki/ and prints ranked paths + snippets.");
    process.exit(0);
  }

  const files = walkMarkdownFiles(wikiRoot);
  if (files.length === 0) {
    console.log("No .md files under wiki/ yet.");
    process.exit(0);
  }

  const ranked = [];
  for (const file of files) {
    const content = readFileSync(file, "utf8");
    const rel = relative(root, file).replace(/\\/g, "/");
    const sc = score(query, rel + "\n" + content);
    if (sc > 0) ranked.push({ rel, sc, content });
  }

  ranked.sort((a, b) => b.sc - a.sc);
  const top = ranked.slice(0, 25);

  console.log("");
  console.log(`Query: ${query}`);
  if (top.length === 0) {
    console.log("No matches above scoring threshold.");
    process.exit(0);
  }
  console.log(`Matches: ${top.length} (showing up to 25)`);
  console.log("");

  for (const { rel, sc, content } of top) {
    const qn = normalize(query);
    const lower = content.toLowerCase();
    let idx = lower.indexOf(qn);
    if (idx < 0) {
      const parts = normalize(query).split(" ");
      for (const p of parts) {
        if (p.length > 2) {
          idx = lower.indexOf(p);
          if (idx >= 0) break;
        }
      }
    }
    const start = Math.max(0, idx - 60);
    const snippet = idx >= 0 ? content.slice(start, start + 200).replace(/\s+/g, " ") : content.slice(0, 200).replace(/\s+/g, " ");
    console.log(`${rel}`);
    console.log(`  score: ${Math.round(sc)}`);
    console.log(`  ${snippet}${snippet.length >= 200 ? "…" : ""}`);
    console.log("");
  }
}

main();
