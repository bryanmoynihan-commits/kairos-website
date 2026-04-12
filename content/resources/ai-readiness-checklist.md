---
title: "The AI Readiness Checklist: 5 Things to Fix Before You Automate Anything"
date: "2026-04-12"
author: "Bryan Moynihan"
excerpt: "Most companies automate on top of broken foundations — and amplify the mess. Five foundations to get right before you bring AI into your revenue operations."
published: true
formHeadline: "Unlock the remaining four foundations"
formSubhead: "Enter your details to read the rest of the checklist. We'll send the occasional RevOps deep-dive — nothing more."
---

Most companies get the AI conversation backwards.

They start with the tools. Which AI platform should we buy? What can we automate first? How do we deploy agents? These are reasonable questions — but they're the wrong questions to ask first.

In my experience, the companies that get the most out of AI are the ones that fixed their operational foundation before they automated anything. The ones that didn't? They spent five or six figures automating broken processes — and all they got was faster, more expensive chaos.

This checklist isn't about whether your company should use AI. You should. It's about whether your revenue operations are ready for AI to actually work. If you're a revenue leader at a growth-stage B2B company, these are the five foundations to get right first. Be honest with yourself on each one. The gaps you find here are the gaps that will determine whether AI becomes an accelerant or an amplifier of existing problems.

## 1. Data Integrity

Most companies think their data problem is a tool problem. It's not. It's a governance problem.

You can have the best CRM on the market and still not trust your pipeline data. The issue isn't usually the system — it's what's inside it. Duplicates. Missing fields. Conflicting data across objects. Stale records that nobody knows how to interpret because the person who set them up left two years ago. Fields that require manual entry but nobody fills out consistently because there's no automation doing it for them.

But here's the thing that gets overlooked most often: the real data integrity issue isn't any individual data problem. It's that there's no system or process in place to continuously vet, correct, and flag the data that matters most. No governance cadence for reviewing account data, opportunity data, or quote data. No automated alerts when critical fields are missing or conflicting. The data just degrades by default, and nobody notices until the board deck doesn't add up.

**Ask yourself honestly:**

- If your CEO asked for a pipeline report right now, would you trust the numbers without manually checking them first?
- Do you have a defined process for identifying and resolving duplicate records, missing fields, and conflicting data across your core objects (accounts, contacts, opportunities, quotes)?
- Is there any automated system that flags data quality issues before they compound — or does your team find errors manually, after the damage is done?
- Could you explain to a new hire how every critical field in your CRM gets populated, by whom, and how often it's validated?

If you answered "no" to two or more of these, your data foundation isn't ready for AI. Any automation you build on top of it will inherit every problem your data already has — and scale those problems faster than your team can fix them.

<!-- GATE -->

## 2. Process Documentation

Here's something that changed my perspective on process documentation: it used to feel like busywork. Write the SOP, put it in a folder, watch nobody read it. But with AI, documented processes become something fundamentally more powerful. You can load them into knowledge agents, custom GPTs, and AI assistants — and suddenly your team can ask questions and get precise, contextual answers directly from the documentation instead of reading through 40-page manuals that nobody wants to open.

That reframe matters because it turns process documentation from a compliance exercise into an AI-readiness investment.

The symptoms of undocumented processes are predictable. Critical processes live in one person's head. Two reps do the same thing completely differently. Handoffs between teams are inconsistent because nobody agreed on what triggers them or what information needs to transfer. New hires take months to ramp because tribal knowledge is the only knowledge. And — this one connects directly back to data integrity — bad data gets produced in the systems as a direct result of processes being undocumented and executed inconsistently.

**Ask yourself honestly:**

- If your top-performing rep left tomorrow, could someone else follow their exact process from lead to close without calling them?
- Are your critical workflows (lead routing, opportunity management, deal handoffs, renewal processes) documented in a way that a new hire could follow them on day one?
- Do different team members execute the same process the same way — or does the output depend on who's doing it?
- Have you updated your process documentation in the last six months, or is it a snapshot of how things worked two years ago?

If your processes aren't documented, you can't automate them. And if they're documented but outdated or inconsistently followed, automating them just codifies the inconsistency. AI can't improve a process that nobody has written down.

