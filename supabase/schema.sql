-- ========================================================
-- ANEMONY MSME DIGITAL OPERATING SYSTEM v1.2.0
-- Supabase PostgreSQL Schema & Seeders (Faithfully ported from Laravel)
-- ========================================================

create extension if not exists "uuid-ossp";

-- Drop existing tables to avoid type mismatch conflicts
drop table if exists public.orders cascade;
drop table if exists public.catalog_items cascade;
drop table if exists public.users cascade;
drop table if exists public.tenants cascade;
drop table if exists public.archetypes cascade;

-- 1. ARCHETYPES TABLE
create table if not exists public.archetypes (
    id serial primary key,
    name text not null,
    code text unique not null, -- retail, service, b2b, food, hospitality
    icon text default 'store',
    description text,
    enabled_features jsonb default '["cart", "whatsapp_checkout", "stock"]'::jsonb,
    default_cta text default 'whatsapp_cart', -- whatsapp_cart, book_slot, request_quote, buy_now
    cta_label text default 'Order on WhatsApp',
    schema_type text default 'LocalBusiness',
    created_at timestamp with time zone default now()
);

-- 2. TENANTS TABLE (Stores / Dukaan)
create table if not exists public.tenants (
    id serial primary key,
    business_name text not null,
    slug text unique not null,
    custom_domain text unique,
    archetype_id integer references public.archetypes(id) on delete restrict not null,
    active_theme text default 'modern_clean', -- modern_clean, warm_artisan, bold_industrial, minimal_luxury
    phone text,
    whatsapp_number text,
    city text,
    address text,
    tagline text,
    about_text text,
    brand_color text default '#10B981',
    settings jsonb default '{
        "currency": "INR",
        "upi_id": "",
        "delivery_min_order": 0,
        "free_delivery_above": 500,
        "section_toggles": {
            "hero_trust": true,
            "highlights": true,
            "reviews": true,
            "timings": true,
            "inquiry": true
        }
    }'::jsonb,
    is_active boolean default true,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create index if not exists idx_tenants_slug on public.tenants(slug);

