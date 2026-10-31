import { Tenant, CatalogItem, Order, Archetype, User, OrderStatus } from './supabase/types';
import { createClient } from './supabase/client';

export const ARCHETYPES: Record<string, Archetype> = {
  retail: {
    id: 1,
    name: 'Retail Store & Kirana',
    code: 'retail',
    icon: 'cart-shopping',
    description: 'Shopping cart, WhatsApp orders, fast local delivery',
    enabled_features: ['cart', 'whatsapp_checkout', 'stock'],
    default_cta: 'whatsapp_cart',
    cta_label: 'Order on WhatsApp',
    schema_type: 'Store',
  },
  service: {
    id: 2,
    name: 'Healthcare Clinic & Doctors',
    code: 'service',
    icon: 'stethoscope',
    description: 'Appointment slot scheduler, consulting fees, doctor profile',
    enabled_features: ['booking_slots', 'whatsapp_confirm'],
    default_cta: 'book_slot',
    cta_label: 'Book Appointment Slot',
    schema_type: 'MedicalBusiness',
  },
  b2b: {
    id: 3,
    name: 'B2B Machinery & Manufacturing',
    code: 'b2b',
    icon: 'industry',
    description: 'Minimum order quantities (MOQ), tech specs, Request For Quote',
    enabled_features: ['rfq_quotes', 'spec_sheets'],
    default_cta: 'request_quote',
    cta_label: 'Request a Quote (RFQ)',
    schema_type: 'ManufacturingBusiness',
  },
  food: {
    id: 4,
    name: 'Food, Bakery & Cafes',
    code: 'food',
    icon: 'utensils',
    description: 'Menu categories, veg/non-veg tags, quick takeaway checkout',
    enabled_features: ['cart', 'whatsapp_checkout'],
    default_cta: 'whatsapp_cart',
    cta_label: 'Order Food Online',
    schema_type: 'Restaurant',
  },
  hospitality: {
    id: 5,
    name: 'Hospitality & Hotels',
    code: 'hospitality',
    icon: 'hotel',
    description: 'AC Suites, room booking, guest check-in inquiry',
    enabled_features: ['booking_slots'],
    default_cta: 'book_slot',
    cta_label: 'Book Room',
    schema_type: 'Hotel',
  },
};

