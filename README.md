# Mahdev Pvt Ltd — Event Management

A responsive event-management website for Mahdev Pvt Ltd, built with **Next.js 15**, **React 19**, **TypeScript** and **Tailwind CSS v4**.

The home page introduces the company, its corporate and private event services, its planning approach and a call to enquire. Visitors can send an event enquiry through WhatsApp from the contact page.

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
| Company name, contact details, WhatsApp number and navigation | `src/config/site.ts` |
| Home page content and event imagery | `src/app/page.tsx` and `src/components/Hero.tsx` |
| Colours and fonts | `src/app/globals.css` and `src/app/layout.tsx` |
| Event enquiry message | `src/app/contact/ContactForm.tsx` |

Set `whatsappNumber` in `src/config/site.ts` to the company's real number in international format (digits only) before publishing the enquiry form.

## Deploy

Builds as a Next.js application and can be deployed to Vercel or any Node.js host.
