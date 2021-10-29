## Checklist Objective
##### At [Vinta](https://vintasoftware.com), we have a design review process for pieces of software that are about to be (or that have just been) shipped to production. All tasks that have a design spec associated with it should go through Design QA. 

The goal is to track inconsistencies or unplanned behaviors and provide managers and developers with a clear path to fix them efficiently. It also helps the team to keep quality metrics (i.e., how many cards are going back to development for fixes after deploy).

## Before the QA, check if:
* [ ] The task description (user story) is clear enough for you to start the review. 
* [ ] The test environment enables you to test the behavior described in the card.
* [ ] If any of those aspects is blocking you, ping the assigned developer to help you out. If they're not available, ping the tech lead or project manager.

## UI Consistency
* [ ] Color Palette
    * Color usage must be consistent with your specs and with the semantics described on the style guide.
* [ ] Iconography
    * The icons in use must be the ones provided by the designer, and their size and placement must be according to design specs.
* [ ] Typography
    * Check if font-size, line-height, font-spacing, and headings are consistent with your design.
* [ ] Copy
    * Search for typos, overflowed texts, weird line breaks, etc.
* [ ] Graphics and Images
    * Check if photos and illustrations are behaving well (not distorted, cropped or scaled differently than the specified behavior). Resize your browser windows to see how they are acting. 

## Behavior consistency
* [ ] Interactive Elements States (Hover, Active, Disabled, etc.)
    * Stress-test all the interactions to ensure the developer implemented all states of buttons and links.
* [ ] Animations
    * Those can be tricky since animations are often tested briefly before handoff, and communication noise can create a gap between mockups and the final code.
* [ ] Interaction Type (Click, Drag, Swipe, etc.)
    * Test the clicks, drags, and swipes in the UI. Some might seem to be good solutions on the design phase but can prove to be annoying or just bad on the final product. Stress tests here are always recommended.
* [ ] Placeholders
    * Check if all the placeholders were implemented according to the design. 
* [ ] Warnings & Error States
    * Stress-test all the fields with wrongly inputted data, click out, close the page in the middle of an operation, click buttons and go back and forth on the navigation. Breaking the natural flow in various ways is important to test if the implemented error cases are enough to keep the UX in good shape.
* [ ] Feedback
    * Check if toast notifications, inline warnings, or any other visual signals are appearing after an action. Make sure that the correct feedback is happening whenever anything wrong occurs.
* [ ] Responsiveness
    * Repeat all the steps above for each platform the feature is being shipped for. Be mindful of weird line-breaks of error messages on mobile and occlusion of essential UI elements by notifications.

## Document the outcome
##### A review can have three different outcomes: it might need a development fix, a design fix, or the task can be done/cleared.

* [ ] If the task needs a development fix:
*    [ ] Add notes in the task for any inconsistencies found. Link the design specs, add screenshots and videos to illustrate the behavior you have encountered. 
*    [ ] Signal that the task needs a development fix in your project management platform, making the relevance and urgency of the task clear to the team.
*    [ ] Tag or assign the developer who worked on the card. They are the owner of the issue now.

* [ ] If the task needs a design fix
*    [ ] Add notes explaining what is missing or wasn't specified in your design process.
    * It can be a use case that wasn't considered, and so the developer didn't implement, or also a mockup that was misunderstood, lacked a detailed explanation and generated a wrong result.
*    [ ] Signal that the task needs a design fix in your project management platform.  
*    [ ] Let your manager know about the design debt and prioritize the fix on the next sprint. 
