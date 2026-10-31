import { ArchetypeCode, ThemeTokens } from './supabase/types';
import templatesData from './templates-data.json';

export { type ArchetypeCode, type ThemeTokens };

export interface StudioTemplate {
  id: string;
  type: 'business_website' | 'ecommerce' | 'landing_page';
  category: string;
  icon?: string;
  title: string;
  badge: string;
  subheadline?: string;
  description: string;
  suggested_color: string;
  features: string[];
  image_url: string;
  archetype: string;
}

export const CATEGORIES = [
  'Other Retail',
  'Beauty & Salons',
  'Clinics & Hospitals',
  'Coaching & Institutes',
  'Doctors & Specialists',
  'Herbal Care',
  'Hotels & Motels',
  'Manufacturers',
  'Other Services',
  'Real Estate & Properties',
  'Restaurant & Cafes',
] as const;

export type BusinessCategory = (typeof CATEGORIES)[number];

const TYPED_TEMPLATES_DATA = templatesData as Record<string, StudioTemplate[]>;

export function getStudioTemplates(
  category: string = 'Other Retail',
  filterMode: string = 'category'
): StudioTemplate[] {
  const catTemplates = TYPED_TEMPLATES_DATA[category] || TYPED_TEMPLATES_DATA['Other Retail'] || [];

  if (filterMode === 'business_website') {
    return catTemplates.filter((t) => t.type === 'business_website');
  }
  if (filterMode === 'ecommerce') {
    return catTemplates.filter((t) => t.type === 'ecommerce');
  }
  if (filterMode === 'landing_page') {
    return catTemplates.filter((t) => t.type === 'landing_page');
  }

  // 'category' or 'all': return all authentic templates for this category
  return catTemplates;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  archetype: ArchetypeCode;
  supportedCategories: string[];
  palette: {
    primary: string;
    secondary: string;
    accent: string;
  };
  font: string;
  radius: string;
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'retail_web_luxury_jewelry_showroom',
    name: 'Luxury Jewelry & Bridal Flagship',
    description: 'Prestigious BIS 916 hallmarked bridal gold, solitaires, and VIP suite',
    archetype: 'retail',
    supportedCategories: ['Other Retail'],
    palette: { primary: '#D97706', secondary: '#92400E', accent: '#F59E0B' },
    font: 'Playfair Display',
    radius: '1rem',
  },
  {
    id: 'retail_ecom_modern_fashion_apparel',
    name: 'Modern Streetwear & Fashion Mart',
    description: 'Everyday minimalist apparel with slide cart, MRP discounts, and WhatsApp delivery',
    archetype: 'retail',
    supportedCategories: ['Other Retail'],
    palette: { primary: '#2563EB', secondary: '#1E40AF', accent: '#3B82F6' },
    font: 'Inter',
    radius: '0.75rem',
  },
];
