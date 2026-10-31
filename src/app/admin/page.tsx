'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  getAllTenants,
  getAllGlobalOrders,
  ARCHETYPES,
} from '@/lib/store-service';
import { Tenant, Order, Archetype } from '@/lib/supabase/types';
import {
  ShieldCheck,
  Store,
  ShoppingBag,
  IndianRupee,
  Users,
  Search,
  Filter,
  Plus,
  ExternalLink,
  Settings,
  Layers,
  CheckCircle2,
  AlertCircle,
  Eye,
  LogOut,
  Sparkles,
  MapPin,
  Phone,
  Clock,
  Trash2,
  Edit,
} from 'lucide-react';

export default function SuperAdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tenants' | 'archetypes' | 'orders' | 'settings'>('overview');
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [archetypeFilter, setArchetypeFilter] = useState('all');
  const [flash, setFlash] = useState('');

  // Deploy store modal
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreCity, setNewStoreCity] = useState('');
  const [newStorePhone, setNewStorePhone] = useState('');
  const [newStoreArchetype, setNewStoreArchetype] = useState('retail');

  // Load initial data
  React.useEffect(() => {
    async function load() {
      const t = await getAllTenants();
      const o = await getAllGlobalOrders();
      setTenants(t);
      setOrders(o);
    }
    load();
  }, []);

  // Filtered tenants
  const filteredTenants = tenants.filter((t) => {
    const matchesSearch =
      t.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.city || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArch =
      archetypeFilter === 'all' || (t.archetype && t.archetype.code === archetypeFilter);
    return matchesSearch && matchesArch;
  });

  // KPIs
  const totalStores = tenants.length;
  const activeStores = tenants.filter((t) => t.is_active).length;
  const totalOrders = orders.length;
  const totalGmv = orders.reduce((sum, o) => sum + o.total_amount, 0);

  const toggleTenantStatus = (id: number | string) => {
    setTenants((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_active: !t.is_active } : t))
    );
    setFlash('Store active status toggled successfully.');
    setTimeout(() => setFlash(''), 3000);
  };

  const handleDeployStore = () => {
    if (!newStoreName || !newStorePhone) {
      alert('Please enter Store Name and Phone');
      return;
    }

    const slug =
      newStoreName.toLowerCase().replace(/[^a-z0-9]+/g, '-') +
      '-' +
      Math.floor(1000 + Math.random() * 9000);

    const archId = newStoreArchetype === 'service' ? 2 : newStoreArchetype === 'b2b' ? 3 : 1;
    const archObj = Object.values(ARCHETYPES).find((a) => a.id === archId) || ARCHETYPES.retail;

    const newT: Tenant = {
      id: Date.now(),
      business_name: newStoreName,
      slug,
      archetype_id: archId,
      archetype: archObj,
      active_theme: 'modern_clean',
      phone: newStorePhone,
      whatsapp_number: newStorePhone,
      city: newStoreCity || 'India',
      brand_color: '#10B981',
      tagline: `Welcome to ${newStoreName}`,
      is_active: true,
      settings: {
        announcement: `Welcome to ${newStoreName}! Direct orders available.`,
      },
    };

    setTenants((prev) => [newT, ...prev]);
    setShowDeployModal(false);
    setNewStoreName('');
    setNewStorePhone('');
    setNewStoreCity('');
    setFlash(`Store ${newStoreName} deployed at /store/${slug}`);
    setTimeout(() => setFlash(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      {/* 🧭 Top Admin Bar */}
      <header className="border-b border-slate-800 bg-slate-950 py-3.5 px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base text-white tracking-tight leading-none">
                Anemony Super Admin
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                Command Center
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Fleet Monitoring & SaaS Management</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>
          <Link
            href="/login"
            className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 bg-rose-500/10 px-3 py-1.5 rounded-xl border border-rose-500/20 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex-1">
        {/* Flash Message */}
        {flash && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{flash}</span>
          </div>
        )}

        {/* 📊 KPI Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1 uppercase tracking-wider">
                Total Stores
              </span>
              <h3 className="text-3xl font-black text-white">{totalStores}</h3>
              <span className="text-[11px] text-emerald-400 font-semibold">{activeStores} Active Live</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1 uppercase tracking-wider">
                Platform GMV
              </span>
              <h3 className="text-3xl font-black text-emerald-400">₹{totalGmv.toFixed(0)}</h3>
              <span className="text-[11px] text-slate-400 font-medium">All Stores Gross Volume</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <IndianRupee className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1 uppercase tracking-wider">
                Total Orders & Bookings
              </span>
              <h3 className="text-3xl font-black text-white">{totalOrders}</h3>
              <span className="text-[11px] text-amber-400 font-semibold">Web & WhatsApp</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-1 uppercase tracking-wider">
                Industries Enabled
              </span>
              <h3 className="text-3xl font-black text-white">5</h3>
              <span className="text-[11px] text-purple-400 font-medium">Retail, Clinic, B2B, Food</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 📑 Tab Selector */}
        <div className="flex border-b border-slate-800 mb-6 gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 transition flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'hover:text-white'
            }`}
          >
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('tenants')}
            className={`pb-3 transition flex items-center gap-2 ${
              activeTab === 'tenants'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'hover:text-white'
            }`}
          >
            <span>Stores & Merchants ({tenants.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('archetypes')}
            className={`pb-3 transition flex items-center gap-2 ${
              activeTab === 'archetypes'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'hover:text-white'
            }`}
          >
            <span>Archetypes & Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 transition flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'hover:text-white'
            }`}
          >
            <span>Global Orders Feed ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 transition flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>AI & System Settings</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white">Recent Merchant Stores</h3>
              <button
                onClick={() => setShowDeployModal(true)}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>Deploy New Store</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tenants.map((t) => (
                <div
                  key={t.id}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                        {t.archetype?.name || 'Retail Store'}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          t.is_active ? 'bg-emerald-400' : 'bg-red-400'
                        }`}
                      />
                    </div>
                    <h4 className="font-bold text-white text-base mb-1">{t.business_name}</h4>
                    <p className="text-xs text-slate-400 mb-4 font-mono truncate">
                      /store/{t.slug}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-slate-700">
                    <Link
                      href={`/store/${t.slug}`}
                      target="_blank"
                      className="flex-1 py-1.5 px-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold text-center transition flex items-center justify-center gap-1"
                    >
                      <span>Store</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </Link>
                    <Link
                      href={`/store/${t.slug}/dashboard`}
                      target="_blank"
                      className="py-1.5 px-3 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs font-bold transition"
                    >
                      Studio
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ALL STORES & MERCHANTS */}
        {activeTab === 'tenants' && (
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xs">
            {/* Search & Filter Header */}
            <div className="p-4 border-b border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search stores, city, slug..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-purple-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={archetypeFilter}
                  onChange={(e) => setArchetypeFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                >
                  <option value="all">All Industries</option>
                  <option value="retail">Retail / Kirana</option>
                  <option value="service">Clinic / Doctors</option>
                  <option value="b2b">B2B Manufacturing</option>
                </select>

                <button
                  onClick={() => setShowDeployModal(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Deploy Store</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-4">Store Name</th>
                    <th className="py-3 px-4">Industry / Archetype</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 font-medium">
                  {filteredTenants.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-700/30 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{t.business_name}</div>
                        <div className="text-[11px] text-purple-400 font-mono">/store/{t.slug}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 text-[10px] font-bold uppercase">
                          {t.archetype?.name || 'Retail'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{t.city || 'India'}</td>
                      <td className="py-3 px-4 text-slate-300">{t.phone || '-'}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleTenantStatus(t.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition ${
                            t.is_active
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          }`}
                        >
                          {t.is_active ? 'Active' : 'Suspended'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex gap-2">
                          <Link
                            href={`/store/${t.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
                            title="Open Storefront"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/store/${t.slug}/dashboard`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300"
                            title="Merchant Dashboard"
                          >
                            <Settings className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ARCHETYPES */}
        {activeTab === 'archetypes' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(ARCHETYPES).map((a) => (
              <div
                key={a.id}
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300">
                      code: {a.code}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">Schema: {a.schema_type}</span>
                  </div>
                  <h4 className="font-extrabold text-lg text-white mb-1">{a.name}</h4>
                  <p className="text-xs text-slate-400 mb-4">{a.description}</p>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/60 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">
                    Call To Action Label
                  </span>
                  <span className="font-bold text-emerald-400">{a.cta_label}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: GLOBAL ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-700">
              <h3 className="font-bold text-sm text-white">Central Live Orders Stream</h3>
              <p className="text-xs text-slate-400">All customer orders and bookings across every tenant</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-4">Order #</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 font-medium">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-700/30 transition">
                      <td className="py-3 px-4 font-mono font-bold text-white">#{ord.order_number}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{ord.customer_name}</div>
                        <div className="text-[11px] text-slate-400">{ord.customer_phone}</div>
                      </td>
                      <td className="py-3 px-4 uppercase text-[10px] font-bold text-purple-300">
                        {ord.type}
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-400">
                        ₹{ord.total_amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 text-[10px] font-bold uppercase">
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {ord.created_at ? new Date(ord.created_at).toLocaleDateString() : 'Today'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: SYSTEM & AI SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="font-bold text-base text-white mb-1">AI Copy & Content Settings</h3>
              <p className="text-xs text-slate-400">
                Configure generative AI for merchant product descriptions and auto-translations.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Google Gemini API Key
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  WhatsApp Gateway Engine
                </label>
                <select className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white">
                  <option>Direct Click-To-Chat DeepLink (Zero Setup)</option>
                  <option>Meta WhatsApp Cloud API (Automated Webhooks)</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFlash('System settings updated successfully.');
                  setTimeout(() => setFlash(''), 3000);
                }}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition shadow-md"
              >
                Save Global Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ➕ Deploy Store Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="font-extrabold text-lg text-white mb-1">Deploy New Merchant Store</h3>
            <p className="text-xs text-slate-400 mb-6">
              Instant 1-click store provisioning without full onboarding form.
            </p>

            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Sweets & Bakers"
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={newStorePhone}
                  onChange={(e) => setNewStorePhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jaipur"
                  value={newStoreCity}
                  onChange={(e) => setNewStoreCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Industry Archetype
                </label>
                <select
                  value={newStoreArchetype}
                  onChange={(e) => setNewStoreArchetype(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                >
                  <option value="retail">Retail Store & Kirana</option>
                  <option value="service">Healthcare Clinic & Doctor</option>
                  <option value="b2b">B2B Manufacturing & Hardware</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowDeployModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeployStore}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
              >
                Provision Store Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
