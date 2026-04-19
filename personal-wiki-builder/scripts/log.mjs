#!/usr/bin/env node
/**
 * Creates or opens today's daily log with a prefilled timestamp + template body.
 */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function pad(n) {
  return String(n).padStart(2, "0");
}

const now = new Date();
const y = now.getFullYear();
const m = pad(now.getMonth() + 1);
const d = pad(now.getDate());
const dateStr = `${y}-${m}-${d}`;
const isoTime = `${y}-${m}-${d}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

const logDir = join(root, "log", String(y));
const logPath = join(logDir, `${dateStr}.md`);

const dailyTemplatePath = join(root, "templates", "daily-log.md");

function loadTemplate() {
  if (!existsSync(dailyTemplatePath)) {
    return `# ${dateStr}\n\n---\n\n`;
  }
  let body = readFileSync(dailyTemplatePath, "utf8");
  body = body.replaceAll("{{DATE}}", dateStr);
  body = body.replaceAll("{{TIMESTAMP}}", isoTime);
  return body;
}

function tryOpenInEditor(file) {
  const editors = [
    ["code", ["-r", file]],
    ["cursor", ["-r", file]],
    ["code.cmd", ["-r", file]],
  ];
  for (const [cmd, args] of editors) {
    try {
      execSync(`${cmd} ${args.map((a) => `"${a}"`).join(" ")}`, {
        stdio: "ignore",
        shell: true,
      });
      return true;
    } catch {
      /* try next */
    }
  }
  return false;
}

mkdirSync(logDir, { recursive: true });

if (!existsSync(logPath)) {
  writeFileSync(logPath, loadTemplate(), "utf8");
  console.log(`Created log: ${logPath}`);
} else {
  console.log(`Log exists: ${logPath}`);
}

const opened = tryOpenInEditor(logPath);
if (!opened) {
  console.log("Open this file in your editor (install VS Code CLI or Cursor CLI for auto-open):");
  console.log(logPath);
}
