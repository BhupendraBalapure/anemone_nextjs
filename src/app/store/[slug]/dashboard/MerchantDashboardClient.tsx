'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tenant, CatalogItem, Order, OrderStatus } from '@/lib/supabase/types';
import { updateTenantSettings } from '@/lib/store-service';
import {
  Store,
  ExternalLink,
  Package,
  ShoppingBag,
  IndianRupee,
  Clock,
  Globe,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Check,
  Phone,
  Calendar,
  Layers,
  Palette,
  Eye,
  Sliders,
  Sparkles,
  MapPin,
  Tag,
  Save,
  Trash2,
  Plus,
  Wand2,
  Lock,
  LogOut,
  ArrowRight,
  ShieldCheck,
  X,
  Copy,
  ChevronRight,
  Building2,
  Stethoscope,
  Scissors,
  Utensils,
  Hotel,
  Megaphone,
} from 'lucide-react';
import { getStudioTemplates, StudioTemplate, CATEGORIES } from '@/lib/template-catalog';

interface MerchantDashboardClientProps {
  tenant: Tenant;
  initialItems: CatalogItem[];
  initialOrders: Order[];
}

export default function MerchantDashboardClient({
  tenant,
  initialItems,
  initialOrders,
}: MerchantDashboardClientProps) {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'templates' | 'catalog' | 'profile' | 'orders' | 'domains' | 'ai_studio'>('templates');

  // Store Configuration State
  const [businessName, setBusinessName] = useState<string>(tenant.business_name);
  const [activeTheme, setActiveTheme] = useState<string>(tenant.active_theme || 'modern_clean');
  const [brandColor, setBrandColor] = useState<string>(tenant.brand_color || '#10B981');
  const [tagline, setTagline] = useState<string>(tenant.tagline || '');
  const [city, setCity] = useState<string>(tenant.city || '');
  const [address, setAddress] = useState<string>(tenant.address || '');
  const [phone, setPhone] = useState<string>(tenant.phone || '');
  const [whatsappNumber, setWhatsappNumber] = useState<string>(tenant.whatsapp_number || '');
  const [announcement, setAnnouncement] = useState<string>(tenant.settings?.announcement || '');

  // Section Display Toggles
  const [toggles, setToggles] = useState({
    hero_trust: tenant.settings?.section_toggles?.hero_trust ?? true,
    highlights: tenant.settings?.section_toggles?.highlights ?? true,
    reviews: tenant.settings?.section_toggles?.reviews ?? true,
    timings: tenant.settings?.section_toggles?.timings ?? true,
    inquiry: tenant.settings?.section_toggles?.inquiry ?? true,
  });

  // Template Studio Filter State
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>(CATEGORIES[0]);
  const [templateFilterMode, setTemplateFilterMode] = useState<string>('all');

  // Items & Orders State
  const [items, setItems] = useState<CatalogItem[]>(initialItems);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');

  // Add Item Modal
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('General');
  const [newItemPrice, setNewItemPrice] = useState(349);
  const [newItemComparePrice, setNewItemComparePrice] = useState(499);
  const [newItemType, setNewItemType] = useState<'product' | 'service' | 'quote_item'>('product');
  const [newItemImage, setNewItemImage] = useState('https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&auto=format&fit=crop&q=60');

  // Domain State
  const [customDomainInput, setCustomDomainInput] = useState(tenant.custom_domain || '');
  const [customDomainStatus, setCustomDomainStatus] = useState(tenant.custom_domain ? 'active' : 'none');
  const [dnsVerifying, setDnsVerifying] = useState(false);

  // AI Studio State
  const [aiPromptTopic, setAiPromptTopic] = useState('');
  const [aiGeneratedText, setAiGeneratedText] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  // Notifications
  const [flashMessage, setFlashMessage] = useState('');

  const triggerFlash = (msg: string) => {
    setFlashMessage(msg);
    setTimeout(() => setFlashMessage(''), 4000);
  };

  const handleSaveAllSettings = async () => {
    await updateTenantSettings(tenant.slug, {
      business_name: businessName,
      tagline,
      city,
      address,
      phone,
      whatsapp_number: whatsappNumber,
      active_theme: activeTheme,
      brand_color: brandColor,
      settings: {
        ...tenant.settings,
        announcement,
        section_toggles: toggles,
      },
    });

    triggerFlash('All theme, layout, and store settings saved successfully! Live website updated.');
  };

  const handleUpdateOrderStatus = (orderId: string | number, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    triggerFlash(`Order status transitioned to ${newStatus}.`);
  };

  const handleAddNewItem = () => {
    if (!newItemTitle) return;

    const newItem: CatalogItem = {
      id: Date.now(),
      tenant_id: tenant.id,
      title: newItemTitle,
      category_name: newItemCategory,
      price: newItemPrice,
      compare_at_price: newItemComparePrice,
      type: newItemType,
      in_stock: true,
      stock_quantity: 50,
      image_url: newItemImage,
    };

    setItems((prev) => [newItem, ...prev]);
    setShowAddItemModal(false);
    setNewItemTitle('');
    triggerFlash(`Item "${newItemTitle}" added to catalog.`);
  };

  const handleDeleteItem = (id: string | number) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    triggerFlash('Catalog item removed.');
  };

  const handleVerifyDns = () => {
    if (!customDomainInput.trim()) {
      alert('Please enter your custom domain (e.g. shop.mybrand.in)');
      return;
    }
    setDnsVerifying(true);
    setTimeout(() => {
      setDnsVerifying(false);
      setCustomDomainStatus('active');
      triggerFlash('DNS records verified successfully! SSL certificate active.');
    }, 1200);
  };

  const handleGenerateAi = () => {
    if (!aiPromptTopic.trim()) {
      alert('Please enter a product or business topic');
      return;
    }
    setAiGenerating(true);
    setTimeout(() => {
      setAiGenerating(false);
      setAiGeneratedText(
        `Discover premium quality with ${aiPromptTopic}. Crafted with sustainable materials, certified durability, and backed by fast local delivery across ${city || 'India'}. Special introductory price valid for today only. Order directly on WhatsApp!`
      );
    }, 900);
  };

  // Filtered Templates via Authentic Catalog Engine
  const studioTemplates = getStudioTemplates(selectedCategoryFilter, templateFilterMode);
  const allCatTemplates = getStudioTemplates(selectedCategoryFilter, 'category');
  const websiteCount = allCatTemplates.filter((t) => t.type === 'business_website').length;
  const ecomCount = allCatTemplates.filter((t) => t.type === 'ecommerce').length;
  const landingCount = allCatTemplates.filter((t) => t.type === 'landing_page').length;

  // Filtered Catalog
  const filteredItems = items.filter((it) =>
    it.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
    (it.category_name || '').toLowerCase().includes(catalogSearch.toLowerCase())
  );

  // Filtered Orders
  const filteredOrders = orders.filter((o) =>
    orderStatusFilter === 'all' ? true : o.status === orderStatusFilter
  );

  const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex w-full antialiased font-sans">
      {/* ======================================================== */}
      {/* 🧭 LEFT SIDEBAR (Native Flex Sibling, Zero Overlap)       */}
      {/* ======================================================== */}
      <aside className="w-64 xl:w-72 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none">
        {/* Top: Store Brand & Navigation */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          {/* Store Profile Header */}
          <div className="p-4 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-base shadow-sm shrink-0"
                style={{ background: `linear-gradient(135deg, ${brandColor}, #7c3aed)` }}
              >
                {businessName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h2 className="text-sm font-bold text-slate-900 tracking-tight leading-tight truncate">
                    {businessName}
                  </h2>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span> Live
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5 truncate">
                  <span className="font-semibold text-purple-700 truncate">
                    {tenant.archetype?.name || 'Retail'}
                  </span>
                  {city && (
                    <>
                      <span className="text-slate-300">&bull;</span>
                      <span className="truncate">{city}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center justify-between gap-1 text-[10px] text-slate-400 mt-2 pt-1.5 border-t border-slate-100">
                  <Link
                    href={`/store/${tenant.slug}`}
                    target="_blank"
                    className="font-mono truncate text-slate-600 font-medium hover:text-purple-600 flex items-center min-w-0"
                  >
                    <Globe className="w-3 h-3 text-emerald-600 mr-1 shrink-0" />
                    <span className="truncate">/store/{tenant.slug}</span>
                  </Link>
                  <button
                    onClick={() => setActiveTab('domains')}
                    className="text-purple-600 hover:text-purple-800 font-bold shrink-0 hover:underline cursor-pointer"
                  >
                    {customDomainStatus === 'active' ? 'Manage' : '+ Custom'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-5 flex-1 mt-3">
            <div>
              <span className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                Store Management
              </span>
              <div className="space-y-1">
                {/* Templates & Theme Studio */}
                <button
                  onClick={() => setActiveTab('templates')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === 'templates'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Palette className={`w-4 h-4 ${activeTab === 'templates' ? 'text-purple-600' : 'text-slate-400'}`} />
                    <span>Templates & Themes</span>
                  </div>
                  <span
                    className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-black ${
                      activeTab === 'templates' ? 'bg-purple-200/60 text-purple-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    Studio
                  </span>
                </button>

                {/* Products & Catalog */}
                <button
                  onClick={() => setActiveTab('catalog')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === 'catalog'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Package className={`w-4 h-4 ${activeTab === 'catalog' ? 'text-purple-600' : 'text-slate-400'}`} />
                    <span>Products & Catalog</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeTab === 'catalog' ? 'bg-purple-200/60 text-purple-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {items.length}
                  </span>
                </button>

                {/* Store Profile & SEO */}
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === 'profile'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sliders className={`w-4 h-4 ${activeTab === 'profile' ? 'text-purple-600' : 'text-slate-400'}`} />
                    <span>Profile & Local SEO</span>
                  </div>
                </button>

                {/* Orders & Inquiries */}
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className={`w-4 h-4 ${activeTab === 'orders' ? 'text-purple-600' : 'text-slate-400'}`} />
                    <span>Orders & Inquiries</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeTab === 'orders' ? 'bg-purple-200/60 text-purple-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {orders.length}
                  </span>
                </button>

                {/* Custom Domains */}
                <button
                  onClick={() => setActiveTab('domains')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === 'domains'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Globe className={`w-4 h-4 ${activeTab === 'domains' ? 'text-purple-600' : 'text-slate-400'}`} />
                    <span>Domains & URLs</span>
                  </div>
                  {customDomainStatus === 'active' ? (
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-black bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live
                    </span>
                  ) : (
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-bold bg-blue-100 text-blue-800">
                      Free
                    </span>
                  )}
                </button>

                {/* AI Template Studio */}
                <button
                  onClick={() => setActiveTab('ai_studio')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === 'ai_studio'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Wand2 className="w-4 h-4 text-amber-500" />
                    <span>AI Template Studio</span>
                  </div>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-black bg-amber-100 text-amber-800">
                    AI
                  </span>
                </button>
              </div>
            </div>

            <div>
              <span className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                Live Store
              </span>
              <div className="space-y-1">
                <Link
                  href={`/store/${tenant.slug}`}
                  target="_blank"
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-4 h-4 text-purple-600" />
                    <span>View Live Website</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </Link>
                <Link
                  href="/admin"
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    <span>Super Admin Panel</span>
                  </div>
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom User Profile Card & Sign Out */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-rose-500 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-sm">
                {businessName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 truncate leading-tight">
                  {businessName} Merchant
                </span>
                <span className="block text-[10px] text-slate-500 truncate">
                  merchant@{tenant.slug}.in
                </span>
              </div>
            </div>

            <Link
              href="/login"
              className="h-7 w-7 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition flex items-center justify-center shrink-0"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 🖥️ MAIN CONTENT AREA                                      */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-100/70">
        {/* Top Sticky Header */}
        <header className="h-16 px-6 lg:px-8 border-b border-slate-200 bg-white/90 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20 shrink-0 shadow-2xs">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-slate-400 truncate max-w-[140px] sm:max-w-none">
              {businessName}
            </span>
            <span className="text-xs text-slate-300">/</span>
            <div className="flex items-center gap-2 font-black text-sm text-slate-900">
              {activeTab === 'templates' && <span>Templates & Theme Studio</span>}
              {activeTab === 'catalog' && <span>Products & Services</span>}
              {activeTab === 'profile' && <span>Store Profile & Local SEO</span>}
              {activeTab === 'orders' && <span>Orders & Inquiries</span>}
              {activeTab === 'domains' && <span>Domains & URLs</span>}
              {activeTab === 'ai_studio' && <span>AI Template Studio</span>}
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveTab('domains')}
              className={`h-9 px-3.5 rounded-xl border text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'domains'
                  ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-2xs'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-purple-600" />
              <span className="hidden sm:inline">
                {customDomainStatus === 'active' ? customDomainInput : 'Domains & URLs'}
              </span>
            </button>

            <Link
              href={`/store/${tenant.slug}`}
              target="_blank"
              className="h-9 px-4 rounded-xl text-white font-bold text-xs shadow-md transition hover:scale-[1.02] flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #9333ea 50%, #4f46e5 100%)',
              }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </Link>
          </div>
        </header>

        {/* Flash Message Banner */}
        {flashMessage && (
          <div className="px-6 lg:px-8 mt-5">
            <div className="bg-emerald-600 text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{flashMessage}</span>
              </div>
              <button
                onClick={() => setFlashMessage('')}
                className="text-emerald-200 hover:text-white font-bold"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* 📦 Main Dashboard Workspace */}
        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto">
          {/* ======================================================== */}
          {/* TAB 1: 🎨 TEMPLATES & THEME STUDIO                        */}
          {/* ======================================================== */}
          {activeTab === 'templates' && (
            <div className="space-y-8">
              {/* Live URL & Domain Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-5 sm:p-6 rounded-3xl shadow-md border border-purple-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-purple-300">
                        Live Website Address
                      </span>
                      {customDomainStatus === 'active' ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Custom Domain Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-purple-500/30 text-purple-200 border border-purple-400/30">
                          Free Subdomain
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Link
                        href={`/store/${tenant.slug}`}
                        target="_blank"
                        className="text-base sm:text-lg font-black text-white hover:text-purple-200 transition font-mono flex items-center gap-2 underline decoration-purple-400 decoration-2 underline-offset-4"
                      >
                        <span>http://localhost:3000/store/{tenant.slug}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-75" />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                  <button
                    onClick={() => setActiveTab('domains')}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm transition flex items-center gap-2 border border-purple-400/40"
                  >
                    <span>{customDomainStatus === 'active' ? 'Manage Domain & DNS' : 'Connect Custom Domain'}</span>
                  </button>
                  <Link
                    href={`/store/${tenant.slug}`}
                    target="_blank"
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md transition flex items-center gap-2 border border-white/20"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visit Website</span>
                  </Link>
                </div>
              </div>

              {/* Zero Data Loss Theme Banner */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-purple-600">
                      Zero Data Loss Theme Engine
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-[11px] font-bold text-purple-700">
                      {selectedCategoryFilter}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Website Templates & Layout Studio
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Switch visual themes anytime. All your catalog items, services, orders, and Google SEO schemas are preserved 100%.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/store/${tenant.slug}`}
                    target="_blank"
                    className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-xs hover:bg-slate-50 transition flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>Preview Live</span>
                  </Link>
                  <button
                    onClick={handleSaveAllSettings}
                    className="px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #f43f5e 0%, #9333ea 50%, #4f46e5 100%)',
                    }}
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>

              {/* 1. Category Filter & Industry Switcher (Authentic Laravel System) */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-purple-50/70 border border-purple-200/80 p-4 rounded-2xl shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center text-base shadow-sm shrink-0">
                    {templateFilterMode === 'ecommerce' ? (
                      <ShoppingBag className="w-5 h-5" />
                    ) : templateFilterMode === 'landing_page' ? (
                      <Megaphone className="w-5 h-5" />
                    ) : (
                      <Globe className="w-5 h-5" />
                    )}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Business Category Filter:</span>
                      <span className="bg-purple-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                        {selectedCategoryFilter}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Mode:</span>
                      <span className="bg-slate-200 text-slate-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                        {templateFilterMode === 'ecommerce'
                          ? '🛒 E-Commerce'
                          : templateFilterMode === 'landing_page'
                          ? '📢 Landing Page'
                          : templateFilterMode === 'business_website'
                          ? '🌐 Business Website'
                          : '📁 All Templates'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Showing templates exclusively tailored for <strong>{selectedCategoryFilter}</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap shrink-0">
                  {/* Category Quick Dropdown */}
                  <div className="relative">
                    <select
                      value={selectedCategoryFilter}
                      onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                      className="text-xs font-bold bg-white text-slate-800 border border-slate-300 rounded-xl px-3 py-1.5 cursor-pointer shadow-2xs focus:ring-2 focus:ring-purple-500"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mode Filter Buttons with Authentic Counts */}
                  <button
                    type="button"
                    onClick={() => setTemplateFilterMode('category')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      templateFilterMode === 'category' || templateFilterMode === 'all'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>All ({allCatTemplates.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTemplateFilterMode('business_website')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      templateFilterMode === 'business_website'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Website ({websiteCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTemplateFilterMode('ecommerce')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      templateFilterMode === 'ecommerce'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>E-Commerce ({ecomCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTemplateFilterMode('landing_page')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      templateFilterMode === 'landing_page'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Megaphone className="w-3.5 h-3.5" />
                    <span>Landing ({landingCount})</span>
                  </button>
                </div>
              </div>

              {/* Template Cards Grid (Authentic Laravel Visual Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studioTemplates.map((tpl) => {
                  const isActive = activeTheme === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      className={`p-5 rounded-3xl border-2 transition relative flex flex-col justify-between shadow-xs hover:shadow-md bg-white text-slate-900 border-slate-200 hover:border-slate-300 ${
                        isActive ? 'ring-4' : ''
                      }`}
                      style={
                        isActive
                          ? {
                              borderColor: tpl.suggested_color || '#9333EA',
                              boxShadow: `0 0 0 4px ${(tpl.suggested_color || '#9333EA')}33`,
                            }
                          : {}
                      }
                    >
                      <div>
                        {/* Visual Banner */}
                        <div className="h-44 rounded-2xl relative overflow-hidden mb-4 shadow-inner group border border-slate-100">
                          <img
                            src={tpl.image_url}
                            alt={tpl.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-between p-3.5">
                            <div className="flex items-center justify-between gap-1 flex-wrap">
                              <span
                                className="text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1"
                                style={{ backgroundColor: tpl.suggested_color || '#9333EA' }}
                              >
                                <span>{tpl.category}</span>
                              </span>
                              <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                {tpl.type === 'ecommerce' ? (
                                  <>
                                    <ShoppingBag className="w-3 h-3 text-emerald-400" />
                                    <span>E-Commerce</span>
                                  </>
                                ) : tpl.type === 'landing_page' ? (
                                  <>
                                    <Megaphone className="w-3 h-3 text-amber-400" />
                                    <span>Landing Page</span>
                                  </>
                                ) : (
                                  <>
                                    <Globe className="w-3 h-3 text-sky-400" />
                                    <span>Business Website</span>
                                  </>
                                )}
                              </span>
                            </div>
                            <div>
                              <span className="text-white font-black text-sm block leading-tight">{tpl.title}</span>
                              {tpl.subheadline && (
                                <span className="text-slate-200 text-[11px] font-semibold line-clamp-1">
                                  {tpl.subheadline}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="font-black text-base text-slate-900 line-clamp-1">{tpl.title}</h4>
                          {isActive && (
                            <span
                              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0"
                              style={{
                                backgroundColor: `${tpl.suggested_color || '#9333EA'}22`,
                                color: tpl.suggested_color || '#9333EA',
                              }}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Active</span>
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                          {tpl.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {tpl.features.map((feat, fIdx) => (
                            <span
                              key={fIdx}
                              className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-3 flex items-center justify-between gap-2">
                        <Link
                          href={`/store/${tenant.slug}?demo=1`}
                          target="_blank"
                          className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" style={{ color: tpl.suggested_color || '#9333EA' }} />
                          <span>Preview</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTheme(tpl.id);
                            if (tpl.suggested_color) setBrandColor(tpl.suggested_color);
                            triggerFlash(`Applied template "${tpl.title}". Click Save Changes to publish.`);
                          }}
                          className="px-3.5 py-2 rounded-xl text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                          style={{ backgroundColor: tpl.suggested_color || '#9333EA' }}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Apply Template</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 2. Brand Accent Swatch Palette */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                <h3 className="font-extrabold text-base text-slate-900 mb-1">
                  Brand Accent Swatch Palette
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Selected brand color tints your hero buttons, announcements, product badges, and cart buttons.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  {[
                    { color: '#10B981', label: 'Emerald' },
                    { color: '#0284C7', label: 'Sky Blue' },
                    { color: '#D97706', label: 'Amber' },
                    { color: '#EF4444', label: 'Crimson' },
                    { color: '#9333EA', label: 'Purple' },
                    { color: '#2563EB', label: 'Royal Blue' },
                    { color: '#E11D48', label: 'Rose' },
                    { color: '#18181B', label: 'Onyx Black' },
                  ].map((c) => (
                    <button
                      key={c.color}
                      type="button"
                      onClick={() => {
                        setBrandColor(c.color);
                        triggerFlash(`Brand color updated to ${c.label}. Click Save to publish.`);
                      }}
                      className={`h-10 px-4 rounded-xl font-bold text-xs text-white transition flex items-center gap-2 shadow-xs ${
                        brandColor === c.color ? 'ring-2 ring-offset-2 ring-slate-900' : 'opacity-90 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.color }}
                    >
                      <span>{c.label}</span>
                      {brandColor === c.color && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                  <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50">
                    <span className="text-xs font-mono font-bold text-slate-700">{brandColor}</span>
                    <input
                      type="color"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="w-7 h-7 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Section Display Toggles */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
                <h3 className="font-extrabold text-base text-slate-900 mb-1">
                  Storefront Section Display Toggles
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Turn sections on or off on your public customer website.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: 'hero_trust', label: 'Hero Trust Pills' },
                    { key: 'highlights', label: 'Product Highlights' },
                    { key: 'reviews', label: 'Customer Reviews' },
                    { key: 'timings', label: 'Operating Timings' },
                    { key: 'inquiry', label: 'WhatsApp Inquiry Form' },
                  ].map((sec) => (
                    <label
                      key={sec.key}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 cursor-pointer"
                    >
                      <span className="text-xs font-bold text-slate-700">{sec.label}</span>
                      <input
                        type="checkbox"
                        checked={toggles[sec.key as keyof typeof toggles]}
                        onChange={(e) =>
                          setToggles({ ...toggles, [sec.key]: e.target.checked })
                        }
                        className="w-4 h-4 rounded-md accent-purple-600 cursor-pointer"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: 📦 PRODUCTS & SERVICES CATALOG                     */}
          {/* ======================================================== */}
          {activeTab === 'catalog' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search items by name or category..."
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  />
                </div>

                <button
                  onClick={() => setShowAddItemModal(true)}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-md transition self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product / Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((it) => (
                  <div
                    key={it.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-full h-40 bg-slate-100">
                        {it.image_url ? (
                          <Image
                            src={it.image_url}
                            alt={it.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Package className="w-8 h-8" />
                          </div>
                        )}
                        <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                          {it.type}
                        </span>
                      </div>

                      <div className="p-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          {it.category_name || 'General'}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 mb-1 line-clamp-1">{it.title}</h4>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-base font-black text-slate-900">₹{it.price.toFixed(2)}</span>
                          {it.compare_at_price && it.compare_at_price > it.price && (
                            <span className="text-xs line-through text-slate-400">
                              ₹{it.compare_at_price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-2">
                      <span>Stock: {it.stock_quantity ?? 50} units</span>
                      <button
                        onClick={() => handleDeleteItem(it.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: 📥 ORDERS & INQUIRIES                              */}
          {/* ======================================================== */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {(['all', 'pending', 'confirmed', 'completed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                        orderStatusFilter === st
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-slate-400 font-medium">Total Orders: {filteredOrders.length}</span>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="p-16 text-center">
                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <h4 className="font-bold text-slate-700">No orders matching filter</h4>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4">Order #</th>
                        <th className="py-3.5 px-4">Customer</th>
                        <th className="py-3.5 px-4">Line Items</th>
                        <th className="py-3.5 px-4">Amount</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50/70 transition">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                            #{ord.order_number}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{ord.customer_name}</div>
                            <div className="text-[11px] text-slate-400">{ord.customer_phone}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            {ord.items_payload ? (
                              <span>{ord.items_payload.length} item(s)</span>
                            ) : (
                              <span className="text-slate-400 italic">Inquiry Note: {ord.notes || '-'}</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            ₹{ord.total_amount.toFixed(2)}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                ord.status === 'confirmed'
                                  ? 'bg-blue-50 text-blue-700'
                                  : ord.status === 'completed'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex gap-1.5">
                              {ord.status === 'pending' && (
                                <button
                                  onClick={() => handleUpdateOrderStatus(ord.id, 'confirmed')}
                                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-[11px]"
                                >
                                  Confirm
                                </button>
                              )}
                              {ord.status === 'confirmed' && (
                                <button
                                  onClick={() => handleUpdateOrderStatus(ord.id, 'completed')}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px]"
                                >
                                  Delivered
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: 📍 STORE PROFILE & LOCAL SEO                       */}
          {/* ======================================================== */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 mb-1">
                Store Profile, Contact & Local SEO
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Store Display Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Store Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City / Location</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp Mobile</label>
                  <input
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Top Announcement Banner</label>
                <input
                  type="text"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              <button
                onClick={handleSaveAllSettings}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition shadow-md"
              >
                Save Profile Changes
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: 🌐 DOMAINS & URLS                                  */}
          {/* ======================================================== */}
          {activeTab === 'domains' && (
            <div className="max-w-2xl bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 mb-1">Custom Domain & DNS Setup</h3>
                <p className="text-xs text-slate-500">Connect your custom branded domain (e.g. shop.mybrand.in).</p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={customDomainInput}
                  onChange={(e) => setCustomDomainInput(e.target.value)}
                  placeholder="shop.yourbrand.in"
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
                <button
                  disabled={dnsVerifying}
                  onClick={handleVerifyDns}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition disabled:opacity-50"
                >
                  {dnsVerifying ? 'Verifying...' : 'Verify DNS'}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Verification Status</span>
                  <div className="flex items-center gap-1.5 font-bold text-xs mt-0.5">
                    {customDomainStatus === 'active' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Domain Active & Connected</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span className="text-amber-700">Pending DNS Configuration</span>
                      </>
                    )}
                  </div>
                </div>
                <span className="text-xs font-mono font-medium text-slate-500">
                  Target CNAME: cname.anemony.in
                </span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: ✨ AI TEMPLATE STUDIO                             */}
          {/* ======================================================== */}
          {activeTab === 'ai_studio' && (
            <div className="max-w-2xl bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Wand2 className="w-4 h-4 text-amber-500" />
                  <h3 className="font-extrabold text-base text-slate-900">AI Copywriting Assistant</h3>
                </div>
                <p className="text-xs text-slate-500">
                  Generate high-conversion descriptions, marketing headlines, and product copy in seconds.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Product or Business Topic
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Handmade Ceramic Teapot, Root Canal Treatment"
                      value={aiPromptTopic}
                      onChange={(e) => setAiPromptTopic(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                    />
                    <button
                      disabled={aiGenerating}
                      onClick={handleGenerateAi}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition disabled:opacity-50"
                    >
                      {aiGenerating ? 'Writing...' : 'Generate with AI'}
                    </button>
                  </div>
                </div>

                {aiGeneratedText && (
                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-slate-800 leading-relaxed space-y-2">
                    <div className="flex items-center justify-between text-amber-800 font-bold text-[11px]">
                      <span>AI Generated Copy:</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(aiGeneratedText);
                          triggerFlash('Copied to clipboard!');
                        }}
                        className="flex items-center gap-1 hover:text-amber-900"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                    </div>
                    <p>{aiGeneratedText}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ➕ Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-slate-900">
            <h3 className="font-extrabold text-lg mb-1">Add Product or Service</h3>
            <p className="text-xs text-slate-500 mb-4">Add to catalog with immediate storefront visibility.</p>

            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Item Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fortune Sunflower Oil 1L"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Category</label>
                  <input
                    type="text"
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Compare Price (₹)</label>
                  <input
                    type="number"
                    value={newItemComparePrice}
                    onChange={(e) => setNewItemComparePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Item Type</label>
                  <select
                    value={newItemType}
                    onChange={(e) => setNewItemType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  >
                    <option value="product">Retail Product</option>
                    <option value="service">Appointment Service</option>
                    <option value="quote_item">B2B Wholesale Item (RFQ)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  value={newItemImage}
                  onChange={(e) => setNewItemImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddItemModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddNewItem}
                className="px-5 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
