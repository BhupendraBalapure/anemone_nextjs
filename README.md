# 🌸 Anemony MSME Digital Operating System (Next.js 15 + Supabase)

An enterprise-grade, multi-tenant digital operating system and no-code store builder engineered for Micro, Small, and Medium Enterprises (MSMEs).

---

## ⚡ Tech Stack

- **Framework**: Next.js 15+ (App Router, React 19, Server & Client Components)
- **Database & Auth**: Supabase (PostgreSQL with Row Level Security - RLS)
- **Domain Routing**: Next.js Edge Middleware (Subdomains & Custom Domain resolution)
- **Styling**: Tailwind CSS 4 + Lucide React Icons
- **Animation & FX**: Canvas Confetti (celebratory launch)
- **Conversational Commerce**: WhatsApp Click-to-Chat payload serialization (`https://wa.me/...`)

---

## 🚀 Quick Start (Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase (Optional for Local Demo)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Then execute [`supabase/schema.sql`](supabase/schema.sql) in your **Supabase Dashboard -> SQL Editor** to create the tables (`tenants`, `catalog_items`, `orders`) and Row Level Security policies.

*(Note: The app runs in interactive demo mode even without active Supabase keys!)*

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧭 Key Routes & Features

| Route | Feature Description |
| :--- | :--- |
| [`/`](http://localhost:3000) | **Marketing Hub**: Overview, feature pillars, and instant launch button |
| [`/onboarding`](http://localhost:3000/onboarding) | **60-Second Onboarding Wizard**: Industry recommendation, auto-slug generator, template picker, and automatic 4-item catalog seeder |
| [`/store/artisan-decor`](http://localhost:3000/store/artisan-decor) | **Retail Storefront**: Category filter, search, cart drawer, `FESTIVE20` coupon engine, and WhatsApp checkout |
| [`/store/city-care`](http://localhost:3000/store/city-care) | **Clinic & Services Storefront**: Appointment booking scheduler and doctor consultation fee menu |
| [`/store/{slug}/dashboard`](http://localhost:3000/store/artisan-decor/dashboard) | **Merchant Dashboard**: Order management, status toggling, catalog review, and DNS verification |

---

## 🛠️ Project Structure

```text
src/
├── app/
│   ├── page.tsx                     # Platform Landing Page
│   ├── onboarding/page.tsx          # 60-Sec Store Creation Wizard
│   └── store/[slug]/
│       ├── page.tsx                 # Dynamic Storefront (RSC)
│       ├── StorefrontClient.tsx     # Cart, Search, Coupons & WhatsApp Checkout
│       └── dashboard/
│           ├── page.tsx             # Merchant Admin Hub
│           └── MerchantDashboardClient.tsx # Orders & Domain DNS
├── lib/
│   ├── supabase/
│   │   ├── types.ts                 # Tenant, Catalog, and Order models
│   │   ├── client.ts                # Browser Supabase client
│   │   └── server.ts                # Server Supabase client (SSR)
│   ├── template-catalog.ts          # 11 Categories & Archetype Themes
│   ├── store-service.ts             # Data layer (Supabase + Local fallback)
│   └── whatsapp.ts                  # Algorithm 4: WhatsApp Invoice Serializer
└── middleware.ts                    # Algorithm 1: Dynamic Domain & Subdomain Router
```
