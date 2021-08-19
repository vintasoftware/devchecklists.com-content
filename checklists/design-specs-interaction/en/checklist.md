## Interactive States 
##### These are the most common states for web buttons, links, etc. but your UI can have more or less states depending on the function of a specific element.

* [ ] Regular
* [ ] Hover
* [ ] Active
* [ ] Disabled
* [ ] Loading
* [ ] Focused 
* [ ] Animations
* [ ] Transitions
    * You should specify whenever there are transitions between elements, based on user interaction. If necessary, link an animation library with the behavior you are envisioning.
* [ ] Loading States
    * If the UI is taking too long to render or is waiting for a slow server action to move forward, a loading state should be considerate to inform the user that the system has not frozen.

## Interaction Type
##### Check if the current interaction type is the best suitable for the element in case.     * E.g. E.g. Sometimes a hover can be more convenient than a click to open.

* [ ] Click/Tap
* [ ] Secondary Click (only desktop)
* [ ] Hover (only desktop)
Convenient for previewing content 
* [ ] Double Click/Tap
* [ ] Click/Touch & Hold
* [ ] Drag
Useful for rearranging content quickly
* [ ] Vertical Scroll 
* [ ] Horizontal Scroll (preferable for mobile)
    * Good for grouping content into horizontal lists and reducing vertical space. The optimal interaction for these lists and carousels is different on mobile (swipe) and desktop (click). Make sure you have the necessary visual affordances for each one (E.g., arrows on desktop, dots on mobile).
* [ ] Swipe (recommended only for mobile)

## Placeholders
* [ ] Whenever a section or element that is supposed to be filled with information lacks data, it's important to predict that and create a placeholder case.
    * Beware: Placeholders should not replace labels, only give users further understanding about that field.

## Error states & Warnings
##### There are a lot of possible error states & matching warnings for unexpected or prohibited behaviors. Below are the most common ones:

* [ ] Wrong format data
    * E.g., Date fields that can't be in the future, Text that can't contain symbols, etc.
* [ ] Blank required fields
* [ ] Wrongly user-uploaded data
    * E.g., Wrong file type, File too large, etc.
* [ ] Data loading issues
    * E.g., Internet connection problems, Problems on the server side, etc.
* [ ] Proper Feedback 
    * Always make clear what is the problem, and give the user instructions on how to solve it. If it's a forgotten password, provide a recovery link. If it's a server problem, inform an expected solving time for the user to wait or a way to contact the support team.
