---
author_username: laisvarejao
author_name: Lais Varejão
category: Web
color: ""
description: A checklist we use here at Vinta to ensure high quality software at scale
github_repository: https://github.com/vintasoftware/high-quality-software-standards
tags:
  - development-workflow
  - agile
  - good-practices
title: Vinta's High Quality Standards
---

# Vinta's High Quality Software Standards

- [ ] Distributed Version Control (like Git)
- [ ] Clear README instructions covering:
  - [ ] Project setup
  - [ ] Setup common issues
  - [ ] Development
    - [ ] Tests
    - [ ] Deployment
    - [ ] Commands
    - [ ] Periodic jobs
    - [ ] Integrations
- [ ] System Documentation
  - [ ] Complex business rules
  - [ ] Nontrivial design decisions
  - [ ] Known shortcomings
  - [ ] Third-party integrations documentation
- [ ] Easy onboarding process (eg. [Vinta's Playbook - Developer Onboarding](https://github.com/vintasoftware/playbook/blob/89810e160c8bfb65de63237d2dc8a910ff265e5d/checklists/developer_onboarding.md))
- [ ] Loosely coupled architecture. [More details](https://www.coursera.org/lecture/devops-culture-and-mindset/the-importance-of-loosely-coupled-architecture-teams-eEmIN)
- [ ] Configuration stored in environment. [More details](https://12factor.net/config)
- [ ] Logging standards facilitating search and protecting user data:
  - [ ] Logs are prefixed according to task/feature
  - [ ] No sensitive data is being logged
- [ ] Small batches of work
- [ ] Continuous testing (i.e., the process of executing automated tests as part of the software delivery pipeline)
- [ ] Continuous integration
- [ ] Code coverage above 80%
- [ ] Code review standards, including frequent small PRs. [More details here](https://devchecklists.com/pull-requests-checklist/) and [here](https://blog.newrelic.com/engineering/code-review-guidelines/)
- [ ] Safe automated deployment pipeline, including protected Master branches
- [ ] Deployment frequency between one day and one week
- [ ] Lead time for changes between one day and one week s (i.e., how long it takes to go from code committed to code in production)
- [ ] Time to restore service is less than one day
- [ ] Change failure rate between 0-15%
- [ ] High availability
- [ ] Error tracking tools (eg. [Sentry](https://sentry.io/welcome/))
- [ ] Monitoring tools (eg. [New Relic](https://newrelic.com/), [Librato](https://www.librato.com/))
- [ ] Security
  - [ ] Destructive actions prompt confirmations
  - [ ] Follows the principle of least privilege: block resources/actions by default (whitelist when permission is needed)
  - [ ] Has static code analyzers to find security flaws (eg: eslint-plugin-security, eslint-plugin-react)
  - [ ] Has dependency vulnerability checkers in place (eg: Python safety, npm audit)
  - [ ] Promotes privacy and raises awareness on users and stakeholders
- [ ] Development, Staging and Production environments as similar as possible, while asserting user data protecting through anonymization. [More details](https://docs.google.com/presentation/d/1d1AEIg9_GLCL62E8Nkfcu4W5UyNXK8mR8ynDqcaomMo/edit)
- [ ] References
  - [ ] https://martinfowler.com/articles/is-quality-worth-cost.html
  - [ ] https://cloud.google.com/blog/products/devops-sre/the-2019-accelerate-state-of-devops-elite-performance-productivity-and-scaling
  - [ ] https://12factor.net/config
