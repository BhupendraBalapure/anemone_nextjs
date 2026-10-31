-- ========================================================
-- ANEMONY MSME DIGITAL OS - SUPABASE DATABASE SCHEMA
-- Multi-Tenant Schema with Row Level Security (RLS)
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. TENANTS TABLE
create table if not exists public.tenants (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text unique not null,
    custom_domain text unique,
    custom_domain_status text default 'none' check (custom_domain_status in ('none', 'pending', 'active', 'failed')),
    archetype_code text not null default 'retail' check (archetype_code in ('retail', 'clinic', 'b2b', 'salon', 'food')),
    template_id text not null default 'tokyo-minimal',
    business_category text not null default 'General Store',
    currency text default 'INR',
    whatsapp_number text not null,
    settings jsonb default '{
        "announcement": "Welcome to our store! Free shipping on orders above ₹499.",
        "operating_hours": "10:00 AM - 9:00 PM",
        "city": "Mumbai",
        "min_order_value": 0,
        "sections_order": ["hero", "featured", "catalog", "contact"]
    }'::jsonb,
    theme_tokens jsonb default '{
        "primary": "#2563eb",
        "secondary": "#1e293b",
        "font": "Inter",
        "radius": "0.5rem"
    }'::jsonb,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Index for fast tenant resolution via host / slug
create index if not exists idx_tenants_slug on public.tenants (slug);
create index if not exists idx_tenants_custom_domain on public.tenants (custom_domain);

-- 2. CATALOG ITEMS TABLE (Products, Services, RFQ items)
create table if not exists public.catalog_items (
    id uuid primary key default gen_random_uuid(),
    tenant_id uuid references public.tenants(id) on delete cascade not null,
    title text not null,
    slug text not null,
    category_name text not null,
    price numeric(10,2) not null check (price >= 0),
    compare_at_price numeric(10,2),
    type text not null default 'product' check (type in ('product', 'service', 'quote_item')),
    brand text,
    badge text,
    stock_quantity int default 0,
    in_stock boolean default true,
    image_url text,
    duration_minutes int,
    attributes jsonb default '{}'::jsonb,
    sort_order int default 0,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique(tenant_id, slug)
);

create index if not exists idx_catalog_tenant on public.catalog_items (tenant_id);
create index if not exists idx_catalog_category on public.catalog_items (tenant_id, category_name);

-- 3. ORDERS TABLE (Cart Orders, WhatsApp Snapshots, Bookings, B2B RFQs)
create table if not exists public.orders (
    id uuid primary key default gen_random_uuid(),
    tenant_id uuid references public.tenants(id) on delete cascade not null,
    order_number text unique not null,
    customer_name text not null,
    customer_phone text not null,
    customer_address text,
    type text not null default 'order' check (type in ('order', 'appointment', 'quote', 'lead')),
    items_payload jsonb not null default '[]'::jsonb,
    subtotal numeric(10,2) not null default 0,
    discount_amount numeric(10,2) not null default 0,
    coupon_code text,
    total_amount numeric(10,2) not null default 0,
    status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
    payment_method text not null default 'whatsapp' check (payment_method in ('whatsapp', 'cod', 'online')),
    notes text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create index if not exists idx_orders_tenant on public.orders (tenant_id);
create index if not exists idx_orders_status on public.orders (tenant_id, status);

-- 4. MERCHANT USERS LINK TABLE
create table if not exists public.merchant_profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    tenant_id uuid references public.tenants(id) on delete cascade not null,
    role text not null default 'merchant' check (role in ('merchant', 'staff', 'super_admin')),
    full_name text,
    phone text,
    created_at timestamp with time zone default now()
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.tenants enable row level security;
alter table public.catalog_items enable row level security;
alter table public.orders enable row level security;
alter table public.merchant_profiles enable row level security;

-- Public can view active tenants and their in-stock catalog
create policy "Public storefront can view tenants"
    on public.tenants for select
    using (true);

create policy "Public storefront can view catalog items"
    on public.catalog_items for select
    using (in_stock = true);

-- Public can create orders
create policy "Public can place orders"
    on public.orders for insert
    with check (true);

-- Merchants can view & edit their own tenant
create policy "Merchants can update own tenant"
    on public.tenants for update
    using (
        id in (select tenant_id from public.merchant_profiles where merchant_profiles.id = auth.uid())
    );

-- Merchants can manage catalog items
create policy "Merchants manage their catalog"
    on public.catalog_items for all
    using (
        tenant_id in (select tenant_id from public.merchant_profiles where merchant_profiles.id = auth.uid())
    );

-- Merchants can view and update their store orders
create policy "Merchants manage their orders"
    on public.orders for all
    using (
        tenant_id in (select tenant_id from public.merchant_profiles where merchant_profiles.id = auth.uid())
    );

-- Sample Starter Tenant Seeder
insert into public.tenants (name, slug, archetype_code, template_id, business_category, whatsapp_number)
values ('Artisan Pottery & Decor', 'artisan-decor', 'retail', 'tokyo-minimal', 'Home & Living', '919876543210')
on conflict (slug) do nothing;
