---
title: "Macos Setup"
pubDate: 2023-06-20T15:23:02+02:00
description: "What programs I use on my macos machine"
tags: ["general"]
author: "Mathias Haugsbø"
showToc: false
---

I have been using a Macbook Pro 14" with M1 Max and 32GB RAM for over 8 months now. It's been a fantastic journey and the daily experience is so good! Good battery life, very fast CPU and things just works.

MacOS got some quirks for a long time Windows user like the stupid fullscreen feature that Mac users use. Coming from Windows the most missed feature was to easily split screen in half using keyboard shortcuts, this is luckily solved with the free program Rectangle. Other than that I have not met any major issues, and will most probably go Mac for a long time forward.

Here is a list of programs and settings I use on my Macbook Pro.

# Programs

- Brew https://brew.sh/ (package manager)
- Rectangle https://rectangleapp.com/ (Window manager)
- Dozer https://github.com/Mortennn/Dozer (Clean up icons in top menu bar)
- Raycast https://www.raycast.com/ (Better "cmd+space" search tool)
- iterm2 https://iterm2.com/ (Nice terminal)
- Zsh https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH#macos (Shell for the terminal)
- Fig https://fig.io/ (Automatic command completion in terminal)
- Stats https://github.com/exelban/stats (CPU, Battery etc. in top menu bar)
- BetterDisplay https://github.com/waydabber/BetterDisplay#readme (A quick way to change resolution of screens)

```bash
# Open terminal and run following to install brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Then run the following commands to install all the programs I use
# Very useful tools for all mac users
brew install rectangle dozer raycast

# General programs I use
brew install spotify slack visual-studio-code
brew install mattermost signal steam josm gimp discord

# Useful for people using terminal
brew install iterm2 zsh fig stats

# Developer tools
brew install postman github docker gh
brew install node

# Useful tools
brew install ffmpeg imagemagick nmap keeweb
```

# Browser extensions:

I have a small set of extensions that I have used for many years:

- Bitwarden (Password manager, crucial to have and syncs nicely across all my devices)
- Imagus (when you hover pictures it shows the full size)
- Feedly Notifier (RSS reader)
- Wappanalyzer (See what tech each website uses)

# Settings

Not sure how to automate settings backup and restore, but here is a list of settings I like to change.

- Screen Time -> Share Across Devices -> Yes
- Control Centre:
  - Bluetooth -> Hide
  - Stage manager -> Hide
  - Airdrop -> Hide
  - The rest -> Show when active
  - Battery -> Do not show (I use the Stats app for this)
- Siri -> Disable
- Desktop & Dock:
  - Size 2nd smallest
  - Magnification -> Off
  - Position on screen -> Right (Need to save that precious vertical screen real estate)
  - Double click title bar to -> Zoom
  - Automatically hide and show the dock -> Off
  - Show recent applications in Dock -> Off
  - Stage Manager -> Off
- Displays:
  - Resolution various from place to place. But I like to use around 2048x1330
- Wallpaper:
  - Downloaded dynamic wallpaper from https://dynamicwallpaper.club/gallery?section=best (Dynamically change based on time of day)
- Screen Saver:
  - One of those Animated screensavers like "Drift", reminds me of the old XP era
- Keyboard shortcuts:
  - Disabled spotlight search in favor of Raycast
