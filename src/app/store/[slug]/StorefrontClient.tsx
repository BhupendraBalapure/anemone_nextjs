'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { Tenant, CatalogItem, CartItem, ArchetypeCode } from '@/lib/supabase/types';
import { generateWhatsAppOrderUrl } from '@/lib/whatsapp';
import { createOrder } from '@/lib/store-service';
import {
  ShoppingBag,
  Search,
  Plus,
  Minus,
  Trash2,
  X,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  Tag,
  ShieldCheck,
  Send,
  Calendar,
  Settings,
  Building2,
  Stethoscope,
  Palette,
  MessageSquare,
  Award,
  Sparkles,
  ArrowRight,
  Check,
  Truck,
  HeartHandshake,
  Star,
  ExternalLink,
  ChevronRight,
  Eye,
  Percent,
  BadgeCheck,
  Zap,
  Globe,
  Layers,
  Store,
} from 'lucide-react';

export interface RetailThemeConfig {
  id: string;
  badge: string;
  title: string;
  desc: string;
  hero_img: string;
  side_img1: string;
  side_img2: string;
  pills: string[];
  tag: string;
  color: string;
  buttonLabel: string;
}

export const RETAIL_WEBSITE_THEMES: Record<string, RetailThemeConfig> = {
  retail_web_luxury_jewelry_showroom: {
    id: 'retail_web_luxury_jewelry_showroom',
    badge: '💎 Heritage Gold, Solitaire Diamond & Bridal Jewelry Showroom',
    title: 'Heritage Gold, Solitaire Diamond & Bridal Jewelry Showroom',
    desc: 'Prestigious heirloom jewelry house featuring BIS 916 hallmarked bridal gold, certified diamond solitaires, private bridal VIP lounge, and custom bespoke Karigari design studio in Mumbai.',
    hero_img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80',
    side_img1: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=80',
    side_img2: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&auto=format&fit=crop&q=80',
    pills: ['BIS 916 Hallmark Certified', 'IGI Certified Solitaires', 'Private Bridal Lounge', 'Custom Karigari Design'],
    tag: '★ 5.0 LUXURY JEWELRY',
    color: '#D97706',
    buttonLabel: '💎 Heritage Gold',
  },
  retail_web_designer_apparel_boutique: {
    id: 'retail_web_designer_apparel_boutique',
    badge: '👗 Couture Bridal Lehengas & Designer Ethnic Fashion Studio',
    title: 'Couture Bridal Lehengas & Designer Ethnic Fashion Studio',
    desc: 'Curated couture boutique showcasing handcrafted zardozi bridal lehengas, royal wedding sherwanis, bespoke fitting trials, and personal stylist consultations in Mumbai.',
    hero_img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
    side_img1: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&auto=format&fit=crop&q=80',
    side_img2: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&auto=format&fit=crop&q=80',
    pills: ['Handcrafted Zardozi Art', 'Bespoke Fitting Trials', 'Celebrity Bridal Stylists', 'Doorstep Trial Service'],
    tag: '★ 5.0 COUTURE STUDIO',
    color: '#E11D48',
    buttonLabel: '👗 Couture Bridal',
  },
  retail_web_smart_electronics_megastore: {
    id: 'retail_web_smart_electronics_megastore',
    badge: '📱 Next-Gen Smart Home Electronics & Mobile Gadget Megastore',
    title: 'Next-Gen Smart Home Electronics & Mobile Gadget Megastore',
    desc: 'Multi-brand electronics flagship showroom with live interactive demo zones, official brand warranty, instant exchange bonuses, and 0% interest paperless EMI in Mumbai.',
    hero_img: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=80',
    side_img1: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80',
    side_img2: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=80',
    pills: ['Live Hands-on Demo Zone', 'Instant Exchange Bonus', 'Brand Authorised Warranty', 'Paperless 0% Easy EMI'],
    tag: '★ 4.9 TECH MEGASTORE',
    color: '#2563EB',
    buttonLabel: '📱 Smart Electronics',
  },
  retail_web_luxury_home_furniture_gallery: {
    id: 'retail_web_luxury_home_furniture_gallery',
    badge: '🛋️ Contemporary Teak Wood & Italian Leather Furniture Studio',
    title: 'Contemporary Teak Wood & Italian Leather Furniture Studio',
    desc: 'Architectural furniture experience center displaying handcrafted solid wood dining sets, imported motorized recliners, custom modular wardrobes, and free 3D room styling in Mumbai.',
    hero_img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80',
    side_img1: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80',
    side_img2: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&auto=format&fit=crop&q=80',
    pills: ['100% Solid Teak & Sheesham', 'Free 3D Living Room Layout', 'Motorized Recliner Lounges', '10-Year Termite Warranty'],
    tag: '★ 5.0 LUXURY LIVING',
    color: '#92400E',
    buttonLabel: '🛋️ Teak Furniture',
  },
  retail_web_premium_optical_eyewear_lounge: {
    id: 'retail_web_premium_optical_eyewear_lounge',
    badge: '👓 German Precision Eye Testing & Designer Eyewear Boutique',
    title: 'German Precision Eye Testing & Designer Eyewear Boutique',
    desc: 'Modern vision boutique equipped with German Zeiss digital refractive eye testing, international designer sunglass frames, progressive lenses, and 30-minute quick lens crafting in Mumbai.',
    hero_img: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&auto=format&fit=crop&q=80',
    side_img1: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=80',
    side_img2: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&auto=format&fit=crop&q=80',
    pills: ['Zeiss 3D Digital Eye Exam', 'Designer Eyewear Brands', 'Progressive Precision Lenses', '30-Minute Spectacle Delivery'],
    tag: '★ 4.9 EYECARE LOUNGE',
    color: '#0284C7',
    buttonLabel: '👓 German Eyewear',
  },
  retail_web_artisan_organic_supermarket: {
    id: 'retail_web_artisan_organic_supermarket',
    badge: '🛒 Farm-Direct Organic Gourmet Grocery & Fresh Supermarket',
    title: 'Farm-Direct Organic Gourmet Grocery & Fresh Supermarket',
    desc: 'Wholesome farm-fresh supermarket offering residue-free organic fruits, pesticide-free hydroponic vegetables, cold-pressed artisanal groceries, and express neighborhood delivery in Mumbai.',
    hero_img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    side_img1: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80',
    side_img2: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&auto=format&fit=crop&q=80',
    pills: ['Residue-Free Organics', 'Hydroponic Salad Greens', 'Bulk Dispenser Pantry', 'Express 2-Hour Delivery'],
    tag: '★ 5.0 FRESH GROCERY',
    color: '#10B981',
    buttonLabel: '🛒 Fresh Supermarket',
  },
};

