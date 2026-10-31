---
# DUMMY DATA — fictional book. High rating, long summary AND long review, tags, both dates.
dummy: true
title: The Quiet Compiler
author: A. Sample
cover: ../../assets/books/cover-1.jpg
startedAt: 2026-09-02
finishedAt: 2026-09-21
rating: 9
tags: [Software, Essays, Craft]
summary: |
  A collection of essays on the invisible work that makes software feel
  effortless: naming things, deleting code, writing the boring test, and saying
  no to a clever abstraction.

  The author, a long-time compiler engineer, builds the book around a single
  claim: that most of the quality in a codebase comes from small decisions made
  by people who were not trying to be impressive. Each chapter takes one such
  decision — a variable name, an error message, a commit message — and follows
  its consequences over several years.

  The last third turns to teams. It argues that code review is mostly a
  mentoring tool, that documentation rots unless someone owns it, and that
  "temporary" scaffolding is the most permanent thing in any system.
---

This is the first book about programming in years that I immediately wanted to
re-read. It is not a technical manual and it contains almost no code; it is a book
about **taste**, and about how taste is built out of attention.

What I liked most is that the author never pretends the advice is free. Deleting
code is celebrated, but the essay on it spends as many pages on the cost of being
wrong, and on how to make deletion safe: feature flags, good tests, and the courage
to look at the production logs. The same honesty runs through the book. Where other
authors give you a rule, this one gives you a rule *and* the situation in which it
breaks.

The writing is the real achievement. It is plain, a little dry, and occasionally very
funny — the chapter on naming has a running joke about a variable called `data2`
that I still think about. I read most of it in the evenings in a few sittings and
found myself underlining something on nearly every page.

The weaker part is the section on management, which feels like it belongs to a
different, thinner book. Some of the arguments there are repeated from earlier
chapters, and the case studies are anonymised to the point of being generic.

Still, a clear recommendation for anyone who writes code for a living and has ever
felt that the craft is bigger than the tools. I will be giving copies away.