## 3. Systems Architecture

There's a difference between a tech stack that was designed and one that was accumulated. Most growth-stage companies have the latter — tools that were bought by different teams at different times to solve different problems, with no one ever stepping back to ask whether they work together as a system.

The most obvious signal is integration quality. Sometimes the systems aren't integrated at all — data lives in silos and people manually copy it between tools. Other times, there are integrations, but they're poorly mapped or incomplete. Fields don't sync correctly. Records duplicate across systems. Someone set up the integration 18 months ago and nobody has touched it since.

The deeper issue is whether you have a single source of truth. For any given data object — a customer, a deal, a subscription — can you point to one system that owns it? Or do you have three tools that all think they're the source of truth, with no clear hierarchy?

In my experience, this is one of the most damaging problems a growth-stage company can have. I worked inside a company that was running its entire go-to-market on a CRM that wasn't built for the scale or complexity the business had reached. It had extremely limited integration capabilities — it didn't connect to the financial system, the marketing platform, or really anything else. Even different modules within the CRM itself didn't properly talk to each other. The result was complete operational chaos: an enormous amount of manual work, crazy workaround processes, data nobody believed, and go-to-market results that dragged as a direct consequence. The frontline employees responsible for all the manual data entry and bizarre workarounds were miserable and disengaged — because their jobs felt silly. That's what an accumulated tech stack does to a business. It doesn't just create data problems. It creates people problems.

Beyond integration, watch for these signals: redundant tools doing the same job because different teams bought their own solutions independently. Manual data entry bridging gaps between systems that should be connected. No clear owner of the tech stack as a whole — individual tools have admins, but nobody is responsible for how the entire system works together as an architecture. And tools being used at a fraction of their capability — paying for enterprise-tier software but using it like a spreadsheet because nobody configured it properly.

**Ask yourself honestly:**

- Can you draw a diagram of how data flows between your core systems (CRM, marketing automation, CS platform, billing) — and does that diagram reflect what actually happens, or what you think happens?
- For your most important data objects (accounts, opportunities, customers), is there one clearly defined source of truth — and does every team know what it is?
- How many of your integrations were set up more than a year ago and haven't been audited since?
- Are you paying for tools that overlap in functionality because different teams bought their own solutions?

A tech stack that wasn't designed as a system will fight you every step of the way when you try to automate. AI needs clean data flowing through connected systems. If your architecture has gaps, your automations will too.

## 4. Team Alignment

This one is deceptively important. You can have clean data, documented processes, and well-integrated tools — and still fail at AI implementation because your teams aren't aligned on the fundamentals.

The most common alignment failures happen at the seams between teams. Marketing and sales can't agree on what counts as a qualified lead. Pipeline stages have names that don't clearly describe what's happening in them — and the criteria for moving a deal from one stage to the next aren't defined. Sales sells things that finance and accounting don't want to support, and RevOps gets stuck in the middle trying to make the deal structure work for everyone.

I've lived this directly. I've been in the room where finance and sales were at each other's throats, with our RevOps team caught in the middle, trying to support six-figure-plus deals that were structured in ways that made them unprofitable. Nobody was wrong exactly — sales was trying to close business, finance was trying to protect margins — but the misalignment between them created deals that hurt the company even when they "won."

Pipeline stages are another constant source of pain. Before we overhauled ours, the stages had names like "Engage" and "Catalyze" — and nobody understood what they meant. There was complete inconsistency in how reps bucketed deals, which made forecasting impossible. Worse, when bookings underperformed, we had multiple sales leaders telling their teams to create pipeline just to create it — not because the deals were real, but because they thought pipeline volume would give them air cover for poor bookings results. Because we didn't have strong, codified entry and exit criteria, there was nothing stopping junk from entering the pipeline. A good portion of it probably shouldn't have been there. That's what happens when pipeline definitions are vague and advancement criteria aren't enforced.

Handoffs are another friction point. CS asks customers the same questions sales already asked during onboarding. Information captured during the sales process doesn't transfer cleanly to the team that needs it next. The customer experience feels disjointed because internally, it is.