// Pre-seeded Stores matching Laravel DatabaseSeeder
const STORE_TENANTS: Record<string, Tenant> = {
  'sharma-kirana': {
    id: 1,
    business_name: 'Sharma Kirana & General Store',
    slug: 'sharma-kirana',
    archetype_id: 1,
    archetype: ARCHETYPES.retail,
    active_theme: 'modern_clean',
    phone: '9876543210',
    whatsapp_number: '9876543210',
    city: 'Kanpur',
    address: 'Shop #12, Market Road, Swaroop Nagar, Kanpur',
    tagline: 'Fresh Groceries & Daily Essentials at Wholesale Rates',
    about_text: 'Serving quality groceries, pulses, spices, and household essentials directly to your doorstep since 2012.',
    brand_color: '#10B981',
    settings: {
      currency: 'INR',
      upi_id: 'sharmakirana@upi',
      delivery_min_order: 200,
      free_delivery_above: 500,
      announcement: '✨ Free Home Delivery on grocery orders above ₹500 across Kanpur!',
      operating_hours: '7:30 AM - 10:00 PM (All 7 Days Open)',
      section_toggles: {
        hero_trust: true,
        highlights: true,
        reviews: true,
        timings: true,
        inquiry: true,
      },
    },
    is_active: true,
  },
  'care-dental-clinic': {
    id: 2,
    business_name: 'Care Dental Clinic & Implant Centre',
    slug: 'care-dental-clinic',
    archetype_id: 2,
    archetype: ARCHETYPES.service,
    active_theme: 'modern_clean',
    phone: '9123456780',
    whatsapp_number: '9123456780',
    city: 'Lucknow',
    address: 'Plot 45, Gomti Nagar Phase 2, Lucknow',
    tagline: 'Advanced Laser Dentistry & Painless Smile Makeovers',
    about_text: 'Dr. R. K. Verma (MDS - Orthodontics) with 15+ years experience providing painless dental treatments with modern sterilization.',
    brand_color: '#0284C7',
    settings: {
      currency: 'INR',
      doctor_name: 'Dr. R. K. Verma, MDS',
      timings: 'Mon-Sat: 10:00 AM - 08:00 PM',
      emergency_available: true,
      announcement: '🏥 Painless Laser Dental Consultation & Digital Smile Makeovers Available Today.',
      operating_hours: '10:00 AM - 08:00 PM (Emergency 24x7)',
      section_toggles: {
        hero_trust: true,
        highlights: true,
        reviews: true,
        timings: true,
        inquiry: true,
      },
    },
    is_active: true,
  },
  'apex-steel-craft': {
    id: 3,
    business_name: 'Apex Steel Craft & Industrial Hub',
    slug: 'apex-steel-craft',
    archetype_id: 3,
    archetype: ARCHETYPES.b2b,
    active_theme: 'bold_industrial',
    phone: '9988776655',
    whatsapp_number: '9988776655',
    city: 'Faridabad',
    address: 'Sector 58, Industrial Area, Faridabad, Haryana',
    tagline: 'Precision Heavy Fasteners, Metal Enclosures & Warehousing Pallets',
    about_text: 'ISO 9001:2015 certified manufacturer with modern laser cutting, CNC bending, and rapid industrial delivery across NCR.',
    brand_color: '#D97706',
    settings: {
      currency: 'INR',
      announcement: '🏭 Direct Factory Dispatch: Tiered volume pricing on wholesale fasteners & pallets.',
      operating_hours: '8:00 AM - 7:00 PM (Mon-Sat)',
      section_toggles: {
        hero_trust: true,
        highlights: true,
        reviews: true,
        timings: true,
        inquiry: true,
      },
    },
    is_active: true,
  },
  'bhupendra-2011': {
    id: 4,
    business_name: 'Bhupendra Store',
    slug: 'bhupendra-2011',
    archetype_id: 1,
    archetype: ARCHETYPES.retail,
    active_theme: 'modern_clean',
    phone: '9876543210',
    whatsapp_number: '9876543210',
    city: 'Mumbai',
    address: 'Main Market, City Center, Mumbai',
    tagline: 'Premium Handcrafted Products & Daily Essentials',
    about_text: 'Welcome to Bhupendra Store. Fast home delivery and instant WhatsApp customer support.',
    brand_color: '#2563eb',
    settings: {
      currency: 'INR',
      announcement: '🎉 Welcome to Bhupendra Store! Free Home Delivery on WhatsApp Orders.',
      operating_hours: '9:00 AM - 10:00 PM',
      delivery_min_order: 150,
      free_delivery_above: 499,
      section_toggles: {
        hero_trust: true,
        highlights: true,
        reviews: true,
        timings: true,
        inquiry: true,
      },
    },
    is_active: true,
  },
};

