---
title: "MDM - An unnecessary evil?"
pubDate: 2024-09-01T19:58:00+01:00
description: "My thoughts on MDM and why I would never accept it"
tags: ["general", "MDM"]
author: "Mathias Haugsbø"
showToc: false
---

This post is mostly a draft I had laying around since april 2023 when management wanted to implement MDM on all devices. So I had to note down my thoughts somewhere. The post was not finished, but I still think it's worth a post.

# What and why I will not accept MDM on my work devices

MDM - Mobile Device Management is a service that is used by IT managers to control and manage devices that are used by employees. This can be anything from enforcing password policies, installing software remotely or wiping devices if they are stolen. They are widely used in large companies to secure access to internal data and reduce risk of data breach.

## Different kinds of MDM services

- Azure Intune https://learn.microsoft.com/en-us/mem/intune/fundamentals/what-is-intune
- IBM MDM https://www.ibm.com/topics/mobile-device-management
- And many more

## Problems i see with especially Intune

- Users does not have an easy way of knowing what the administrator is able to read and do
  - The onboarding screens in Azure Intune Company Portal does not list any of the policy rules that are configured. It is up to the IT administrator to write and inform the users about what they are able to do. The list of possible actions are long, and the user has no way of knowing what is configured.
- IT manager usually have the option to reset device password and essentially have access to all data on the device
  - This can be disabled in some policies, but can not be optional for the end user
  - All company related data that might be interesting to fetch for some reason, is already stored in cloud and is not dependent on the device to obtain.
  - Obtaining access to data on the device would gain access to my private data like mail, chat, banking etc.
- Able to install software remotely on any machine -> Essentially able to run any commands on your laptop and get full access and read private data
- It is fully based on trust and there is no way of knowing if the IT manager is abusing her power unless you have the same accesses as the IT manager

Arguments IT managers use to implement MDM:

- The device is bought by the company, so everything that happens on it belongs to the company
  - Today everyone (at least normal private company office workers) logs on to their private services like mail, chat, banking etc. so the employees laptop is a highly private device.
  - Companies pay for mobile plan, internet at home etc in order to enable workers to work from everywhere. Forcing these privacy concerns would result in workers not doing anything private on their work computer and let the PC stay at work. Removing the possibility of working whenever it is needed.
- We need to know if software is updated
  - This is a valid argument, but not that relevant anymore as most software updates automatically. And even more software is web based and does not need to be updated.
- We need to reduce access from insecure devices
  - I see this point in highly secure industries like defence, finance etc. But in a normal office environment this is usually not a problem.
- We need to be able to wipe a device if it is stolen
  - I have already signed my Mac into Apple's Find My Device so I can wipe the laptop from my own account. This is a feature that is built into the OS and does not require any MDM software.
  - So the only "valid" but somehow malicious reason for this is if the IT manager wants to wipe the device if you quit or are fired. This is a very bad reason and should not be an argument.
- We need to be able to lock people out of their laptop if they are fired
  - This is also a malicious reason and should not be an argument.
- We need to be able to install software remotely
  - No, you do not need to do it. That is purely a convenience feature.

Arguments for not needing MDM:

- I, as a techy person is fully capable of keeping my system updated and secure
- I enforce good password policies on my devices and never let other people use them
- All the software I use in my daily life is web based. On most of them we use Single Sign On through AzureAd which is not dependent on MDM anyway
  - GitHub
  - Confluence
  - Slack
  - Outlook
  - Sharepoint for some documents
    - Yes sharepoint and outlook is controllable through MDM, but I am not dependent on them in my daily life. So adding MDM seems quite unnecessary for me.
- What if I want to work from home on my home pc? I would not be able to do that if I need to install MDM on my home pc.

What I like:

- In hospitals they have thousands of computers that are used by multiple people and needs to be maintained by an IT department
- Able to enforce password policies like:
  - Password length
  - Password complexity
  - Automatic lock after x minutes
- Reports if OS version is outdated etc.
- Easy to onboard new workers by pre-installing recommended software
- Easy to help non-tech savvy people with their computer problems by keeping everything updated and secure
- Possibility to fully lock down computers if you are in a highly secure environment like political offices or defence industry.

# After thoughts

- I stopped all talks about MDM at work, now some have MDM and some do not. I have to say that I am open to enrolling my iPhone in Intune as iPhone will sandbox all the corporate apps ensuring that private data is not accessible and vice versa. Then the Intune policies will affect things like password complexity etc. which I in general think is a good thing. But for MacOS and Windows the capabilities of the MDM software is still to invasive for my liking.
