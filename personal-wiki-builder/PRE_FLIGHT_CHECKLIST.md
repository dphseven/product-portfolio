# Pre-flight checklist — first week on a new team

Use this during your first week to turn noise into **indexed context**. Check items as you go; link out to real notes in `wiki/` and `log/` rather than duplicating HR or internal URLs in a public fork.

## People & relationships

- [ ] List **direct teammates** and managers; create `wiki/people/<name>.md` stubs (role, timezone, preferred channel).
- [ ] Note **who approves what** for your work (code, expenses, time off, prod access).
- [ ] Capture **communication norms**: async vs sync, expected response times, meeting-heavy days.

## Cadence & forums

- [ ] Document **standing meetings** (title, owner, purpose, your expected prep).
- [ ] Record **team rituals**: sprint planning, retro, office hours, all-hands.
- [ ] Add **where decisions live** (wiki, doc, ticket system) and the canonical link pattern.

## Systems & access

- [ ] Inventory **accounts** you need (email, chat, SSO, ticketing, CI, cloud).
- [ ] Track **access requests** in flight — ticket IDs and expected SLA in `todo/` or the daily log.
- [ ] Save **on-call / escalation** path at least at a high level (pager vs chat vs ticket).

## Work style alignment

- [ ] Clarify **definition of done** for your first deliverables (reviewers, tests, docs).
- [ ] Confirm **core hours** or pairing expectations if applicable.
- [ ] Write one paragraph in the log: **what success looks like at 30 / 60 / 90 days** (even if provisional).

## Safety & boundaries

- [ ] Decide what **never** goes in this repo (customer PII, secrets, unrelated personal health details).
- [ ] If using a **public portfolio clone**, scrub employer-specific names and links before pushing.

## End of week one

- [ ] Run `npm run process` with anything left in `raw/` and file it per `.cursorrules`.
- [ ] Review `wiki/projects/` — at least one page for the main initiative you joined.
- [ ] Add tickler items in `todo/` for anything that must resurface **later**, not today.