const STORE_ITEMS: Record<string, CatalogItem[]> = {
  1: [
    {
      id: 101,
      tenant_id: 1,
      title: 'Fortune Sunlite Refined Sunflower Oil (1 Litre)',
      category_name: 'Cooking Oils',
      price: 145.0,
      compare_at_price: 165.0,
      type: 'product',
      in_stock: true,
      stock_quantity: 50,
      image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 102,
      tenant_id: 1,
      title: 'Daawat Rozana Super Basmati Rice (5 Kg)',
      category_name: 'Grains & Rice',
      price: 380.0,
      compare_at_price: 450.0,
      type: 'product',
      in_stock: true,
      stock_quantity: 25,
      image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 103,
      tenant_id: 1,
      title: 'Tata Sampann Unpolished Toor Dal (1 Kg)',
      category_name: 'Pulses & Dals',
      price: 175.0,
      compare_at_price: 195.0,
      type: 'product',
      in_stock: true,
      stock_quantity: 40,
      image_url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&auto=format&fit=crop&q=60',
    },
  ],
  2: [
    {
      id: 201,
      tenant_id: 2,
      title: 'Laser Teeth Whitening & Polishing (Single Session)',
      category_name: 'Cosmetic Dentistry',
      price: 2499.0,
      compare_at_price: 3500.0,
      type: 'service',
      duration_minutes: 45,
      in_stock: true,
      image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 202,
      tenant_id: 2,
      title: 'Painless Single-Sitting Root Canal Treatment (RCT)',
      category_name: 'Endodontics',
      price: 3200.0,
      compare_at_price: 4500.0,
      type: 'service',
      duration_minutes: 60,
      in_stock: true,
      image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 203,
      tenant_id: 2,
      title: 'Titanium Dental Implant (Nobel Biocare Lifetime Warranty)',
      category_name: 'Implantology',
      price: 18500.0,
      compare_at_price: 24000.0,
      type: 'service',
      duration_minutes: 60,
      in_stock: true,
      image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop&q=60',
    },
  ],
  3: [
    {
      id: 301,
      tenant_id: 3,
      title: 'Industrial Heavy Duty Storage Pallet (MOQ: 20 Units)',
      category_name: 'Warehousing Pallets',
      price: 1850.0,
      compare_at_price: 2200.0,
      type: 'quote_item',
      min_order_qty: 20,
      in_stock: true,
      stock_quantity: 200,
      image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 302,
      tenant_id: 3,
      title: 'Galvanized Sheet Metal Enclosure IP65 (Customized)',
      category_name: 'Sheet Metal Enclosures',
      price: 3450.0,
      compare_at_price: 4200.0,
      type: 'quote_item',
      min_order_qty: 10,
      in_stock: true,
      stock_quantity: 80,
      image_url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 303,
      tenant_id: 3,
      title: 'High Tensile Structural Fasteners Grade 8.8 (Bag of 500)',
      category_name: 'Fasteners & Hardware',
      price: 2800.0,
      compare_at_price: 3200.0,
      type: 'quote_item',
      min_order_qty: 5,
      in_stock: true,
      stock_quantity: 150,
      image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60',
    },
  ],
  4: [
    {
      id: 401,
      tenant_id: 4,
      title: 'Handcrafted Ceramic Teapot with Bamboo Handle',
      description: 'Artisanal high-fired ceramic teapot with heat-resistant bamboo handle. Perfect for loose-leaf brewing and herbal infusions.',
      category_name: 'Kitchen & Dining',
      price: 899.0,
      compare_at_price: 1299.0,
      type: 'product',
      in_stock: true,
      stock_quantity: 45,
      image_url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 402,
      tenant_id: 4,
      title: 'Matte Earth Stoneware Coffee Mug (Set of 2)',
      description: 'Hand-thrown stoneware coffee mugs with textured matte glaze. Ergonomic grip and dishwasher safe.',
      category_name: 'Kitchen & Dining',
      price: 599.0,
      compare_at_price: 799.0,
      type: 'product',
      in_stock: true,
      stock_quantity: 80,
      image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 403,
      tenant_id: 4,
      title: 'Handmade Terracotta Planter Pot with Drainage Dish',
      description: 'Porous natural clay planter handcrafted by regional potters. Promotes healthy root aeriation and moisture balance.',
      category_name: 'Home Decor',
      price: 449.0,
      compare_at_price: 649.0,
      type: 'product',
      in_stock: true,
      stock_quantity: 60,
      image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 404,
      tenant_id: 4,
      title: 'Pure Soy Wax Scented Candle - French Vanilla & Sandalwood',
      description: 'Non-toxic 100% natural soy wax candle hand-poured into an amber glass jar. 45+ hours burn time with cotton wick.',
      category_name: 'Home Decor',
      price: 399.0,
      compare_at_price: 599.0,
      type: 'product',
      in_stock: true,
      stock_quantity: 50,
      image_url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 405,
      tenant_id: 4,
      title: 'Organic Kashmiri Saffron Infused Green Tea (100g Jar)',
      description: 'Single-estate whole leaf Himalayan green tea blended with certified Grade-A Mogra Kashmiri saffron strands.',
      category_name: 'Gourmet Pantry',
      price: 649.0,
      compare_at_price: 899.0,
      type: 'product',
      in_stock: true,
      stock_quantity: 35,
      image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 406,
      tenant_id: 4,
      title: 'Handwoven Natural Jute Table Runner & Placemats (6 Pc)',
      description: 'Eco-friendly biodegradable braided golden jute table runner with 6 matching round dinner placemats.',
      category_name: 'Home Decor',
      price: 749.0,
      compare_at_price: 1099.0,
      type: 'product',
      in_stock: true,
      stock_quantity: 40,
      image_url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 407,
      tenant_id: 4,
      title: 'Artisanal Wild Raw Forest Honey (500g Glass Jar)',
      description: 'Unprocessed, unpasteurized natural honey collected ethically from forest flora. Rich in antioxidants and enzymes.',
      category_name: 'Gourmet Pantry',
      price: 499.0,
      compare_at_price: 699.0,
      type: 'product',
      in_stock: true,
      stock_quantity: 65,
      image_url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 408,
      tenant_id: 4,
      title: 'Minimalist Ultrasonic Aromatherapy Diffuser & Lamp',
      description: 'Whisper-quiet ultrasonic cool mist essential oil diffuser with ambient warm LED nightlight and automatic shut-off.',
      category_name: 'Home Decor',
      price: 1299.0,
      compare_at_price: 1899.0,
      type: 'product',
      in_stock: true,
      stock_quantity: 25,
      image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80',
    },
  ],
};

