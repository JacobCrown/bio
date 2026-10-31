# Personal website

A static, fully data-driven personal site built with **Astro + TypeScript** (no UI framework, almost no JavaScript).
You edit **content files**; the site renders everything automatically. You never need to touch a component to add an employer, project or book.

> **Everything currently in `src/content/` is dummy data.** Each dummy file has `dummy: true`, which shows a dashed "Sample" badge on the site and a banner at the top. Run `npm run dummy:list` to list the files that still contain dummy data.

---

## Run locally

Requires Node 22.12+.

```bash
npm install
npm run dev        # http://localhost:4321 — live reload
npm run check      # type-check Astro + TypeScript
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

If a content file is invalid (bad date, rating out of range, missing field…), `dev` and `build` stop with a message naming the file and the field.

---

## Project structure

```
src/
├── content/                  ← ALL YOUR CONTENT LIVES HERE
│   ├── profile/profile.yaml          one file: name, bio, links…
│   ├── education/<slug>.yaml         one file per degree
│   ├── employers/<slug>.yaml         one file per employer
│   ├── work-projects/<employer>/<slug>.md   one file per project done for an employer
│   ├── projects/<slug>.md            one file per personal / GitHub project
│   └── books/<slug>.md               one file per book
├── assets/                   ← images referenced by content
│   ├── profile/   books/   projects/   logos/
├── schemas.ts                ← the data model (Zod): every field, its type, what is optional
├── content.config.ts         ← connects folders to schemas
├── lib/
│   ├── content.ts            ← reads + sorts content, returns typed objects
│   ├── format.ts             ← date formatting
│   └── markdown.ts           ← Markdown → HTML
├── components/               ← presentation only; receive typed props
│   ├── profile/  experience/  projects/  books/  shared/
├── layouts/BaseLayout.astro  ← <head>/SEO, header, footer
├── pages/                    ← routes (home, /projects, /projects/<slug>, /books, /books/<slug>)
└── styles/                   ← tokens.css (colours, fonts, spacing), base.css, prose.css
```

**How data flows:** `src/content/*` → validated by `schemas.ts` → read by `lib/content.ts` → passed as props to components → pages.
Components never read files themselves, and content files never contain presentation.

**Two file formats**
- `.yaml` — pure data (profile, employers). Think "config file".
- `.md` — an entry with long-form text. Settings go in the `---` block at the top (YAML); the text below it is Markdown and is the long description / review.

Free-text fields (`bio`, `summary`, and Markdown bodies) accept Markdown: `**bold**`, `*italic*`, lists, links, code blocks, `## headings`.

**Dates** are written `YYYY-MM` (month precision) or `YYYY-MM-DD`. Quote nothing; just `startDate: 2022-04`.

**Optional fields** may be left out entirely; nothing renders for them.

---

## Profile

`src/content/profile/profile.yaml`

| Field | Required | Notes |
|---|---|---|
| `firstName`, `lastName` | yes | |
| `title` | yes | Professional title |
| `location.city`, `location.country` | yes | |
| `bio` | yes | Short, Markdown allowed |
| `photo` | yes | Image path, see [Images](#images) |
| `photoAlt` | no | Alt text; defaults to "Portrait of <name>" |
| `links.github`, `links.linkedin` | yes | Full URLs |
| `links.email` | yes | Plain address, e.g. `me@example.com` |
| `cv` | no | Path to a file in `/public`, e.g. `/cv.pdf`. Omit to hide the link |
| `dummy` | no | Delete this line when real |

The site name, page titles, SEO description and footer all come from this file.

---

## Add a degree

Create `src/content/education/<slug>.yaml` — one file per degree (bachelor, master…). Shown above Experience, newest first.

```yaml
# src/content/education/sample-tech-university.yaml
institution: Sample University of Technology
logo: ../../assets/logos/sample-tech.png     # optional – university icon
website: https://example.com                 # optional
location: Sample City, Country               # optional
degree: Master of Science
field: Computer Science                      # optional
startDate: 2017-10
endDate: 2019-06                             # omit (or `null`) if still studying
description: >-                              # optional – thesis, specialisation… (Markdown)
  Thesis: *Title of the thesis*.
```

Required: `institution`, `degree`, `startDate`.

## Add an employer

Create `src/content/employers/<slug>.yaml`. The file name (without `.yaml`) is the employer's **slug**; projects refer to it.

```yaml
# src/content/employers/acme-corp.yaml
name: Acme Corp
website: https://acme.example.com        # optional
logo: ../../assets/logos/acme.png        # optional
location: Berlin, Germany                # optional
position: Senior Software Engineer       # optional – your job title there
startDate: 2022-04
# endDate: 2024-09                       # omit (or `null`) = current job, shown as "present"
description: >-                          # optional – one or two sentences
  Logistics software company. I work in the platform team.
```

Only `name` and `startDate` are required. Employers are sorted automatically, newest first.

## Add a project to an employer

Create `src/content/work-projects/<employer-slug>/<project-slug>.md` (the folder is only for tidiness; what links the project to the employer is the `employer:` field).

```markdown
---
employer: acme-corp                # slug of the employer file – must exist, validated at build
name: Route Optimisation Service
role: Machine Learning Engineer
summary: >-                        # 1–3 sentences, always visible in the timeline
  Replaced a rules engine with a learned model for delivery route planning.
startDate: 2023-01                 # optional
endDate: 2023-10                   # optional (omit while ongoing)
responsibilities:                  # optional
  - Designed the training pipeline.
  - Owned the production rollout.
achievements:                      # optional – measurable results
  - Reduced average route length by 8%.
stack: [Python, PyTorch, FastAPI, PostgreSQL]    # required, at least one
links:                             # optional
  - label: Blog post
    url: https://example.com/post
---

## Background

Free-form Markdown: technical background, purpose, architecture, implementation,
your contribution. As long as you like. Everything below the `---` is optional.
```

In the timeline the project shows its name, role, dates, summary and technologies. Responsibilities, results, the Markdown text and links are tucked behind a **Read more** toggle (native HTML `<details>`, no JavaScript), so long write-ups never make the timeline hard to scan. A project with only the required fields shows no toggle.

Projects are sorted newest first by `startDate`; projects without dates go last.

## Add a personal project

Create `src/content/projects/<slug>.md`. The slug becomes the URL: `/projects/<slug>/`.

```markdown
---
name: tinytrack
summary: A minimal self-hosted experiment tracker.        # short, shown on cards
repo: https://github.com/you/tinytrack                    # required
demo: https://tinytrack.example.com                       # optional
image: ../../assets/projects/tinytrack.jpg                # optional
imageAlt: Dashboard comparing experiment runs             # optional
stack: [Python, SQLite, FastAPI]                          # required
startDate: 2025-09                                        # optional
endDate: 2026-02                                          # optional
status: ongoing                                           # completed | ongoing | archived
featured: true                                            # optional – also show on the home page
---

Optional detailed description in Markdown. If this is empty, the card has no
"Details" link and no detail page is generated.
```

## Add a book

Create `src/content/books/<slug>.md`. The slug becomes the URL: `/books/<slug>/`.

```markdown
---
title: The Quiet Compiler
author: A. Sample
cover: ../../assets/books/the-quiet-compiler.jpg   # optional – a typographic cover is used otherwise
startedAt: 2026-09-02                              # optional
finishedAt: 2026-09-21                             # required – drives the timeline order
rating: 9                                          # whole number 1–10, shown as stars
tags: [Software, Essays]                           # optional
summary: |                                         # optional – what the book is about
  Markdown allowed. Several paragraphs are fine.

  Leave a blank line between paragraphs.
---

Your personal review goes here, as Markdown. It is a separate field from the summary
and is shown under "My review" on the book's page.
```

The journal groups books by year of `finishedAt`, newest first. The list shows the first paragraph of the summary; the detail page shows the full summary and review.

---

## Images

All images live in `src/assets/` and are referenced by a **relative path from the content file**. Astro resizes them, converts them to WebP and adds width/height automatically.

| Image | Put it in | Reference from | Example value |
|---|---|---|---|
| Profile photo | `src/assets/profile/` | `src/content/profile/profile.yaml` | `../../assets/profile/me.jpg` |
| Employer / university logo | `src/assets/logos/` | `src/content/employers/*.yaml`, `src/content/education/*.yaml` | `../../assets/logos/acme.png` |
| Book cover | `src/assets/books/` | `src/content/books/*.md` | `../../assets/books/title.jpg` |
| Project screenshot | `src/assets/projects/` | `src/content/projects/*.md` | `../../assets/projects/name.jpg` |

Rule of thumb: from `src/content/<folder>/file`, the path always starts with `../../assets/`. The `work-projects` folder has one extra level, but work projects have no images.
If the path is wrong or the file is missing, the build fails with a clear error.

Suggested sizes: profile photo ≥ 640 px square; book covers ≥ 480 × 720 px (2:3); project screenshots ≥ 1280 × 800 px (16:10); logos ≥ 128 px square.
Files that are *not* processed (CV PDF, favicon) go in `public/` and are referenced from the site root, e.g. `/cv.pdf`.

---

## Production build

```bash
npm run build      # outputs the static site to dist/
npm run preview    # check it locally
```

Before going live, set your real URL in `astro.config.mjs` (`site: 'https://…'`) and in `public/robots.txt` (the `Sitemap:` line). It is used for canonical URLs, social-share tags and the sitemap.

## Deploy to Netlify

`netlify.toml` is already configured (build command `npm run build`, publish directory `dist`, Node 22, long-term caching for `/_astro/*`). No adapter is needed because the site is fully static.

1. Push the project to a Git repository (GitHub/GitLab/Bitbucket).
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Keep the detected settings (they come from `netlify.toml`) and deploy.

Every push then rebuilds the site. Adding a book or project = commit one new file.

---

## Data model at a glance

All schemas live in [`src/schemas.ts`](src/schemas.ts) — read it for the exact rules. Summary of the validation:

- Dates must be `YYYY-MM` or `YYYY-MM-DD`; an end date cannot precede its start date.
- Book `rating` must be an integer from 1 to 10; `finishedAt` cannot precede `startedAt`.
- URLs and the e-mail address must be well formed.
- Technology `stack` must contain at least one item.
- A work project's `employer` must be the slug of an existing employer file.
- Project dates outside the employer's employment period only print a warning during build.
