---
title: "Our AI agent doesn't care about slow code"
pubDate: 2026-10-21T21:00:00+02:00
description: "We write all our code with AI. I asked it to fix all slow queries, halved RAM and >70% CPU reduction."
tags: ["dev", "ai", "postgres", "ci"]
author: "Mathias Haugsbø"
showToc: false
draft: false
---

At Proptonomy we write basically 100% of the code by AI. We have never shipped, fixed, reviewed code so fast. The problem is that AI does not care abour using wall time clock in unit tests, if EF Core compiles 1.4 million lines of migration Designer files on every build, or if a query scans 300,000 rows. Green test, move on.

So today I did what any developer in 2026 would do. Opened OpenCode (!) with Gemini-Argon-4 (! Yes I know, but we were awarded 100k$ Google Cloud credits) and said: look at GH Actions, unit tests, the HTTP logs and Postgres stats. Find whatever is slow or eating RAM and CPU, fix it, verify it, merge it, and write the rules into AGENTS.md so you stop doing it.

Many hours and about 20 PRs later, 2,805 unit tests went from 6.5 minutes to 77 seconds. Tests were literally sleeping on the wall clock with `Task.Delay` instead of mocking `ISystemClock`, clearing all Npgsql connection pools between every single test, and making real LLM calls if you happened to have `OPENAI_API_KEY` in your shell. Written by an agent, of course. Approved by me, of course.

GitHub Actions got the same treatment. PR checks went from 18 to 24 minutes down to about 8. And deleted many useless GH actions.


In production, backend RAM went from 3.0 GiB to 1.4 GiB, backend CPU from around 108% to 7%, and Postgres from somewhere between 50 and 150% to 7%. Compression was off, and some list endpoints returned 20 MB of the same nested JSON repeated for every row.

The thing is; this is not a new problem, humans has been writing sloppy code for 50 years. I remember doing this every 3-6 months in ScanReach, thinking: "Does the GH actions actually need to take 12 minutes?" and "Why are we using so much ram?". Humans are just as bad as AI at writing sloppy code, AI is just quicker.


When was the last time you removed some weeds in your coding garden?