const STORE_ORDERS: Record<string, Order[]> = {
  1: [
    {
      id: 1,
      tenant_id: 1,
      order_number: 'ORD-9021',
      customer_name: 'Rohan Awasthi',
      customer_phone: '9876543210',
      customer_address: 'Flat 12B, Civil Lines, Kanpur',
      type: 'order',
      items_payload: [
        { id: 101, title: 'Fortune Sunlite Refined Sunflower Oil (1 Litre)', price: 145, quantity: 2 },
        { id: 102, title: 'Daawat Rozana Super Basmati Rice (5 Kg)', price: 380, quantity: 1 },
      ],
      subtotal: 670,
      discount_amount: 50,
      coupon_code: 'FESTIVE20',
      total_amount: 620,
      status: 'pending',
      payment_method: 'whatsapp',
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ],
  2: [
    {
      id: 2,
      tenant_id: 2,
      order_number: 'BKG-4412',
      customer_name: 'Sneha Srivastava',
      customer_phone: '9876501234',
      type: 'booking',
      items_payload: null,
      subtotal: 2499,
      discount_amount: 0,
      total_amount: 2499,
      status: 'confirmed',
      payment_method: 'whatsapp',
      metadata: { service: 'Laser Teeth Whitening', date: 'Tomorrow', slot: '11:00 AM' },
      created_at: new Date(Date.now() - 7200000).toISOString(),
    },
  ],
  4: [
    {
      id: 3,
      tenant_id: 4,
      order_number: 'ORD-2011',
      customer_name: 'Bhupendra Balapure',
      customer_phone: '9876543210',
      customer_address: 'Main Market, City Center',
      type: 'order',
      items_payload: [
        { id: 401, title: 'Handcrafted Ceramic Teapot with Bamboo Handle', price: 899, quantity: 1 },
      ],
      subtotal: 899,
      discount_amount: 100,
      coupon_code: 'WELCOME10',
      total_amount: 799,
      status: 'pending',
      payment_method: 'whatsapp',
      created_at: new Date().toISOString(),
    },
  ],
};

export const DEMO_USERS: User[] = [
  {
    id: 1,
    name: 'Super Administrator',
    email: 'admin@anemony.in',
    password: 'admin123',
    role: 'super_admin',
    tenant_id: null,
    is_active: true,
  },
  {
    id: 2,
    name: 'Sharma Kirana Merchant',
    email: 'sharma@anemony.in',
    password: 'password',
    role: 'merchant',
    tenant_id: 1,
    is_active: true,
  },
  {
    id: 3,
    name: 'Care Dental Clinic Doctor',
    email: 'care@anemony.in',
    password: 'password',
    role: 'merchant',
    tenant_id: 2,
    is_active: true,
  },
  {
    id: 4,
    name: 'Bhupendra Store Merchant',
    email: 'bhupendra@anemony.in',
    password: 'password',
    role: 'merchant',
    tenant_id: 4,
    is_active: true,
  },
];

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes('placeholder.supabase.co'));
}

