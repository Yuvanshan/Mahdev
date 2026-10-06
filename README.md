# Aurelle – WhatsApp Fashion Store (Next.js)

A women's fashion storefront built with **Next.js 15 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**.
Customers browse, add items to a bag and **place every order through WhatsApp**. The site takes no payments and has no backend.

## Features

- Home: rotating announcement bar, hero, benefits strip, category tiles, new arrivals, sale banner, best sellers, "how to order" steps
- Collections: category / size / price filters, search, sorting, deep links (`/collections?category=dresses`)
- Product pages: gallery, colour, size and quantity pickers, related items, **Order this on WhatsApp**
- Bag drawer: quantity changes, free-delivery progress, totals
- Checkout: delivery form with Sri Lankan mobile validation and all 25 districts, then WhatsApp opens with the order filled in
- Wishlist, Lookbook, About, Help/FAQ with a size guide, Contact (sends through WhatsApp), 404
- A floating WhatsApp chat button on every page
- The bag and wishlist are saved in the browser (localStorage)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Customise

| What | Where |
| --- | --- |
| Brand name, **WhatsApp number**, contact details, delivery fee, announcements, menu | `src/config/site.ts` |
| Products and categories | `src/data/products.ts` |
| Colours and fonts | `src/app/globals.css` (`@theme` block) and `src/app/layout.tsx` |
| WhatsApp message format | `src/lib/whatsapp.ts` |

- **WhatsApp number:** digits only, in international format without `+` (for example `94771234567`).
- **Product photos:** put images in `public/products/` and set `image: "/products/your-file.jpg"` on each product. Until then, gradient placeholders are shown.
- **Hero video:** add `public/hero.mp4` and set `heroVideo: "/hero.mp4"` in `site.ts`.

## How a WhatsApp order works

1. The customer adds items to the bag and taps **Order on WhatsApp**.
2. They fill in their name, mobile number, address, city and district.
3. WhatsApp opens (`wa.me`) with a formatted message listing the items, sizes, colours, quantities, subtotal, delivery fee, total and delivery details.
4. The customer taps **Send**. The shop confirms stock and payment (cash on delivery or bank transfer) in the chat.

## Deploy

Deploys as-is to Vercel, Netlify or any Node host. Every page is pre-rendered as static content.
