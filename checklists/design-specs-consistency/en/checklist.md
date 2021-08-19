## Color Palette
##### All these color patterns and behaviors should be predefined by a Styleguide to ensure consistency.
* [ ] Contrast (https://color.a11y.com/ContrastPair/)
    * Make information visible and readable when combining colors. 
* [ ] Style & Matching Rules
    * Check if it matches predefined rules on how to group and use the colors (secondary shades, gradients, transparent elements, etc.).
* [ ] Impact
    * Ensure that the colors that draw more attention (primary color, emphasis color, action color) are in the right places.
* [ ] Semantics
    * Make sure that you're using colors that make sense semantically. E.g., green for success, red for error.

## Iconography
* [ ] Alignment 
    * Icons should be consistently aligned with other icons, text, and graphic elements.
* [ ] Visual weight
    * Check if the visual weight matches other icons and UI elements.
* [ ] Size
    * Icons should be placed in a square bounding box and have a standard size, to make it easier for development (and for design as well). Avoid shipping icons with half-pixel sizing.
* [ ] Style 
    * Icons can come in a range of different styles (outline, solid, monochromatic, colorful, flat, skeuomorphic, sharp or round edges, etc.). If you gathered icons from various sources to use in the UI, put them all together, check if their style is consistent, and make adjustments if needed.

## Typography
* [ ] Font family
* [ ] Weights
* [ ] Sizes
    * Font sizes should be used consistently through the UI, respecting the H1-H6 hierarchy defined in the product style guide.
* [ ] Readability
* [ ] Line-height
    * Headings should have a tighter line-height. Body copy must prioritize reading comfort, so we usually design it with a taller line-height.
* [ ] Text containers
    * Make sure you are working with text containers as opposed to free-form text.
* [ ] Line breaks
    * Make sure that the copy is breaking nicely on all viewports and breaking points. However, avoid force-breaking lines on regular text blocks (it can look weird on responsive web pages).
* [ ] Format
    * Respect the formatting rules defined in the style guide. E.g., titles are all CAPITALIZED; warnings are lowercase; buttons are Title Case, etc.
* [ ] Margins and whitespace
* [ ] Link behavior
    * Check if all the links have the same visual affordance. Inconsistent link formatting can confuse users.

## Copy
* [ ] Grammar and syntax
    * Use a tool like Grammarly to review copy whenever it appears on your UI: headlines, menus, dialogs, toast notifications, etc.
* [ ] Tone
    * Make sure you're communicating in a way that makes sense for your product's audience and the context (e.g., the tone for an insurance platform must be serious and reliable; a travel app should be friendly and adventurous.
* [ ] Respect to the hierarchy
    * Make sure the text is following rules for title, subtitle, body, etc.
* [ ] Emphasis 
    * If you're making use of bolds, italics and other emphasis formatting, check if the usage is consistent throughout the UI, and avoid too much highlighting.
* [ ] Client Review
    * It's important to review the content of messages and UI copy with the client or product owner since they usually have a good grasp of how their users and market communicate (abbreviations, metaphors, etc.)

## Graphics/Imagery
* [ ] Style & Content
    * Search for other instances of graphics in the UI to check what kind of visual assets (photos vs. illustrations) fit better with the product's visual language.
* [ ] Client review
    * Check with the client or PO if all images are final or placeholders.
* [ ] License
    * Check what is the license for the images you're using, and if it's regular. If you're using real people's photos (not from an image stock), double-check if you have permission to publish them.
* [ ] Quality vs. File size
    * Try to find the right file size. If the image file is too small, it can be pixelated, and if it's too heavy, the loading time can be excruciating for the user as well. You can run your images through a compression tool such as [Squoosh](https://squoosh.app) to see how far it can be compressed without losing quality.
* [ ] Image assets export
    * If you're handling photos, it's preferable to optimize them on image editing software (i.e., Photoshop, Lightroom) rather than export via Sketch or Figma. Dedicated software gives designers more control over the result and Quality/Size ratio.
