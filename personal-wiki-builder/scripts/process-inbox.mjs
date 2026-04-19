#!/usr/bin/env node
/**
 * Inbox manifest for `npm run process`.
 * Lists everything under /raw/ so a human or Cursor agent can file items per .cursorrules.
 */
import { readdirSync, statSync, readFileSync, existsSync } from "fs";
import { join, relative, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const rawDir = join(root, "raw");

function walk(dir, base = dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, base, acc);
    else if (name === ".gitkeep") continue;
    else acc.push({ full, rel: relative(base, full) });
  }
  return acc;
}

function previewText(filePath, maxChars = 400) {
  try {
    const t = readFileSync(filePath, "utf8").trim();
    return t.length <= maxChars ? t : `${t.slice(0, maxChars)}…`;
  } catch {
    return "(unreadable)";
  }
}

console.log("");
console.log("╔════════════════════════════════════════════════════════════════╗");
console.log("║  Personal OS — PROCESS RAW INBOX                               ║");
console.log("╚════════════════════════════════════════════════════════════════╝");
console.log("");
console.log("Direct Cursor Agent: review each file below, apply .cursorrules, then");
console.log("file into /log, /wiki, /todo as appropriate (add Context extraction for links).");
console.log("");

if (!existsSync(rawDir)) {
  console.log(`No raw/ directory at ${rawDir}`);
  console.log("(Create small-projects/personal-wiki-builder/raw/ or run from project root.)");
  process.exit(0);
}

const files = walk(rawDir, rawDir);
if (files.length === 0) {
  console.log("Inbox empty. Nothing to process under raw/.");
  process.exit(0);
}

for (const { full, rel } of files.sort((a, b) => a.rel.localeCompare(b.rel))) {
  const st = statSync(full);
  console.log("—".repeat(64));
  console.log(`FILE: raw/${rel}`);
  console.log(`SIZE: ${st.size} bytes`);
  if (rel.endsWith(".md") || rel.endsWith(".txt") || rel.endsWith(".url")) {
    console.log("PREVIEW:");
    console.log(previewText(full));
  }
  console.log("");
}

console.log(`Total items: ${files.length}`);
console.log("");