// Aliases for themes
RETAIL_WEBSITE_THEMES['retail_web_electronics_flagship'] = RETAIL_WEBSITE_THEMES['retail_web_smart_electronics_megastore'];
RETAIL_WEBSITE_THEMES['retail_web_furniture_living_studio'] = RETAIL_WEBSITE_THEMES['retail_web_luxury_home_furniture_gallery'];
RETAIL_WEBSITE_THEMES['retail_web_optical_eyewear_boutique'] = RETAIL_WEBSITE_THEMES['retail_web_premium_optical_eyewear_lounge'];
RETAIL_WEBSITE_THEMES['retail_web_organic_gourmet_supermarket'] = RETAIL_WEBSITE_THEMES['retail_web_artisan_organic_supermarket'];

interface StorefrontClientProps {
  tenant: Tenant;
  initialItems: CatalogItem[];
  initialTheme?: string;
  isDemoMode?: boolean;
}

export default function StorefrontClient({
  tenant,
  initialItems,
  initialTheme,
  isDemoMode = false,
}: StorefrontClientProps) {
  // Resolve active template config
  const defaultThemeKey =
    initialTheme ||
    (tenant.active_theme && RETAIL_WEBSITE_THEMES[tenant.active_theme]
      ? tenant.active_theme
      : 'retail_web_luxury_jewelry_showroom');

  const [currentTheme, setCurrentTheme] = useState<string>(defaultThemeKey);
  const activeConfig =
    RETAIL_WEBSITE_THEMES[currentTheme] || RETAIL_WEBSITE_THEMES['retail_web_luxury_jewelry_showroom'];

  const [activeBrandColor, setActiveBrandColor] = useState<string>(
    activeConfig.color || tenant.brand_color || '#D97706'
  );

  const [items] = useState<CatalogItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart state
  const [cart, setCart] = useState<Record<string | number, CartItem>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Quick View Modal
  const [quickViewItem, setQuickViewItem] = useState<CatalogItem | null>(null);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>({
    code: 'WELCOME10',
    percent: 10,
  });
  const [couponError, setCouponError] = useState('');

  // Checkout inputs
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  // Quick Inquiry Form
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Switch theme handler
  const handleSwitchTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    const cfg = RETAIL_WEBSITE_THEMES[themeId];
    if (cfg) {
      setActiveBrandColor(cfg.color);
    }
  };

  // Categories list
  const categories: string[] = [
    'all',
    ...Array.from(new Set(items.map((i) => i.category_name).filter((c): c is string => Boolean(c)))),
  ];

  // Filtered items
  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category_name === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart actions
  const addToCart = (item: CatalogItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev[item.id];
      const newQty = (existing ? existing.quantity : 0) + 1;
      return {
        ...prev,
        [item.id]: {
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: newQty,
          image_url: item.image_url,
          type: item.type,
        },
      };
    });
  };

  const updateQuantity = (itemId: string | number, delta: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev[itemId];
      if (!existing) return prev;
      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return {
        ...prev,
        [itemId]: { ...existing, quantity: newQty },
      };
    });
  };

  const cartList = Object.values(cart);
  const totalCartCount = cartList.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = cartList.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  // Free shipping threshold
  const freeShippingThreshold = tenant.settings?.free_delivery_above ?? 499;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const shippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Coupon evaluation
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.percent) / 100 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (codeToApply?: string) => {
    setCouponError('');
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (code === 'FESTIVE20') {
      setAppliedCoupon({ code, percent: 20 });
      setCouponCode('FESTIVE20');
    } else if (code === 'WELCOME10') {
      setAppliedCoupon({ code, percent: 10 });
      setCouponCode('WELCOME10');
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10 or FESTIVE20');
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D97706', '#E11D48', '#2563EB', '#10B981', '#0284C7'],
      });
    } catch (e) {
      // fallback
    }
  };

  // Direct Web Checkout
  const handleDirectWebCheckout = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please enter your name and phone number');
      return;
    }
    setCheckoutLoading(true);

    try {
      const order = await createOrder({
        tenant_id: tenant.id,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_address: customerAddress || 'Doorstep Delivery',
        type: 'order',
        items_payload: cartList,
        subtotal,
        discount_amount: discountAmount,
        coupon_code: appliedCoupon?.code || null,
        total_amount: finalTotal,
        status: 'pending',
        payment_method: 'cod',
      });

      setConfirmedOrderId(order.order_number);
      setCart({});
      setIsCartOpen(false);
      triggerConfetti();
    } catch (e) {
      console.error(e);
      alert('Failed to place order. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  // WhatsApp Checkout
  const handleWhatsAppCheckout = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Please enter your name and phone number for WhatsApp confirmation');
      return;
    }
    setCheckoutLoading(true);

    try {
      const order = await createOrder({
        tenant_id: tenant.id,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_address: customerAddress || 'Doorstep Delivery',
        type: 'order',
        items_payload: cartList,
        subtotal,
        discount_amount: discountAmount,
        coupon_code: appliedCoupon?.code || null,
        total_amount: finalTotal,
        status: 'pending',
        payment_method: 'whatsapp',
      });

      const waUrl = generateWhatsAppOrderUrl({
        orderNumber: order.order_number,
        storeName: tenant.business_name,
        whatsappNumber: tenant.whatsapp_number || tenant.phone || '9876543210',
        currency: tenant.settings?.currency || 'INR',
        customerName,
        customerPhone,
        customerAddress: customerAddress || 'Doorstep Delivery',
        items: cartList,
        subtotal,
        discountAmount,
        couponCode: appliedCoupon?.code,
        totalAmount: finalTotal,
      });

      setConfirmedOrderId(order.order_number);
      setCart({});
      setIsCartOpen(false);
      triggerConfetti();
      window.open(waUrl, '_blank');
    } catch (e) {
      console.error(e);
      alert('Failed to formulate WhatsApp order');
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Instant Single Item Buy on WhatsApp
  const handleInstantBuyOnWhatsApp = (item: CatalogItem) => {
    const waNumber = (tenant.whatsapp_number || tenant.phone || '9876543210').replace(/[^0-9]/g, '');
    const msg = `👋 *HELLO ${tenant.business_name.toUpperCase()}*\n\nI want to order this item immediately:\n\n📦 *${item.title}*\n💵 Price: ₹${item.price}\n🔗 Store: http://localhost:3000/store/${tenant.slug}\n\nPlease share delivery details!`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Quick Inquiry Submit
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    await createOrder({
      tenant_id: tenant.id,
      customer_name: inquiryName,
      customer_phone: inquiryPhone,
      type: 'inquiry',
      items_payload: null,
      subtotal: 0,
      discount_amount: 0,
      total_amount: 0,
      status: 'pending',
      payment_method: 'whatsapp',
      notes: inquiryMessage,
    });

    const msg = `💬 *CUSTOMER INQUIRY*\nStore: ${tenant.business_name}\nName: ${inquiryName}\nPhone: ${inquiryPhone}\nMessage: ${inquiryMessage || 'Inquiring about catalog'}`;
    const cleanPhone = (tenant.whatsapp_number || tenant.phone || '9876543210').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');

    setInquirySubmitted(true);
    setInquiryName('');
    setInquiryPhone('');
    setInquiryMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-slate-50/60 text-slate-900">
      {/* ======================================================== */}
      {/* 1. TOP DEMO & THEME SWITCHER BAR (SHOWN WITH ?demo=1)   */}
      {/* ======================================================== */}
      {isDemoMode && (
        <div className="bg-slate-950 text-white text-xs py-2 px-4 shadow-md sticky top-0 z-50 flex flex-wrap items-center justify-between gap-2 border-b border-purple-950">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider flex items-center gap-1">
              <Layers className="w-3 h-3" />
              <span>RETAIL STORE & KIRANA</span>
            </span>
            <span className="bg-purple-900/60 border border-purple-700/60 text-purple-200 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>Mode: Business Website</span>
            </span>
            <span className="font-medium text-slate-300 hidden md:inline">Website Live Preview</span>
          </div>

          {/* 6 Theme Buttons Matching The Screenshot */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            <span className="text-slate-400 text-[11px] hidden sm:inline shrink-0">Theme:</span>
            {[
              { id: 'retail_web_luxury_jewelry_showroom', label: '💎 Jewelry Showroom', color: '#D97706' },
              { id: 'retail_web_designer_apparel_boutique', label: '👗 Couture Boutique', color: '#E11D48' },
              { id: 'retail_web_smart_electronics_megastore', label: '📱 Electronics Megastore', color: '#2563EB' },
              { id: 'retail_web_luxury_home_furniture_gallery', label: '🛋️ Living Furniture', color: '#92400E' },
              { id: 'retail_web_premium_optical_eyewear_lounge', label: '👓 Eyewear Lounge', color: '#0284C7' },
              { id: 'retail_web_artisan_organic_supermarket', label: '🛒 Fresh Supermarket', color: '#10B981' },
            ].map((th) => {
              const isSelected =
                currentTheme === th.id ||
                (th.id === 'retail_web_smart_electronics_megastore' && currentTheme === 'retail_web_electronics_flagship') ||
                (th.id === 'retail_web_luxury_home_furniture_gallery' && currentTheme === 'retail_web_furniture_living_studio') ||
                (th.id === 'retail_web_premium_optical_eyewear_lounge' && currentTheme === 'retail_web_optical_eyewear_boutique') ||
                (th.id === 'retail_web_artisan_organic_supermarket' && currentTheme === 'retail_web_organic_gourmet_supermarket');

              return (
                <button
                  key={th.id}
                  onClick={() => handleSwitchTheme(th.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'text-white font-black shadow ring-2 ring-white/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                  style={isSelected ? { backgroundColor: th.color } : {}}
                >
                  {th.label}
                </button>
              );
            })}

            <Link
              href={`/store/${tenant.slug}/dashboard`}
              className="ml-2 px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs flex items-center gap-1.5 shadow shrink-0"
            >
              <Settings className="w-3 h-3" />
              <span>Studio</span>
            </Link>
          </div>
        </div>
      )}

      {/* 2. TOP ANNOUNCEMENT & PROMO TICKER */}
      <div
        className="text-white text-xs py-2.5 px-4 font-semibold tracking-wide shadow-sm flex items-center justify-between"
        style={{
          background: `linear-gradient(90deg, ${activeBrandColor}, #7c3aed, #ec4899)`,
        }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
              Special Offer
            </span>
            <span className="truncate">
              {tenant.settings?.announcement ||
                `🎉 Welcome to ${tenant.business_name}! Use coupon code WELCOME10 for 10% OFF • Free Delivery above ₹499`}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] shrink-0 font-medium">
            <span className="flex items-center gap-1 opacity-90">
              <Truck className="w-3.5 h-3.5" /> 30-Min Fast Dispatch
            </span>
            <span className="opacity-60">•</span>
            <a
              href={`https://wa.me/${(tenant.whatsapp_number || '9876543210').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="hover:underline flex items-center gap-1 font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Concierge
            </a>
          </div>
        </div>
      </div>

      {/* 3. MAIN NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-xl border-b bg-white/95 border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo & Details */}
          <Link href={`/store/${tenant.slug}?demo=1`} className="flex items-center gap-3.5 group">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md transition transform group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${activeBrandColor}, #9333ea)`,
              }}
            >
              {tenant.business_name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight leading-tight group-hover:text-blue-600 transition">
                  {tenant.business_name}
                </span>
                <span title="Verified MSME Dukaan" className="inline-flex text-blue-500">
                  <BadgeCheck className="w-5 h-5 fill-blue-500 text-white" />
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs opacity-75 font-medium mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  {tenant.city || 'Mumbai'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  {tenant.settings?.operating_hours || '9:00 AM - 10:00 PM'}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold opacity-85">
            <a href="#services" className="hover:text-blue-600 transition">
              Collections & Catalog
            </a>
            <a href="#about" className="hover:text-blue-600 transition">
              Our Story
            </a>
            <a href="#reviews" className="hover:text-blue-600 transition">
              Customer Reviews
            </a>
            <a href="#contact" className="hover:text-blue-600 transition">
              Timings & Contact
            </a>
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Merchant Dashboard Direct Link */}
            <Link
              href={`/store/${tenant.slug}/dashboard`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-3.5 rounded-xl transition border border-slate-200/70"
            >
              <Settings className="w-3.5 h-3.5 text-purple-600" />
              <span>Studio</span>
            </Link>

            {/* Quick Call */}
            <a
              href={`tel:${tenant.phone || '9876543210'}`}
              className="p-2.5 sm:px-3 sm:py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline">Call</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 text-white font-extrabold px-4 sm:px-5 py-2.5 rounded-xl transition shadow-md hover:scale-[1.02] cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${activeBrandColor}, #4f46e5)`,
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Cart</span>
              {totalCartCount > 0 ? (
                <span className="bg-white text-slate-900 text-xs font-black px-2 py-0.5 rounded-full shadow-xs">
                  {totalCartCount} • ₹{subtotal}
                </span>
              ) : (
                <span className="text-xs font-medium opacity-80">(0)</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 4. HERO SECTION: PREMIER RETAIL STOREFRONT & SHOWROOM    */}
      {/* (100% FAITHFUL TO ORIGINAL LARAVEL ARCHITECTURAL LAYOUT) */}
      {/* ======================================================== */}
      <section
        id="hero"
        className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-amber-50/60 via-white to-orange-50/30 border-b border-amber-100"
      >
        {/* Ambient Warm Retail Glow Orbs */}
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: activeBrandColor }}
        />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-rose-200/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols: Brand Details & Pitch */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge with pulsing radar dot */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-200 text-amber-800 text-xs font-bold shadow-xs">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: activeBrandColor }}
                />
                <span>{activeConfig.badge}</span>
              </div>

              {/* Title with Gradient City */}
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                {activeConfig.title} in{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${activeBrandColor}, #ea580c, #e11d48)`,
                  }}
                >
                  {tenant.city || 'Mumbai'}
                </span>
              </h1>

              {/* Description */}
              <p className="text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {activeConfig.desc}
              </p>

              {/* 4 Trust Pills */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {activeConfig.pills.map((pill, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-200 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>

              {/* Dual Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#services"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-black text-xs tracking-wider uppercase shadow-xl transition hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${activeBrandColor}, #ea580c, #e11d48)`,
                    boxShadow: `0 10px 25px -5px ${activeBrandColor}44`,
                  }}
                >
                  <Store className="w-4 h-4" />
                  <span>Explore Collections & Store Tour</span>
                </a>

                <a
                  href={`https://wa.me/${(tenant.whatsapp_number || '9876543210').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs tracking-wider uppercase shadow-xs transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <span>VIP Store WhatsApp</span>
                </a>
              </div>

              {/* Store Metric Strip */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5 text-amber-700">
                  <Award className="w-4 h-4" /> 100% Genuine Certified
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <ShieldCheck className="w-4 h-4" /> Storefront Warranty
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Truck className="w-4 h-4" /> Same-Day Delivery
                </span>
              </div>
            </div>

            {/* Right 5 Cols: Showcase Collage */}
            <div className="lg:col-span-5">
              <div className="relative max-w-md mx-auto">
                {/* Main Showcase Hero Card */}
                <div className="h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group bg-slate-100">
                  <img
                    src={activeConfig.hero_img}
                    alt={activeConfig.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Top-Right Tag */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-700 shadow-md">
                    {activeConfig.tag}
                  </div>

                  {/* Bottom Store Label */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-0.5">
                      Flagship Experience
                    </span>
                    <h3 className="text-xl font-black">{tenant.business_name}</h3>
                    <p className="text-xs text-slate-200 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{tenant.city || 'Prime City Center'}</span>
                    </p>
                  </div>
                </div>

                {/* Side Floating 2-Card Row */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="h-28 rounded-2xl overflow-hidden shadow-md border-2 border-white relative group bg-slate-100">
                    <img
                      src={activeConfig.side_img1}
                      alt="Store Collection"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                      <span className="text-[11px] font-bold text-white">New Arrivals</span>
                    </div>
                  </div>

                  <div className="h-28 rounded-2xl overflow-hidden shadow-md border-2 border-white relative group bg-slate-100">
                    <img
                      src={activeConfig.side_img2}
                      alt="Featured Gallery"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                      <span className="text-[11px] font-bold text-white">Curated Brands</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VALUE PROPOSITIONS & TRUST STRIP */}
      <section className="py-8 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">Fast 30-Min Dispatch</h4>
                <p className="text-xs opacity-70 mt-0.5">Quick local delivery across {tenant.city || 'city'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">1-Click WhatsApp</h4>
                <p className="text-xs opacity-70 mt-0.5">Direct chat & instant order confirmation</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">100% Genuine Quality</h4>
                <p className="text-xs opacity-70 mt-0.5">Verified directly by showroom manager</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">Cash on Delivery / UPI</h4>
                <p className="text-xs opacity-70 mt-0.5">Pay conveniently on doorstep</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE CATALOG & SEARCH SECTION */}
      <section id="services" className="py-14 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Showroom Catalog</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight">Explore Featured Collections</h2>
              <p className="text-sm opacity-70 mt-1">
                Showing {filteredItems.length} products & items available for immediate order
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 opacity-40 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`capitalize whitespace-nowrap text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-2xs ${
                    isSelected
                      ? 'text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                  style={isSelected ? { backgroundColor: activeBrandColor } : {}}
                >
                  <span>{cat === 'all' ? '✨ All Items' : cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {cat === 'all' ? items.length : items.filter((i) => i.category_name === cat).length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const inCartQty = cart[item.id]?.quantity || 0;
              const discountPct = item.compare_at_price
                ? Math.round(((item.compare_at_price - item.price) / item.compare_at_price) * 100)
                : null;

              return (
                <div
                  key={item.id}
                  className="group rounded-2xl border overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between bg-white border-slate-200/90 hover:border-amber-300"
                >
                  {/* Image Container with Badges */}
                  <div
                    className="relative h-56 w-full overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => setQuickViewItem(item)}
                  >
                    <img
                      src={item.image_url || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500'}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-108 transition duration-500"
                    />

                    {/* Floating Discount Badge */}
                    {discountPct && (
                      <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.8 rounded-full shadow-md">
                        {discountPct}% OFF
                      </div>
                    )}

                    {/* Stock Pill */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>In Stock</span>
                    </div>

                    {/* Quick View Hover Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewItem(item);
                      }}
                      className="absolute bottom-3 right-3 bg-white/90 text-slate-800 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition shadow-md hover:bg-white cursor-pointer"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 text-[11px] font-semibold opacity-70 mb-1">
                        <span className="uppercase tracking-wider font-bold text-amber-700">
                          {item.category_name}
                        </span>
                        <span className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-3 h-3 fill-amber-500" /> 4.9
                        </span>
                      </div>

                      <h3
                        className="font-extrabold text-base line-clamp-1 mb-1.5 cursor-pointer hover:text-amber-600 transition"
                        onClick={() => setQuickViewItem(item)}
                      >
                        {item.title}
                      </h3>

                      <p className="text-xs opacity-70 line-clamp-2 leading-relaxed mb-4">
                        {item.description || 'Authentic quality product crafted with premium materials.'}
                      </p>
                    </div>

                    {/* Price & Action Row */}
                    <div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-black text-slate-900">₹{item.price}</span>
                        {item.compare_at_price && (
                          <span className="text-xs line-through opacity-50 font-semibold">
                            ₹{item.compare_at_price}
                          </span>
                        )}
                        {discountPct && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                            Save ₹{item.compare_at_price! - item.price}
                          </span>
                        )}
                      </div>

                      {/* Cart Stepper or Add to Cart Button */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {inCartQty > 0 ? (
                          <div className="flex items-center justify-between border border-amber-500/50 bg-amber-50 rounded-xl px-2 py-1.5">
                            <button
                              onClick={(e) => updateQuantity(item.id, -1, e)}
                              className="w-6 h-6 rounded-lg bg-white text-slate-800 flex items-center justify-center font-black shadow-xs hover:bg-slate-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-black text-amber-800">{inCartQty}</span>
                            <button
                              onClick={(e) => updateQuantity(item.id, 1, e)}
                              className="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center font-black shadow-xs hover:bg-amber-700"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => addToCart(item, e)}
                            className="py-2.5 px-3 rounded-xl font-extrabold text-xs text-white shadow-xs transition hover:scale-[1.02] flex items-center justify-center gap-1.5 cursor-pointer"
                            style={{ backgroundColor: activeBrandColor }}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        )}

                        {/* Quick 1-Click WhatsApp Button */}
                        <button
                          onClick={() => handleInstantBuyOnWhatsApp(item)}
                          className="py-2.5 px-2 rounded-xl font-bold text-[11px] border border-emerald-600/40 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <MessageSquare className="w-3 h-3 text-emerald-600" />
                          <span>1-Click Buy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. STORE STORY & VERIFIED MERCHANT INFO */}
      <section id="about" className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 h-96">
                <img
                  src={activeConfig.hero_img}
                  alt={`${tenant.business_name} Flagship`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full mb-2 w-max">
                    <BadgeCheck className="w-3.5 h-3.5" /> 100% Verified Indian MSME
                  </div>
                  <h3 className="font-extrabold text-xl leading-tight">{tenant.business_name}</h3>
                  <p className="text-xs text-slate-300 mt-1">Operating in {tenant.city || 'Mumbai'}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                <Award className="w-4 h-4" />
                <span>Our Philosophy & Promise</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
                Committed to Authentic Quality & Seamless Local Experience.
              </h2>

              <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-6 font-normal">
                {tenant.about_text ||
                  'Founded with a simple mission: bringing authentic, handcrafted lifestyle essentials, homeware, and pantry items directly to customers with zero middlemen markup.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 font-black" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs">Direct WhatsApp Assistance</h5>
                    <p className="text-[11px] opacity-70 mt-0.5">Talk to the owner directly for custom requests</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 font-black" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs">Zero-Risk Doorstep Inspection</h5>
                    <p className="text-[11px] opacity-70 mt-0.5">Check your order package before paying cash or UPI</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold opacity-75">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" /> {tenant.address || 'Main Market, City Center, Mumbai'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-emerald-600" /> {tenant.phone || '9876543210'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. VERIFIED CUSTOMER REVIEWS */}
      <section id="reviews" className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-3 border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span>4.9 / 5.0 Rating from 500+ Customers</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight">Loved by Local Shoppers</h2>
            <p className="text-sm opacity-70 mt-1">Real feedback from verified customers who shop with us regularly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Pooja Sharma',
                city: 'Andheri West, Mumbai',
                review:
                  'Ordered through WhatsApp and the response was lightning fast! The items were premium and packaged very securely.',
                rating: 5,
                tag: 'Verified Buyer',
              },
              {
                name: 'Vikram Mehta',
                city: 'Bandra, Mumbai',
                review:
                  'No login hassle, no passwords. Just clicked WhatsApp order and it arrived at my doorstep within 30 minutes!',
                rating: 5,
                tag: 'Frequent Buyer',
              },
              {
                name: 'Ananya Deshmukh',
                city: 'Colaba, Mumbai',
                review:
                  'The quality and finish are top-tier. Highly recommended store in Mumbai for authentic items.',
                rating: 5,
                tag: 'Verified Buyer',
              },
            ].map((rev, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm opacity-80 leading-relaxed mb-6 font-normal">"{rev.review}"</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-extrabold text-xs">{rev.name}</h5>
                    <p className="text-[10px] opacity-60">{rev.city}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {rev.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TIMINGS & GOOGLE MAPS / CONTACT CARD */}
      <section id="contact" className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Business Hours & Location Info */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                <Clock className="w-4 h-4" />
                <span>Store Timings & Visits</span>
              </div>

              <h3 className="text-2xl font-black mb-4">We are Open 7 Days a Week</h3>

              <div className="space-y-2.5 mb-6 text-xs">
                {[
                  { day: 'Monday - Friday', time: '9:00 AM - 10:00 PM', status: 'Open' },
                  { day: 'Saturday', time: '9:00 AM - 10:30 PM', status: 'Open' },
                  { day: 'Sunday', time: '10:00 AM - 9:00 PM', status: 'Open' },
                ].map((slot, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-200/60">
                    <span className="font-bold">{slot.day}</span>
                    <div className="flex items-center gap-2">
                      <span className="opacity-75">{slot.time}</span>
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {slot.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 mb-6 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs">{tenant.business_name} Storefront</h5>
                  <p className="text-xs opacity-70 mt-0.5">{tenant.address || 'Main Market, City Center, Mumbai'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${tenant.phone || '9876543210'}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-600 text-white font-bold text-xs text-center shadow-md hover:bg-amber-700 transition flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Store Now
                </a>
                <a
                  href={`https://wa.me/${(tenant.whatsapp_number || '9876543210').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs text-center shadow-md hover:bg-emerald-700 transition flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Support
                </a>
              </div>
            </div>

            {/* Quick Inquiry / Message Form */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">
                <Send className="w-4 h-4" />
                <span>Instant Message</span>
              </div>

              <h3 className="text-2xl font-black mb-2">Have a Custom Request or Inquiry?</h3>
              <p className="text-xs opacity-75 mb-6">Send us a direct note — we will reply instantly on WhatsApp.</p>

              {inquirySubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-black text-sm text-emerald-800">Message Dispatched!</h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    Your inquiry has been sent to our WhatsApp desk. We will reach out shortly!
                  </p>
                  <button
                    onClick={() => setInquirySubmitted(false)}
                    className="mt-4 px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-1 opacity-80">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 opacity-80">WhatsApp Contact Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 opacity-80">Message / Requirement</label>
                    <textarea
                      rows={3}
                      placeholder="I want to know about availability, store visits or custom designs..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl text-white font-extrabold text-xs shadow-md transition hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${activeBrandColor}, #7c3aed)`,
                    }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message on WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10. STORE FOOTER */}
      <footer className="py-12 bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-xs"
              style={{ backgroundColor: activeBrandColor }}
            >
              {tenant.business_name.charAt(0)}
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">{tenant.business_name}</p>
              <p className="text-[11px] text-slate-500">
                Verified MSME Digital Operating System • {tenant.city || 'India'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <a href="#services" className="hover:text-white transition">
              Collections
            </a>
            <a href="#about" className="hover:text-white transition">
              About
            </a>
            <a href="#reviews" className="hover:text-white transition">
              Reviews
            </a>
            <Link href={`/store/${tenant.slug}/dashboard`} className="hover:text-white transition text-purple-400 font-bold">
              Merchant Login
            </Link>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-600">
            <p>© 2026 {tenant.business_name}. All rights reserved.</p>
            <p className="mt-0.5">Powered by Anemony SaaS Operating System</p>
          </div>
        </div>
      </footer>

      {/* 11. SLIDE-OVER SHOPPING CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md shadow-2xl flex flex-col justify-between bg-white text-slate-900">
              {/* Cart Drawer Header */}
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs"
                    style={{ backgroundColor: activeBrandColor }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base leading-tight">Your Shopping Cart</h3>
                    <p className="text-xs opacity-60 font-medium">
                      {totalCartCount} item{totalCartCount !== 1 ? 's' : ''} in cart
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Meter */}
              <div className="px-5 py-3 bg-amber-50 border-b border-amber-100">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="text-amber-800">
                    {isFreeShipping ? '🎉 Free Delivery Unlocked!' : `Add ₹${shippingRemaining} more for FREE Delivery!`}
                  </span>
                  <span className="text-amber-700 font-extrabold">{shippingPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-amber-200 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-amber-600 to-emerald-500"
                    style={{ width: `${shippingPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartList.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                    <h4 className="font-bold text-base">Your cart is empty</h4>
                    <p className="text-xs opacity-60 mt-1 mb-6">Explore our collections and add items you love!</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cartList.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-3.5 p-3 rounded-2xl border border-slate-200/80 bg-slate-50/50"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                        <img
                          src={c.image_url || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=200'}
                          alt={c.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs line-clamp-1">{c.title}</h4>
                        <div className="text-xs font-black text-slate-900 mt-0.5">
                          ₹{c.price * c.quantity}
                          <span className="text-[10px] font-normal opacity-60 ml-1">
                            (₹{c.price} x {c.quantity})
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                            <button
                              onClick={() => updateQuantity(c.id, -1)}
                              className="px-2 py-0.5 hover:bg-slate-100 text-slate-600"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold">{c.quantity}</span>
                            <button
                              onClick={() => updateQuantity(c.id, 1)}
                              className="px-2 py-0.5 hover:bg-slate-100 text-slate-600"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => updateQuantity(c.id, -c.quantity)}
                            className="text-rose-500 hover:text-rose-700 p-1 rounded-md text-xs"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Drawer Bottom Action Panel */}
              {cartList.length > 0 && (
                <div className="p-5 border-t border-slate-200 bg-slate-50/50 space-y-4">
                  {/* Coupon Apply Box */}
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="Promo code (e.g. FESTIVE20)"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold uppercase focus:ring-1 focus:ring-amber-500 outline-hidden"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon()}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900 cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon('WELCOME10')}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition ${
                          appliedCoupon?.code === 'WELCOME10'
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'border-dashed border-slate-300 text-slate-600 hover:bg-white'
                        }`}
                      >
                        WELCOME10 (10% OFF)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon('FESTIVE20')}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition ${
                          appliedCoupon?.code === 'FESTIVE20'
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'border-dashed border-slate-300 text-slate-600 hover:bg-white'
                        }`}
                      >
                        FESTIVE20 (20% OFF)
                      </button>
                    </div>

                    {couponError && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{couponError}</p>}
                    {appliedCoupon && (
                      <p className="text-[10px] text-emerald-600 mt-1 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Coupon `{appliedCoupon.code}` applied ({appliedCoupon.percent}% OFF)
                      </p>
                    )}
                  </div>

                  {/* Customer Checkout Details Form */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/80">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-500">Delivery Details</p>
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-1 focus:ring-amber-500 outline-hidden"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp Mobile Number *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-1 focus:ring-amber-500 outline-hidden"
                    />
                    <input
                      type="text"
                      placeholder="Delivery Address (Flat / Street / Area)"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:ring-1 focus:ring-amber-500 outline-hidden"
                    />
                  </div>

                  {/* Billing Calculation Breakdown */}
                  <div className="space-y-1.5 text-xs pt-2 border-t border-slate-200/80">
                    <div className="flex items-center justify-between opacity-80">
                      <span>Subtotal:</span>
                      <span className="font-bold">₹{subtotal.toFixed(2)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex items-center justify-between text-emerald-600 font-bold">
                        <span>Discount ({appliedCoupon?.percent}%):</span>
                        <span>-₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between opacity-80">
                      <span>Local Delivery:</span>
                      <span className="font-bold text-emerald-600">
                        {isFreeShipping ? 'FREE' : '₹50.00'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-base font-black pt-2 border-t border-slate-200">
                      <span>Total Payable:</span>
                      <span className="text-xl text-amber-700">
                        ₹{(finalTotal + (isFreeShipping ? 0 : 50)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Dual Checkout Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      disabled={checkoutLoading}
                      onClick={handleWhatsAppCheckout}
                      className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Order</span>
                    </button>

                    <button
                      type="button"
                      disabled={checkoutLoading}
                      onClick={handleDirectWebCheckout}
                      className="py-3 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>Pay on Delivery</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-center opacity-60">
                    <ShieldCheck className="w-3 h-3 inline text-emerald-600 mr-1" />
                    100% Verified Order • Cash or UPI on Doorstep
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 12. QUICK VIEW PRODUCT MODAL */}
      {quickViewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setQuickViewItem(null)} />
          <div className="relative rounded-3xl max-w-2xl w-full p-6 shadow-2xl overflow-hidden border border-slate-200 z-10 bg-white text-slate-900">
            <button
              onClick={() => setQuickViewItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={quickViewItem.image_url || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600'}
                  alt={quickViewItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-bold uppercase text-amber-700 tracking-wider">
                  {quickViewItem.category_name}
                </span>
                <h3 className="text-xl font-extrabold mt-1 mb-2">{quickViewItem.title}</h3>
                <p className="text-xs opacity-75 leading-relaxed mb-4">
                  {quickViewItem.description ||
                    'Crafted meticulously with premium materials to guarantee durability, elegance, and authentic touch.'}
                </p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl font-black">₹{quickViewItem.price}</span>
                  {quickViewItem.compare_at_price && (
                    <span className="text-sm line-through opacity-50">₹{quickViewItem.compare_at_price}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      addToCart(quickViewItem);
                      setQuickViewItem(null);
                      setIsCartOpen(true);
                    }}
                    className="w-full py-3 px-4 rounded-xl text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                    style={{ backgroundColor: activeBrandColor }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart & Checkout</span>
                  </button>

                  <button
                    onClick={() => {
                      handleInstantBuyOnWhatsApp(quickViewItem);
                      setQuickViewItem(null);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-emerald-600 bg-emerald-50 text-emerald-700 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Order Instantly on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 13. ORDER CONFIRMATION CELEBRATION MODAL */}
      {confirmedOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setConfirmedOrderId(null)} />
          <div className="relative rounded-3xl max-w-md w-full p-8 shadow-2xl bg-white text-slate-900 border border-slate-200 z-10 text-center">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black">Order Placed Successfully!</h3>
            <p className="text-xs text-slate-600 mt-2">
              Thank you for ordering with <strong className="text-slate-900">{tenant.business_name}</strong>.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-slate-500">Order Number:</span>
                <span className="font-mono text-purple-700 font-extrabold">{confirmedOrderId}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-slate-500">Customer:</span>
                <span>{customerName || 'Direct Guest'}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500">Payment:</span>
                <span className="text-emerald-600">Cash / UPI on Delivery</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmedOrderId(null)}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs shadow-md transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* 14. FLOATING WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/${(tenant.whatsapp_number || tenant.phone || '9876543210').replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition transform hover:scale-110 flex items-center justify-center group"
        title="Chat with Store on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-white animate-pulse" />
        <MessageSquare className="w-6 h-6" />
        <span className="hidden group-hover:inline ml-2 text-xs font-extrabold pr-1">Chat with Dukaan</span>
      </a>
    </div>
  );
}
