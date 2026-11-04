# NexAura Computers — Frontend Application

This directory contains the client-side single-page application (SPA) for **NexAura Computers**, an e-commerce platform for computer hardware, custom rigs, laptops, and peripherals.

The frontend is built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **React Router DOM v7**.

> For the full repository overview, backend architecture, and complete documentation, refer to the [Root README](../README.md).

---

## Tech Stack & Libraries

- **React 19** (`react`, `react-dom`)
- **Vite 8** (Fast HMR & build tooling)
- **Tailwind CSS v4** (`@tailwindcss/vite`, `tailwindcss`)
- **React Router DOM v7** (Declarative client-side routing)
- **React Hot Toast** (Toast notifications)
- **React Icons** (Heroicons, FontAwesome 6, Feather, BoxIcons, Tabler)
- **@react-oauth/google** (Google OAuth2 sign-in)
- **@supabase/supabase-js** (Direct cloud image upload to Supabase Storage)
- **Axios** (API communication with the Express backend)

---

## Available Scripts

In this directory, you can run:

```bash
# Start development server with Hot Module Replacement (HMR)
npm run dev

# Build production-ready assets into the dist folder
npm run build

# Preview the built production assets locally
npm run preview

# Run ESLint to check for code style and syntax issues
npm run lint
```

---

## Environment Setup

Create a `.env` file in this directory:

```env
VITE_API_URL=http://localhost:3000/api
```

- **Google OAuth Client ID** is configured in `src/App.jsx`.
- **Supabase Storage credentials** are configured in `src/utils/mediaUpload.js`.

---

## Storefront Routes Overview

### Customer Storefront
- `/` — Landing page with hero banner carousel, category highlights, trust badges, and featured products
- `/products` — Product catalog with category filter tabs and URL-synchronized search (`?q=...`)
- `/overview/:productId` — Single product details view with:
  - Top breadcrumb & quick catalog counter (`Product X of Y`)
  - Adjacent hardware browse cards (Previous & Next product switchers)
  - Interactive multi-image slideshow with zoom-on-hover & auto-reset
  - Related Products horizontal carousel slider matching hardware category
  - Quantity controls, Add to Cart, and Buy Now checkout actions
- `/cart` — Persistent shopping cart with item quantity modifiers and total calculation
- `/checkout` — Checkout review with shipping address modal and order submission
- `/my-orders` — Customer order history table with full order details modal
- `/settings` — Customer profile update (first name, last name, avatar upload via Supabase) and password change
- `/contact-us` — Contact information, inquiry form, and interactive FAQ
- `/privacy-policy` — Comprehensive e-commerce data privacy and security policy
- `/terms-of-service` — Store terms, warranties, delivery timelines, and dispute terms
- `/sitemap` — Searchable structured directory of all store sections and catalog categories
- `/login` — User authentication (standard email/password and Google OAuth2)
- `/register` — Account registration with client-side validation

### Admin Suite (`/admin/*`)
Protected by the `AdminRoute` component (client JWT check + server-side verification):
- `/admin` or `/admin/dashboard` — Live business metrics, 7-day sales velocity chart, order status distribution, and recent orders
- `/admin/products` — Complete inventory table with stock indicators and action buttons
- `/admin/add-products` — Product creation form with multi-image Supabase upload
- `/admin/edit-products` — Product update form pre-populated with selected item data
- `/admin/orders` — Store-wide order fulfillment management with order details modal, status updates, and administrative notes
- `/admin/categories` — Category and brand manager with product count tracking
- `/admin/coupons` — Discount coupon management (percentage & fixed discounts)
- `/admin/banners` — Marketing hero and promo banner configurations
- `/admin/settings` — Store profile, shipping rates, and payment gateway sandbox settings
