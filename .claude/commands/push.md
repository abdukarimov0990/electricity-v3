---
description: Commits and pushes the portfolio-v2 changes to GitHub
argument-hint: [commit message - optional]
allowed-tools: Bash, Read
---

# /push - commit & push this repo

Single repo: `portfolio-v2` (Next.js 15 + React 19 + Tailwind 4), remote `origin` -> `github.com/yaxyobekuz/portfolio-v2`.

## Argument

`$ARGUMENTS` - commit message (optional).
- If provided - use it as the message for a single commit containing all changes.
- If empty - inspect `git status` and `git diff` and write short, precise commit messages **in English** that match the changes (e.g. "feat: add projects grid", "fix: mobile nav overflow").

## Steps to execute

1. `git status --short` - check whether there are changes.
2. If there are **no** changes - stop and report "no changes".
3. If there **are** changes:
   - `git diff` / `git diff --staged` - read the actual changes before writing any message.
   - Do not ship everything in a single commit; split the changes into logical chunks and commit each one separately.
     - e.g. `git add app/components/Hero.tsx` then `git commit -m "feat: add hero section"`, then `git add app/globals.css` then `git commit -m "style: tune spacing scale"`.
   - Every commit message must be **in English** and follow the format `<prefix>: <short description>`. Allowed prefixes: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`.
4. Push to the current branch:
   - `git push` normally.
   - If the branch has no upstream yet - `git push -u origin <current-branch>`.

## At the end

Print a short report (one line per commit + the push result):

```
abc1234 feat: add projects grid
def5678 fix: mobile nav overflow
pushed  -> origin/main (2 commits)
```

Or, when nothing changed:

```
skipped (no changes)
```

## Rules

- **Never** use `--force`.
- **Never** bypass hooks with `--no-verify`.
- **Never** commit `.env*` files (only `.env.example` is tracked), `node_modules/`, `.next/`, or `.DS_Store`. If any of these show up in `git status`, leave them out and mention it in the report.
- Do not `git add .` blindly - stage the specific files that belong to each logical commit.
- If a push is rejected - ask the user before running `git pull --rebase`.
- If the current branch is not `main` but a feature branch - just use the current branch name; do not switch branches.
- Use `git rev-parse --abbrev-ref HEAD` to get the current branch (this machine's git has no `git branch --show-current`).
- Commit messages are **in English**, and the prefix (`feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`) is also in English.
