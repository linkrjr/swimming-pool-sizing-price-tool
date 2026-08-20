# Swimming Pool Sizing Price Tool

Prices a swimming pool maintenance job from its length, width and depth. The
base cost per cubic metre is set on the admin page and stored in the browser
(localStorage, falling back to a cookie).

Vite, React, TypeScript, Tailwind CSS.

## Commands

    npm install
    npm run dev        # dev server on http://localhost:5173
    npm test           # unit and component tests
    npm run test:e2e   # Playwright end-to-end tests
    npm run build      # production build to dist/

## Pricing

    price = length x width x depth x base cost per cubic metre
