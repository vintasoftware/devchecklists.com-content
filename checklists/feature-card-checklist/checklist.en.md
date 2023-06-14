---
author_username: robnff
author_name: Robertson Novelino
category: Project Management
color: ""
description:
  Checklist for everything that needs to be described and linked whenever
  a developer creates a new feature card on Trello so other people (or the same dev
  in the future) can understand the whole feature quicker.
github_repository: https://github.com/vintasoftware/feature-card-creation-checklist
tags:
  - development-workflow
title: Feature Card Checklist
---

## Process

- [ ] Include direct URL of product if possible.
- [ ] Write a small summary describing the feature.
- [ ] Chart the happy-path and describe it. Flowchart if too complex.
- [ ] List documents related to feature. Specify document page and additional references if necessary. If the document is in a Trello card, link the card on this new one to avoid duplication.
- [ ] Create a checklist and add as many items as possible as you think about the requirements of the feature (be broad here, make sure not to forget things that might seem obvious).
- [ ] List permissions or user roles necessary to accomplish card. Describe them.
- [ ] Think about default values for data. Describe them.
- [ ] Think about error cases, include as checklists and define what to do if they happen. Examples of error cases: missing input, wrong input, missing data, duplicate data, missing permissions, going directly to a later step of a flow, offline user.
- [ ] Think about edge cases related to side effects, include as checklists and define what to do when they happen. Are edge cases related? (For example, considering the feature "As a free user, I can become a premium user by paying a subscription plan with a credit card", an edge case is when the user pays but afterwards asks for a refund directly to his credit card operator. An appropriate response to this situation is having some sort of webhook on the application to get notified when an user cancels a payment.)
- [ ] Think what messages and other feedback the user will see. Describe them. Include the copy (texts).
- [ ] Include ideas and tips on implementation details. Example of tips: libraries and tools to use, debugging tips, performance bottlenecks, modularization tips, database modeling, code organization, data formats to use, etc.