export async function getAllTenants(): Promise<Tenant[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('tenants').select('*');
      if (!error && data && data.length > 0) return data as Tenant[];
    } catch (e) {
      // fallback
    }
  }

  return Object.values(STORE_TENANTS);
}

export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  const norm = slug.toLowerCase().trim();

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('slug', norm)
        .maybeSingle();

      if (!error && data) {
        const tenant = data as Tenant;
        tenant.archetype = Object.values(ARCHETYPES).find((a) => a.id === tenant.archetype_id) || ARCHETYPES.retail;
        return tenant;
      }
    } catch (e) {
      // fallback
    }
  }

  if (STORE_TENANTS[norm]) {
    const t = STORE_TENANTS[norm];
    t.archetype = Object.values(ARCHETYPES).find((a) => a.id === t.archetype_id) || ARCHETYPES.retail;
    return t;
  }

  // Auto-Hydrate dynamically so any custom slug NEVER 404s
  const formattedName = norm
    .replace(/-[0-9]+$/, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ') + ' Store';

  const autoId = Date.now();
  const autoTenant: Tenant = {
    id: autoId,
    business_name: formattedName,
    slug: norm,
    archetype_id: 1,
    archetype: ARCHETYPES.retail,
    active_theme: 'modern_clean',
    phone: '9876543210',
    whatsapp_number: '9876543210',
    city: 'India',
    address: 'Main Market, City Center',
    tagline: `Welcome to ${formattedName}`,
    about_text: 'Quality products, instant home delivery and direct WhatsApp ordering.',
    brand_color: '#2563eb',
    settings: {
      currency: 'INR',
      announcement: `🎉 Welcome to ${formattedName}! WhatsApp Orders & Home Delivery Available.`,
      operating_hours: '9:00 AM - 10:00 PM',
      delivery_min_order: 100,
      free_delivery_above: 499,
      section_toggles: {
        hero_trust: true,
        highlights: true,
        reviews: true,
        timings: true,
        inquiry: true,
      },
    },
    is_active: true,
  };

  STORE_TENANTS[norm] = autoTenant;
  STORE_ITEMS[autoId] = STORE_ITEMS[4].map((item, idx) => ({
    ...item,
    id: autoId + idx + 1,
    tenant_id: autoId,
  }));
  STORE_ORDERS[autoId] = [];

  return autoTenant;
}

export async function getCatalogItemsByTenant(tenantId: number | string): Promise<CatalogItem[]> {
  const fallback = STORE_ITEMS[tenantId] || STORE_ITEMS[1] || [];

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('catalog_items')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('id', { ascending: true });
      if (!error && data && data.length > 0) {
        // If Supabase has only few initial items, combine with our rich catalog so the store looks full and premium
        if (data.length < 5 && fallback.length > data.length) {
          const existingTitles = new Set(data.map((i: any) => i.title.toLowerCase().trim()));
          const extra = fallback.filter((f) => !existingTitles.has(f.title.toLowerCase().trim()));
          return [...(data as CatalogItem[]), ...extra];
        }
        return data as CatalogItem[];
      }
    } catch (e) {
      // fallback
    }
  }

  return fallback;
}