-- 3. CATALOG ITEMS TABLE
create table if not exists public.catalog_items (
    id serial primary key,
    tenant_id integer references public.tenants(id) on delete cascade not null,
    title text not null,
    description text,
    category_name text,
    price numeric(10,2) default 0.00,
    compare_at_price numeric(10,2),
    type text default 'product', -- product, service, quote_item, food_item
    duration_minutes integer, -- for service/clinic/salon
    min_order_qty integer default 1, -- for B2B MOQ
    in_stock boolean default true,
    stock_quantity integer default 50,
    image_url text,
    attributes jsonb default '{}'::jsonb,
    sort_order integer default 0,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create index if not exists idx_catalog_tenant on public.catalog_items(tenant_id);

-- 4. ORDERS TABLE (Unified Cart Purchases, Appointments, Quotes & Inquiries)
create table if not exists public.orders (
    id serial primary key,
    tenant_id integer references public.tenants(id) on delete cascade not null,
    order_number text unique not null,
    customer_name text not null,
    customer_phone text not null,
    customer_address text,
    type text default 'order', -- order, booking, inquiry, quote
    items_payload jsonb, -- nullable so simple inquiries do not crash
    subtotal numeric(10,2) default 0.00,
    discount_amount numeric(10,2) default 0.00,
    coupon_code text,
    total_amount numeric(10,2) default 0.00,
    status text default 'pending', -- pending, confirmed, completed, cancelled
    payment_method text default 'whatsapp', -- whatsapp, cod, online
    metadata jsonb default '{}'::jsonb, -- appointment slot, b2b company name, etc.
    notes text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create index if not exists idx_orders_tenant on public.orders(tenant_id);

-- 5. USERS TABLE (Authentication & Roles)
create table if not exists public.users (
    id serial primary key,
    name text not null,
    email text unique not null,
    password text not null,
    role text default 'merchant', -- super_admin, merchant, customer
    tenant_id integer references public.tenants(id) on delete set null,
    is_active boolean default true,
    created_at timestamp with time zone default now()
);

-- SEED DATA (Ported directly from Laravel DatabaseSeeder)

-- Seed Archetypes
insert into public.archetypes (id, name, code, icon, cta_label, default_cta, schema_type) values
(1, 'Retail Store & Kirana', 'retail', 'cart-shopping', 'Order on WhatsApp', 'whatsapp_cart', 'Store'),
(2, 'Healthcare Clinic & Doctors', 'service', 'stethoscope', 'Book Appointment Slot', 'book_slot', 'MedicalBusiness'),
(3, 'B2B Machinery & Manufacturing', 'b2b', 'industry', 'Request a Quote (RFQ)', 'request_quote', 'ManufacturingBusiness'),
(4, 'Food, Bakery & Cafes', 'food', 'utensils', 'Order Food Online', 'whatsapp_cart', 'Restaurant'),
(5, 'Hospitality & Hotels', 'hospitality', 'hotel', 'Book Room', 'book_slot', 'Hotel')
on conflict (id) do nothing;

-- Seed Demo Tenants
insert into public.tenants (id, business_name, slug, archetype_id, phone, whatsapp_number, city, address, tagline, about_text, brand_color, active_theme) values
(1, 'Sharma Kirana & General Store', 'sharma-kirana', 1, '9876543210', '9876543210', 'Kanpur', 'Shop #12, Market Road, Swaroop Nagar, Kanpur', 'Fresh Groceries & Daily Essentials at Wholesale Rates', 'Serving quality groceries, pulses, spices, and household essentials directly to your doorstep since 2012.', '#10B981', 'modern_clean'),
(2, 'Care Dental Clinic & Implant Centre', 'care-dental-clinic', 2, '9123456780', '9123456780', 'Lucknow', 'Plot 45, Gomti Nagar Phase 2, Lucknow', 'Advanced Laser Dentistry & Painless Smile Makeovers', 'Dr. R. K. Verma (MDS - Orthodontics) with 15+ years experience providing painless dental treatments with modern sterilization.', '#0284C7', 'modern_clean'),
(3, 'Apex Steel Craft & Industrial Hub', 'apex-steel-craft', 3, '9988776655', '9988776655', 'Faridabad', 'Sector 58, Industrial Area, Faridabad, Haryana', 'Precision Heavy Fasteners, Metal Enclosures & Warehousing Pallets', 'ISO 9001:2015 certified manufacturer with modern laser cutting, CNC bending, and rapid industrial delivery across NCR.', '#D97706', 'bold_industrial'),
(4, 'Bhupendra Store', 'bhupendra-2011', 1, '9876543210', '9876543210', 'Mumbai', 'Main Market, City Center, Mumbai', 'Premium Handcrafted Products & Daily Essentials', 'Welcome to Bhupendra Store. Fast home delivery and instant WhatsApp customer support.', '#2563eb', 'modern_clean')
on conflict (id) do nothing;

-- Seed Catalog Items for Sharma Kirana
insert into public.catalog_items (tenant_id, title, category_name, price, compare_at_price, type, in_stock, stock_quantity, image_url) values
(1, 'Fortune Sunlite Refined Sunflower Oil (1 Litre)', 'Cooking Oils', 145.00, 165.00, 'product', true, 50, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60'),
(1, 'Daawat Rozana Super Basmati Rice (5 Kg)', 'Grains & Rice', 380.00, 450.00, 'product', true, 25, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60'),
(1, 'Tata Sampann Unpolished Toor Dal (1 Kg)', 'Pulses & Dals', 175.00, 195.00, 'product', true, 40, 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&auto=format&fit=crop&q=60');

-- Seed Catalog Items for Care Dental Clinic
insert into public.catalog_items (tenant_id, title, category_name, price, compare_at_price, type, duration_minutes, in_stock, image_url) values
(2, 'Laser Teeth Whitening & Polishing (Single Session)', 'Cosmetic Dentistry', 2499.00, 3500.00, 'service', 45, true, 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&auto=format&fit=crop&q=60'),
(2, 'Painless Single-Sitting Root Canal Treatment (RCT)', 'Endodontics', 3200.00, 4500.00, 'service', 60, true, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=60'),
(2, 'Titanium Dental Implant (Nobel Biocare Lifetime Warranty)', 'Implantology', 18500.00, 24000.00, 'service', 60, true, 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop&q=60');

-- Seed Catalog Items for Apex Steel Craft
insert into public.catalog_items (tenant_id, title, category_name, price, compare_at_price, type, min_order_qty, in_stock, stock_quantity, image_url) values
(3, 'Industrial Heavy Duty Storage Pallet (MOQ: 20 Units)', 'Warehousing Pallets', 1850.00, 2200.00, 'quote_item', 20, true, 200, 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60'),
(3, 'Galvanized Sheet Metal Enclosure IP65 (Customized)', 'Sheet Metal Enclosures', 3450.00, 4200.00, 'quote_item', 10, true, 80, 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=500&auto=format&fit=crop&q=60'),
(3, 'High Tensile Structural Fasteners Grade 8.8 (Bag of 500)', 'Fasteners & Hardware', 2800.00, 3200.00, 'quote_item', 5, true, 150, 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60');

-- Seed Catalog Items for Bhupendra Store
insert into public.catalog_items (tenant_id, title, category_name, price, compare_at_price, type, in_stock, stock_quantity, image_url) values
(4, 'Handcrafted Ceramic Teapot with Bamboo Handle', 'Kitchen & Dining', 899.00, 1299.00, 'product', true, 45, 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&auto=format&fit=crop&q=60'),
(4, 'Matte Earth Stoneware Coffee Mug (Set of 2)', 'Kitchen & Dining', 599.00, 799.00, 'product', true, 80, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60'),
(4, 'Handmade Terracotta Planter Pot with Drainage Dish', 'Home Decor', 449.00, 649.00, 'product', true, 60, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&auto=format&fit=crop&q=60');

-- Seed Default Demo Users
insert into public.users (id, name, email, password, role, tenant_id) values
(1, 'Super Administrator', 'admin@anemony.in', 'admin123', 'super_admin', null),
(2, 'Sharma Kirana Merchant', 'sharma@anemony.in', 'password', 'merchant', 1),
(3, 'Care Dental Clinic Doctor', 'care@anemony.in', 'password', 'merchant', 2),
(4, 'Bhupendra Store Merchant', 'bhupendra@anemony.in', 'password', 'merchant', 4)
on conflict (id) do nothing;
