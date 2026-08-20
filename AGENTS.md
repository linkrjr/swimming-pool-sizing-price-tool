# Swimming Pool Sizing Price Tool

## Business Requirements

- MVP project as a web app for price sizing a swimming pool maintenanca job based on 3 dimensions, length, width and depth
- The web app should have only one page
- The main form should have the following components:
  - Width text field
  - Length text field
  - Depth text field
  - Calculate button
  - a label where the final result is presented
- No more functionality: no archive, no search/filter. Keep it simple
- The priority is a slick, professional, gorgeous UI/UX with very simple features
- The app shoul have a top level menu with an admin option
- The admin page should have the ability to add the base cost which will be used by the form to calculate the cost of the maintenance
- This admin page should save the cost in the browser localstorage, if localstorage is not available, save it in cookie.

## Technical Details

- Implemented as a modern NextJS app, client rendered
- The source code should be inside a `src` directory
- No persistence other than the localstorage or cookie
- Use popular libraries
- As simple as possible but with an elegant UI
- Source code must be in Typescript
- where possible, use VITE

## Color Scheme

- Accent Yellow: `#ecad0a` - accent lines, highlights
- Blue Primary: `#209dd7` - links, key sections
- Purple Secondary: `#753991` - submit buttons, important actions
- Dark Navy: `#032147` - main headings
- Gray Text: `#888888` - supporting text, labels

## Strategy

1. Write plan with success criteria for each phase to be checked off. Include project scaffolding, including .gitignore, and rigorous unit testing.
2. Execute the plan ensuring all critiera are met
3. Carry out extensive integration testing with Playwright or similar, fixing defects
4. Only complete when the MVP is finished and tested, with the server running and ready for the user

## Coding Standards

1. Use latest versions of libraries and idiomatic approaches as of today
2. Keep it simple - NEVER over-engineer, ALWAYS simplify, NO unnecessary defensive programming. No extra features - focus on simplicity.
3. Be concise. Keep README minimal. IMPORTANT: no emojis ever
