# FishEye - Platform for Freelance Photographers

FishEye is a website that showcases the work of freelance photographers. Our platform provides a unique opportunity for photographers to display their best works and connect with clients for events and print services. As one of the largest freelance photography sites, we have an extensive network of talented photographers.

## Project Objective

Our current website is outdated and requires a revamp. We recently secured funding and would like your team to transform our static site into a dynamic one.

## Prototype Functionality

The following pages were created for the prototype:

### Home Page:

-   Display a list of all photographers, including their name, slogan, location, hourly rate, and a thumbnail of the photographer's profile image.
-   When users click on a photographer's thumbnail, they should be directed to the photographer's individual page.

### Photographer's Page:

-   Show a gallery of the photographer's works.
-   Photographers can showcase both photos and videos.
-   For videos, displays a thumbnail image in the gallery.
-   Each media item has a title and a number of likes.
    -   By clicking on the "Like" icon, the number of likes displayed is incremented.
    -   The total number of likes for a photographer correspond to the sum of likes for each media item.
-   Media items can be sorted by popularity or title.
-   Clicking on a media item open it in a lightbox:
    -   The lightbox has a close button in the corner.
    -   Navigation buttons allow users to switch between media items within the lightbox.
    -   Keyboard arrow keys can also be used to navigate between media items within the lightbox.
-   Displays a button to contact the photographer:
    -   The contact form appears as a modal overlay.
    -   It includes fields for name, email address, and message.
    -   For now, the contents of the three fields are saved in the console.

## Design Considerations

-   Responsive design is not required for this iteration as mobile support is not necessary.
-   Accessibility is a key requirement:
    -   All images have alt text descriptions, including textual descriptions for photos and the photographer's name for profile pictures.
    -   Semantic HTML elements are used to describe their intent rather than relying on `<div>` and `<span>` elements.
    -   ARIA attributes are used to describe custom elements and their functionality.
    -   All images and code pass AChecker tests without any "known issue" to comply with WCAG standards.
    -   Event management (keyboard clicks and presses) is configured using `KeyboardEvent.key` or `KeyboardEvent.code`.

## Technical Constraints

-   Code is separated into different files (HTML, CSS, JavaScript).
-   ESLint is used (with default settings) to ensure robust code.
-   Modern JavaScript (ES6) is used and deprecated features are avoided.
-   The code is written in a readable way, with meaningful variable and function names. Comments are added where necessary to explain the code's functionality.

## Directory Structure

The directory contains the following files and directories:

-   `index.html`: HTML file for home page.
-   `photographer.html`: HTML file of a photographer's individual page.
-   `css/style.css`: CSS file for general site layout.
-   `css/photographer.css`: CSS file specific to the photographer's page.
-   `scripts/pages/index.js`: JavaScript file for home page.
-   `scripts/pages/photographer.js`: JavaScript file for the photographer's page.
-   `scripts/factories/form.js`: JavaScript file to create the contact form.
-   `scripts/factories/gallery.js`: JavaScript file to create a photographer's individual page.
-   `scripts/factories/lightbox.js`: JavaScript file for lightbox creation.
-   `scripts/factories/photographer.js`: JavaScript file for creating photographer's cards.
-   `scripts/pages/photographer.js`: JavaScript file for the photographer's page.
-   `scripts/utils/contactForm.js`: JavaScript file for contact form functionalities.
-   `scripts/utils/fetchPhotographers.js`: JavaScript file for retrieving photographer data.
-   `scripts/utils/lightbox.js`: JavaScript file for lightbox functionalities.
-   `scripts/utils/likes.js`: JavaScript file for likes functionality.
-   `data/photographers.json`: JSON file containing photographer data.
-   `assets/`: Directory for storing images and videos used on the website.
