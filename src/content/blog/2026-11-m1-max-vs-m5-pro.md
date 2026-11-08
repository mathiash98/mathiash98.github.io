---
title: "M1 Max vs M5 Pro: 2x real dev work"
pubDate: 2026-11-08T10:00:00+01:00
description: "Same code, same inputs, both Macs started at the same time. The M5 Pro builds and tests our codebase 1.9× faster, and the GPU work runs up to 3× faster."
tags: ["dev", "mac", "hardware", "english"]
author: "Mathias Haugsbø"
heroImage: "/m5-pro-vs-m1-max/m5-pro-vs-m1-max-merged.png"
showToc: false
draft: false
---

Quick update from New York, where I'm spending the week. Since I was already here, I couldn't miss the chance to upgrade, so I picked up a new MacBook Pro M5 Pro (18 CPU cores, 48 GB) for about 3k USD. My M1 Max (10 cores, 32 GB) has been great for four years, but with 4-5 Claude Code and Codex sessions building and testing in parallel, it started to feel slow.

The hotel internet is very slow, so no Migration Assistant: I connected the two Macs with a cable and let Claude Code copy only what I use over SSH. An iPhone cable does 25-36 MB/s, a Thunderbolt cable 1 GB/s. The whole copy took 24 minutes.

## The benchmark

Same code, same inputs, both Macs started at the same time:

![M1 Max vs M5 Pro: 2x real dev work](/m5-pro-vs-m1-max/m5-pro-vs-m1-max-merged.png)

The codebase (Proptonomy: .NET 10 backend, React/Vite frontend) is all CPU: the builds, the frontend tests and 38,643 backend tests went from 24m 37s to 13m 01s, 1.9×. Frontend tests gain the most (2.7×), since vitest uses every core and the M5 Pro has 18 against 10. The database tests barely use the CPU on either Mac, because they run one collection after another.

The robot rows are from our Unitree project: MuJoCo simulation of a G1 humanoid making a bed (CPU), the depth models the robot uses to see in 3D (GPU), and our pipeline that turns a property video walkthrough into a point cloud and floor plan (CPU + GPU). The GPU work gains a bit more, 1.9-3.1×, even though the M5 Pro has fewer GPU cores (20 against 24).

Not lab conditions: during the codebase run the old Mac was on battery with Defender running, and the new one was still indexing Spotlight.

## So, worth it?

Yeah, probably. But honestly, my old M1 Max was perfectly fine.

Discuss it on [X](https://x.com/mathiash98/status/2119451862730760420) or [Reddit](https://www.reddit.com/r/macbookpro/comments/1xr11z9/m5_pro_2x_faster_than_m1_max/).
