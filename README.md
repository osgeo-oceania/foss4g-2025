# FOSS4G 2025 website

Auckland, New Zealand - 17th to 23rd November 2025

## Dev

Install NodeJS (version 22) - https://nodejs.org/en/download

Install dependencies, and then run development server

```bash
npm install

npm run dev
```

## How to Add/Edit pages

We are using [MDX](https://mdxjs.com/) pages, which is markdown with JSX support.

- Pages are in the [`pages/`](/pages/) directory
- The navigation menu is in [`pages/_menu.ts`](/pages/_menu.ts)

There are a few custom components you can add to pages

- `HeaderImage`, `DividerImage` and `FooterImage`
- `Title` to set the browser page title
- `InlineMap` to show the Maplibre map component
