## About

Website for Western Aero Design as part of the Engineering Design (ES 1050) assignment to learn a new tool on your own.

I had some prior knowledge of back-end with Node.js and Express.js from Fundamentals of Web Applications (COMP 2406), but knew very little about front-end in terms of HTML and CSS. This was a project to supplement my back-end by learning HTML and CSS as front-end is very useful for creating platform independent and highly flexible tools.

## Structure

This project actually started approaching a very basic CMS in that the content is decoupled from the website layout and theme.

- `views/template.jade`: main layout file (Jade template) for all pages.
- `pages/`: contains HTML files for the inner body of each page. The template engine will substitute the entire file into the body of the template; if a page is text only, no HTML will need to be written.
- `styles/`: contains all the CSS styles used by various pages
- `pages.json`: defines the pages that should be loaded by the router
- `main.js`: main server script. Contains code for Express.js routing

## Usage

`nodejs main.js` to start the server