And then there are the definition problems. What does "closed-won" actually mean — is it when the contract is signed, when the first payment is received, or when onboarding starts? What counts as an MQL versus an SQL? These sound like semantic debates, but they create real measurement problems. If your teams are measuring different things and calling them the same name, your data will reflect that confusion — and any AI you build on top of it will amplify it.

**Ask yourself honestly:**

- Do your marketing, sales, and CS teams share a common set of definitions for lead stages, pipeline stages, and customer lifecycle stages — and are those definitions written down?
- When a deal moves from sales to onboarding, does the receiving team have everything they need without asking the customer to repeat information?
- Is there clear agreement between sales and finance on deal structures, discounting authority, and what can and can't be sold?
- Could you explain your pipeline advancement criteria to someone outside the company in under two minutes — and would every member of your revenue team describe it the same way?
- If pipeline creation is underperforming, do your sales leaders have the ability to create deals that probably shouldn't be there — or do your entry criteria prevent that?

Misalignment between teams creates noisy data, inconsistent processes, and conflicting metrics. AI doesn't fix alignment problems — it surfaces them faster and at higher volume.

## 5. Measurement Framework

This is the one that separates companies that are truly ready to scale from companies that are just tracking dashboards and hoping for the best.

The right approach starts with the end in mind. What do you need to produce in bookings this quarter? Work backwards from there, mathematically, using your actual conversion data. How many deals need to be in the pipeline, and at what value? How many qualified meetings does that require? How many MQLs feed those meetings? Each stage has a conversion rate — and if you don't know those rates from real data, that's your first problem.

Once you have those numbers, the discipline is tracking your pacing against them continuously. If you're 50% of the way through the quarter, you should know exactly whether you're at 50% of each metric, where you're short, and what the specific bottleneck is. Not at the end of the quarter. Every week.

What I see more often is the opposite. Teams track metrics but don't do anything with them. Dashboards exist but nobody changes their behavior based on what the dashboards say. People report on activity volume (calls made, emails sent) without connecting it to the outcomes that actually matter. Many companies track too many metrics at once, diluting focus — instead of identifying the three to five numbers that actually drive the outcomes you care about and watching those relentlessly.

There's also a measurement shift that many companies haven't made yet. We're past the growth-at-all-costs days of 2021. Efficiency is at a premium now. Companies should be measuring not just growth metrics but efficiency metrics that show how they're progressing with AI transformation and operational scalability. Think ARR per full-time employee. Cost per MQL. Cost per opportunity. LTV to CAC. These are the metrics that tell you whether your growth is sustainable and whether your operational investments are actually creating leverage — or just creating more cost. If you're not measuring how efficiently you grow, you're only seeing half the picture.

**Ask yourself honestly:**

- Can you work backwards from your bookings target to the exact number of MQLs, qualified meetings, pipeline deals, and pipeline value you need at each stage — and are those numbers based on real conversion data?
- Do you track your pacing against those targets weekly — and does your team take action based on what the data shows?
- If I asked five people on your revenue team what the three most important metrics are, would they give me the same answer?
- Are you measuring efficiency metrics like ARR per FTE, cost per MQL, cost per opportunity, and LTV to CAC — or just top-line growth numbers?
- Are you measuring the things that drive outcomes — or the things that are easiest to measure?

If your measurement framework isn't connected to the outcomes you're trying to drive, AI will just help you measure the wrong things more efficiently. The foundation here isn't more dashboards — it's knowing exactly what to measure, measuring it consistently, and acting on what it tells you.

## What to Do With This

If you were honest with yourself and found gaps in two or more of these areas, you're not alone. Most growth-stage companies do. The ambition is there. The growth plan is there. But the operational foundation underneath it wasn't built to support what comes next — and that's exactly where AI either works or makes things worse.

The question isn't whether these gaps exist. It's what to fix first and in what order. That's exactly what our AI Readiness Assessment is designed to answer. It's a structured diagnostic that evaluates your data, process, tooling, team alignment, and measurement maturity — and delivers a prioritized roadmap so you're fixing the right things in the right sequence.

If this checklist surfaced questions you want to talk through, we're here for that conversation.
