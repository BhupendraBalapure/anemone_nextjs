export type ArchetypeCode = 'retail' | 'service' | 'b2b' | 'food' | 'hospitality' | 'clinic' | 'salon';

export type UserRole = 'super_admin' | 'merchant' | 'customer';

export type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface ThemeTokens {
  primary: string;
  secondary?: string;
  font?: string;
  radius?: string;
  mode?: 'light' | 'dark';
}

export interface Archetype {
  id: number;
  name: string;
  code: ArchetypeCode;
  icon: string;
  description?: string | null;
  enabled_features: string[];
  default_cta: string;
  cta_label: string;
  schema_type: string;
}

export interface TenantSettings {
  currency?: string;
  upi_id?: string;
  delivery_min_order?: number;
  free_delivery_above?: number;
  doctor_name?: string;
  timings?: string;
  emergency_available?: boolean;
  section_toggles?: {
    hero_trust?: boolean;
    highlights?: boolean;
    reviews?: boolean;
    timings?: boolean;
    inquiry?: boolean;
  };
  announcement?: string;
  operating_hours?: string;
  city?: string;
  address?: string;
  min_order_value?: number;
}

export interface Tenant {
  id: number | string;
  business_name: string;
  slug: string;
  custom_domain?: string | null;
  archetype_id: number;
  archetype?: Archetype;
  active_theme: string; // modern_clean, warm_artisan, bold_industrial, minimal_luxury
  phone?: string | null;
  whatsapp_number?: string | null;
  city?: string | null;
  address?: string | null;
  tagline?: string | null;
  about_text?: string | null;
  brand_color: string;
  settings?: TenantSettings;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CatalogItem {
  id: number | string;
  tenant_id: number | string;
  title: string;
  description?: string | null;
  category_name?: string | null;
  price: number;
  compare_at_price?: number | null;
  type: 'product' | 'service' | 'quote_item' | 'food_item';
  duration_minutes?: number | null;
  min_order_qty?: number | null;
  in_stock: boolean;
  stock_quantity?: number | null;
  image_url?: string | null;
  attributes?: Record<string, any>;
  sort_order?: number;
  created_at?: string;
}

export interface CartItem {
  id: number | string;
  title: string;
  price: number;
  quantity: number;
  image_url?: string | null;
  type?: string;
}

export interface Order {
  id: number | string;
  tenant_id: number | string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address?: string | null;
  type: 'order' | 'booking' | 'inquiry' | 'quote';
  items_payload?: CartItem[] | null;
  subtotal: number;
  discount_amount: number;
  coupon_code?: string | null;
  total_amount: number;
  status: OrderStatus;
  payment_method: 'whatsapp' | 'cod' | 'online';
  metadata?: Record<string, any>;
  notes?: string | null;
  created_at?: string;
}

export interface User {
  id: number | string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  tenant_id?: number | string | null;
  is_active: boolean;
  created_at?: string;
}
