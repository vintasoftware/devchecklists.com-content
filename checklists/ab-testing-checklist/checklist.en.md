---
author_username: rsarai
author_name: Rebeca Sarai
category: Product Metrics
color: ''
description: All the learning of a team doing A/B tests on one checklist.
github_repository: https://github.com/vintasoftware/ab-testing-checklist
tags:
- product-metrics
title: A/B Testing Checklist
---
## 1. Setup of A/B Testing Tools
  * [ ] Avoid the [NIH(Not Invented Here)](https://www.techopedia.com/definition/3848/not-invented-here-syndrome-nihs) Syndrome.
  * [ ] Make sure you already have a web analytics package on your site.
    * Most common: [Google Analytics](https://marketingplatform.google.com/about/analytics/).
  * [ ] Select an A/B testing tool. Don't build your own A/B testing system.
    * Most common: [Google Optimize](https://marketingplatform.google.com/about/optimize/), [Optimizely](https://www.optimizely.com/).
## 2. Decide what to experiment
  * [ ] Be careful when launching things because they "don't hurt" or they are "too simple". Test them before.
    * E.g. [How we lost (and found) millions by not A/B testing](https://signalvnoise.com/posts/3945-how-we-lost-and-found-millions-by-not-ab-testing)
  * [ ] Check your system metrics to find areas that need improvements.
    * E.g.
      * [ ] They can be on the frontend or in the [backend](https://developers.google.com/optimize/devguides/experiments)
      * [ ] Focus on things that you can mesaure if there was an improvement.
      * [ ] Focus on things that affect your aquisition flow directly.
      * [ ] Use analytics tools such as Google Analytics, heatmaps, surveys to see find points of improvements.
  * [ ] Be strategic about what you test.
    * E.g. Testing changes on the main content of your home page has more impact then testing the content on the footer.
## 3. Formulate a hypothesis
  * [ ] Set clear goals.
    * E.g. Conversion, clicks, engagement, share, etc.
  * [ ] Use the insights from your research to build a hypothesis to achieve a specific goal.
    * E.g. Happy images will make the client happy and increase conversions.
  * [ ] Use your metrics to understand what's going on. This step shouldn't be pure guesswork.
    * E.g. According to your surveys, users don't understand the product very well, maybe adding a page to explain the product better would increase the conversion rate.
  * Keep in mind that formulating a hypothesis it's an idea/explanation for something that is based on known facts but has not yet been proven.
  * Here's an awesome article about formulating a good hypothesis: [A/B Test Hypothesis Definition, Tips and Best Practices](https://www.abtasty.com/blog/formulate-ab-test-hypothesis/)
## 4. Think about your audience
  * [ ] Determine specifically which audience will participate of the experiments.
    * E.g. Customers of a certain campain, old customers, new customers, customers from a specific state, etc.
## 5. Design your variations
  * [ ] Create the variation to achieve the clear goal you have just set on the previous step.
    * E.g Build mocks, protptypes, stylesheets, etc.
## 6. Before creating your experiment
  * [ ] Remember to guarantee independence between experiments.
    * [ ] Keep in mind: Multiple experiments can lead to *unreliable* results.
      * E.g User comes to your home page, gets to be part of test A. Moves on to the category page, gets to be part of test B. Goes to product page – test C. Adds product to cart – is entered into test D. Completing checkout – test E in effect. User ends up buying something, and "conversion" is registered.
      * More information about the trade off of multiple experiments [here](https://conversionxl.com/blog/can-you-run-multiple-ab-tests-at-the-same-time/)
    * [ ] Keep in mind: Weekday/weekend/holiday variations, seasonality of your traffic, sample size.
      * E.g. Don't run an A/B test on your product, when you are running a promotion on your baseline product.
## 7. Create the experiment
  * [ ] Use your experiment tool to create a new experiment.
  * [ ] Add an **anti-flickering** script on your site when running experiments.
    * Optimize displays variants to your website visitors by modifying the DOM (Document Object Model). In some instances, changes are made to elements that are already visible to the end user. These visible changes are referred to as page flicker.
    * More information and examples of this script [here](https://support.google.com/optimize/answer/7100284?hl=en).
  * [ ] Remove the anti-flickering script when no experiments are running anymore.
  * [ ] Don't run your A/B test less than one week and no more than two months.
  * [ ] In case you are unsure about the experiment duration use [this](https://vwo.com/ab-split-test-duration/).
## 8. Run the experiment
  * [ ] Wait for the stipulated time for achieving a statistically significant result.
    * This helps you avoid creating false expectations on results that might change drastically before the end of the experiment.
## 9. Analyze the results
  * [ ] After the end of the experiment analyze the results.
  * [ ] Did you achieve the goal?
  * [ ] How was the user's behavior?
  * [ ] If your hypothesis succeeds, deploy the winning variation.
  * [ ] If the test results remain inconclusive, draw insights from it and implement these one subsequent test.
## 10. Repeat
  * [ ] Keep doing this.