export async function getOrdersByTenant(tenantId: number | string): Promise<Order[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('tenant_id', tenantId)
        .order('id', { ascending: false });
      if (!error && data && data.length > 0) return data as Order[];
    } catch (e) {
      // fallback
    }
  }

  return STORE_ORDERS[tenantId] || [];
}

export async function getAllGlobalOrders(): Promise<Order[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('orders').select('*').order('id', { ascending: false });
      if (!error && data && data.length > 0) return data as Order[];
    } catch (e) {
      // fallback
    }
  }

  return Object.values(STORE_ORDERS).flat();
}

export async function updateTenantSettings(
  slug: string,
  updates: Partial<Tenant>
): Promise<Tenant | null> {
  const tenant = await getTenantBySlug(slug);
  if (!tenant) return null;

  Object.assign(tenant, updates);
  STORE_TENANTS[slug] = tenant;

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('tenants').update(updates).eq('slug', slug);
    } catch (e) {
      // fallback
    }
  }

  return tenant;
}

export interface CreateStoreInput {
  businessName: string;
  slug?: string;
  category?: string;
  websiteType?: string;
  whatsappNumber?: string;
  city?: string;
  primaryColor?: string;
}

export async function createStore(input: CreateStoreInput): Promise<{ tenant: Tenant }> {
  const norm = (
    input.slug ||
    input.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(1000 + Math.random() * 9000)
  )
    .toLowerCase()
    .trim();

  const isClinic = (input.category || '').includes('Clinic') || (input.category || '').includes('Doctor');
  const isB2b = (input.category || '').includes('Manufacturers');
  const archId = isClinic ? 2 : isB2b ? 3 : 1;
  const archObj = Object.values(ARCHETYPES).find((a) => a.id === archId) || ARCHETYPES.retail;

  const newId = Date.now();
  const newTenant: Tenant = {
    id: newId,
    business_name: input.businessName,
    slug: norm,
    archetype_id: archId,
    archetype: archObj,
    active_theme: isB2b ? 'bold_industrial' : 'modern_clean',
    phone: input.whatsappNumber || '9876543210',
    whatsapp_number: input.whatsappNumber || '9876543210',
    city: input.city || 'India',
    address: 'Main Market, City Center',
    tagline: `Welcome to ${input.businessName}`,
    about_text: 'Serving quality products and services directly to your doorstep.',
    brand_color: input.primaryColor || (isClinic ? '#0284C7' : isB2b ? '#D97706' : '#10B981'),
    settings: {
      currency: 'INR',
      announcement: `🎉 Welcome to ${input.businessName}! WhatsApp Orders & Home Delivery Available.`,
      operating_hours: '9:00 AM - 10:00 PM',
      delivery_min_order: 150,
      free_delivery_above: 499,
      section_toggles: {
        hero_trust: true,
        highlights: true,
        reviews: true,
        timings: true,
        inquiry: true,
      },
    },
    is_active: true,
  };

  STORE_TENANTS[norm] = newTenant;
  STORE_ITEMS[newId] = STORE_ITEMS[archId].map((it, idx) => ({
    ...it,
    id: newId + idx + 1,
    tenant_id: newId,
  }));
  STORE_ORDERS[newId] = [];

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('tenants').insert([newTenant]);
    } catch (e) {
      // fallback
    }
  }

  return { tenant: newTenant };
}

export async function createOrder(orderData: Omit<Order, 'id' | 'order_number' | 'created_at'>): Promise<Order> {
  const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  const orderId = Date.now();

  const newOrder: Order = {
    ...orderData,
    id: orderId,
    order_number: orderNumber,
    created_at: new Date().toISOString(),
  };

  const tid = String(orderData.tenant_id);
  if (!STORE_ORDERS[tid]) {
    STORE_ORDERS[tid] = [];
  }
  STORE_ORDERS[tid].unshift(newOrder);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('orders').insert([newOrder]);
    } catch (e) {
      // fallback
    }
  }

  return newOrder;
}
