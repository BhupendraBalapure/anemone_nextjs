'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  Store,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  Building2,
  Phone,
  MapPin,
  Tag,
  Palette,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

const CATEGORIES = [
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
];

export default function OnboardingPage() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState('');
  const [websiteType, setWebsiteType] = useState('ecommerce'); // 'business_website', 'ecommerce', 'landing_page'
  const [businessCategory, setBusinessCategory] = useState(CATEGORIES[0]);
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);

  // Auto-calculated archetype & theme colors based on Laravel logic
  const getArchetypeInfo = () => {
    if (businessCategory.includes('Hotels')) return { code: 'hospitality', color: '#E11D48', theme: 'warm_artisan' };
    if (businessCategory.includes('Clinic') || businessCategory.includes('Doctor')) return { code: 'service', color: '#0284C7', theme: 'modern_clean' };
    if (businessCategory.includes('Manufacturers')) return { code: 'b2b', color: '#D97706', theme: 'bold_industrial' };
    if (businessCategory.includes('Restaurant')) return { code: 'food', color: '#EF4444', theme: 'warm_artisan' };
    return { code: 'retail', color: '#10B981', theme: 'modern_clean' };
  };

  const arch = getArchetypeInfo();

  const handleLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !phone.trim() || !city.trim()) {
      alert('Please fill Business Name, City, and Phone.');
      return;
    }

    setLoading(true);

    const baseSlug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      // Call server creation API
      await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          slug,
          category: businessCategory,
          websiteType,
          whatsappNumber: whatsappNumber || phone,
          city,
          primaryColor: arch.color,
        }),
      });

      setCreatedSlug(slug);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // ignore
      }
    } catch (e) {
      console.error(e);
      alert('Error creating store');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans">
      {/* 🧭 Header */}
      <header className="border-b border-slate-200 bg-white py-4 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm"
            style={{
              background: 'linear-gradient(135deg, #fb923c 0%, #f43f5e 35%, #9333ea 70%, #3b82f6 100%)',
            }}
          >
            A
          </div>
          <span className="font-extrabold text-xl text-slate-900 tracking-tight">Anemony</span>
        </Link>
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Zero Code &bull; 60-Second Instant Launch</span>
        </span>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl w-full mx-auto px-4 py-8 flex-1">
        {createdSlug ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              Congratulations! Your Store is Live 🎉
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
              <strong>{businessName}</strong> has been created with industry-specific default products,
              instant WhatsApp checkout, and your Merchant Studio.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto mb-8 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Storefront Address
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-purple-700 truncate">
                  /store/{createdSlug}
                </span>
                <Link
                  href={`/store/${createdSlug}`}
                  target="_blank"
                  className="bg-white border border-slate-300 hover:bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 transition flex items-center gap-1"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
              <Link
                href={`/store/${createdSlug}`}
                className="py-3 px-5 rounded-xl font-bold text-white text-xs shadow-md transition flex items-center justify-center gap-1.5"
                style={{ backgroundColor: arch.color }}
              >
                <Store className="w-4 h-4" />
                <span>Visit Storefront</span>
              </Link>
              <Link
                href={`/store/${createdSlug}/dashboard`}
                className="py-3 px-5 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <span>Merchant Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="mb-6">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
                Launch Your Business in 60 Seconds
              </h1>
              <p className="text-xs text-slate-500">
                Enter your shop or clinic details. Our engine auto-configures your theme and catalog.
              </p>
            </div>

            <form onSubmit={handleLaunch} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Business / Store Display Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swaroop Sweets, Dr. Verma Dental Clinic"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>

              {/* Website Type Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  What do you want to create?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'ecommerce', label: 'E-Commerce Store' },
                    { id: 'business_website', label: 'Business Website' },
                    { id: 'landing_page', label: '1-Page Promo Offer' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setWebsiteType(t.id)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition text-center ${
                        websiteType === t.id
                          ? 'border-purple-600 bg-purple-50 text-purple-700 ring-2 ring-purple-500/20'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Business Industry Category
                </label>
                <select
                  value={businessCategory}
                  onChange={(e) => setBusinessCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kanpur, Lucknow, Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (!whatsappNumber) setWhatsappNumber(e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Auto Recommended Preview Box */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Auto-Configured Engine
                  </span>
                  <div className="font-bold text-slate-800 capitalize mt-0.5">
                    {arch.code} Mode &bull; Theme: {arch.theme.replace('_', ' ')}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 inline-block"
                    style={{ backgroundColor: arch.color }}
                  />
                  <span className="font-mono text-[11px] font-bold text-slate-600">{arch.color}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-white text-xs shadow-md transition flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #f43f5e 0%, #9333ea 50%, #4f46e5 100%)',
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'Deploying Store...' : 'Launch Your Store Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        &copy; 2026 Anemony Digital Operating System. Built with Next.js 15 & Supabase.
      </footer>
    </div>
  );
}
