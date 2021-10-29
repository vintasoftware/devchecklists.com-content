## Who should use this checklist?
Designer and Project Manager should discuss these points before presenting a design solution to the client.

## When to validate technical viability?
It’s best to do it in the early stages of your design solution when all you have is the user journey or a low-fidelity wireframe. Avoid investing time in polishing an interface without having validated it previously, as it might incur in lots of rework. However, if you’re working on features that have visual complexity like animation and micro-interactions, or your solution requires new components, you should also validate it afterward.

## Before the sync
* [ ] Make sure to know who is the decision-maker. 
    * In most teams, the tech lead knows more about feasibility constraints than the project manager. However, you might need input from more than one person before reaching the final solution.
* [ ] Decide if any other developer should participate
    * That depends on the nature of the feature you’re working on (front-end, data structure, system architecture, etc.). A particular developer might be more knowledgeable in that area and provide useful insights. Include that person in the sync. 
* [ ] If neither the tech lead or the project manager is available, get an OK from leadership and run the validation with the expert dev. 
    * Document the outcomes and then validate with a decision-maker later. 
* [ ] Have the current state of your work ready to be presented.
    * It can be wireframes, a user journey, or even early sketches on paper. But make sure to show only what’s relevant to the discussion at hand.
* [ ] Organize your meeting notes.
    * You should enter the sync knowing which topics you need to discuss regarding the solution you’re working on.
* [ ] Brief the tech lead on the sync’s subject.
    * Send the meeting notes along with the calendar invite so they can prepare, do some research on the subject, and speed up the discussion.

## Running the sync
* [ ] Understand the feature’s complexity
*    [ ] Which parts of the product will be involved in this solution?
      * E.g., Go through the user journey together so that the developer can understand the scope of the solution.
*    [ ] What are the technical limitations related to this feature?
      * E.g., This may be related to system architecture, front-end framework, or the product’s data structure. For larger features, the tech lead might take a few days to assess complexity correctly, so consider that interval on your design sprint.  
*    [ ] Will this solution increase code complexity exponentially?
      * E.g., If so, the designer should try a different approach, which is more straightforward for development.
*    [ ] Will this solution require a major code refactoring? If so, is the value delivered to users worth the effort?
      * E.g., Discuss the tradeoffs of the change you’re proposing. This process goes better if you have data and user research backing you up.

* [ ] Validate components
*    [ ] Which component set or framework is available for the feature in question?
      * Not every part of the product is running state-of-the-art structure and frameworks. Sometimes you need to work with a limited set of components or interactions to avoid a significant refactoring.
*    [ ] Do we need to create new components/pages for this feature? 
If so, make sure that the new component works with the current page structure.
*    [ ] Can a similar solution be achieved with pre-existing components?
      * If the compromise won’t damage the experience and can drastically reduce development effort, it’s worth adjusting the design. 
*    [ ] Is there any lib or ready-made asset that helps with the job?
      * If so, try to incorporate it into the solution, or adapt the design to fit the existing asset.

* [ ] Consider performance
*    [ ] How much this solution increases the code responsiveness complexity?
      * Will there be additional media queries or custom layouts for different breakpoints? Analyze the effort/impact ratio of that solution to see if the UX gain will be worth the extra complexity for development. 

*    [ ] Will this solution have an impact on performance?
      * Animations, data requests on front-end, and heavy use of images may cripple performance on web applications. If the impact is significant, try to work on another alternative. 

## Sync outcomes
*    [ ] Take notes on all the aspects of your solution that will need adjustments. 
      * If a solution is not reached during the sync, both designer and developer should research alternatives, and sync again as soon as possible, to avoid harming the sprint.
