# Personal OS — Markdown Wiki

A **portable, Markdown-first “Personal OS”** for workplace context: a single repository that acts as a **high-fidelity log**, **wiki index**, and **task tickler**, tuned for Cursor/VS Code preview and compatible with Obsidian and Logseq

---

## Credits & Inspiration
This system is based on [Andrej Karpathy's "Personal OS" philosophy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) and was evangelized for product leaders by [Aakash Gupta](https://www.news.aakashg.com/p/pm-karpathy-second-brain)

---

## Why this exists
Knowledge work produces three parallel streams: **what happened** (time), **what is true** (reference), and **what must resurface later** (reminders). Email and chat bury the signal. Spreadsheets freeze context. This project keeps all three streams in **plain Markdown** so you can own the data, diff it in Git, and render it anywhere

Design goals:
- Fidelity over flair: Operational notes you can trust weeks later
- Repo as product: Clone it, back it up, leave with it
- Agent-friendly: `.cursorrules` describes how an assistant should file inbox items, suggest `[[wikilinks]]`, and summarize links before filing

---

## Repository layout
```text
log/YYYY/YYYY-MM-DD.md   Daily chronological log
wiki/people/             Colleague profiles & working styles
wiki/projects/           Goals, scope, links
wiki/concepts/           Domain & technical reference
todo/                    Tickler — future and non-urgent work
raw/                     Inbox — quick captures before filing
templates/               Starter bodies for logs, meetings, people, projects
.github/                  Issue & PR templates for standardized entries
```
---

## Commands

| Action | Command | Description |
| :--- | :--- | :--- |
| Create/Open today's log | `npm run log` | Automatically generates the year directory if it does not exist and opens the current date's log file with a timestamped template |
| Process the inbox | `npm run process` | Prints a manifest of all items in `/raw/`, signaling the Cursor Agent to file and summarize content based on `.cursorrules` |
| Fuzzy search | `npm run search -- "query"` | Performs a local, custom-scored search across all Markdown files in the `/wiki/` directory to retrieve project or people context |

---

## Instructions
1. Clone this subfolder from the CLI: ```git archive --remote=https://github.com/dphseven/product-portfolio HEAD:personal-wiki-builder | tar -x```
2. Recommended Workflow
   - Quick capture: Manually move or save snippets and URLs into the /raw/ directory (e.g. meeting notes, slack screenshots)
   - Version control: Standard Git commands like git add . and git commit -m "daily update" are used to maintain the history of the wiki and sync across devices
