'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Stethoscope,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Phone,
  MessageSquare,
  Headphones,
  Globe,
  Zap,
  MapPin,
  Lock,
  UserCheck,
} from 'lucide-react';

export default function WelcomePage() {
  const [activeTab, setActiveTab] = useState<'retail' | 'clinic' | 'b2b'>('retail');

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-purple-600 selection:text-white">
      {/* 🌐 1. Top Announcement Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2.5 px-4 border-b border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              v1.2.0 Active
            </span>
            <span className="text-slate-300 font-medium">
              India&apos;s Smartest No-Code Operating System for MSMEs &bull; Web + WhatsApp + Google Maps
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Headphones className="w-3.5 h-3.5 text-rose-400" />
              <span>Support: +91 95792 14456</span>
            </span>
            <span className="text-slate-700">|</span>
            <Link
              href="/onboarding"
              className="text-rose-400 font-semibold hover:text-amber-400 flex items-center gap-1 transition"
            >
              <span>Launch Store Free</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* 🧭 2. Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo with Cosmic Swirl */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform"
              style={{
                background: 'linear-gradient(135deg, #fb923c 0%, #f43f5e 35%, #9333ea 70%, #3b82f6 100%)',
              }}
            >
              A
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">Anemony</span>
                <span className="bg-purple-100 text-purple-700 font-bold text-[10px] px-2 py-0.5 rounded-full">
                  MSME OS
                </span>
              </div>
              <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                Digital Operating System
              </p>
            </div>
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#solutions" className="hover:text-purple-600 transition">
              Solutions
            </a>
            <a href="#demos" className="hover:text-purple-600 transition">
              Live Storefronts
            </a>
            <a href="#features" className="hover:text-purple-600 transition">
              Features
            </a>
            <Link href="/admin" className="text-purple-700 font-bold hover:text-purple-900 transition flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Super Admin</span>
            </Link>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-purple-600 bg-slate-100 hover:bg-slate-200 py-2.5 px-4 rounded-xl transition"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>

            <Link
              href="/onboarding"
              className="text-white text-xs font-extrabold py-2.5 px-5 rounded-xl shadow-md transition hover:opacity-95 flex items-center gap-1.5"
              style={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #9333ea 50%, #4f46e5 100%)',
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Store in 60s</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 🚀 3. Hero Section with Cosmic Glow */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 bg-radial from-purple-50/50 via-rose-50/20 to-white">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-purple-200 text-purple-700 font-bold text-xs shadow-xs mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Built for Indian Retailers, Doctors, and B2B Factories</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.12] mb-6">
            Transform Your Dukaan & Clinic into a{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #f43f5e 0%, #9333ea 50%, #2563eb 100%)',
              }}
            >
              Digital Powerhouse
            </span>{' '}
            in 60 Seconds
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            No coding required. Instant WhatsApp orders, automated catalog seeding, clinic appointment
            booking, and Google Local SEO built directly into a unified Next.js + Supabase engine.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto text-white font-extrabold text-sm py-4 px-8 rounded-2xl shadow-xl transition flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #9333ea 50%, #4f46e5 100%)',
              }}
            >
              <Sparkles className="w-5 h-5" />
              <span>Launch Your Store Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#demos"
              className="w-full sm:w-auto bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-sm py-4 px-8 rounded-2xl shadow-xs transition flex items-center justify-center gap-2"
            >
              <span>Explore Live Storefronts</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Trust Authority Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-200/80">
            <div>
              <div className="font-black text-2xl text-slate-900">7,000+</div>
              <div className="text-xs text-slate-500 font-medium">MSMEs Transformed</div>
            </div>
            <div>
              <div className="font-black text-2xl text-slate-900">₹4.8 Cr+</div>
              <div className="text-xs text-slate-500 font-medium">Monthly GMV</div>
            </div>
            <div>
              <div className="font-black text-2xl text-slate-900">60 Sec</div>
              <div className="text-xs text-slate-500 font-medium">Instant Provisioning</div>
            </div>
            <div>
              <div className="font-black text-2xl text-emerald-600">Zero Code</div>
              <div className="text-xs text-slate-500 font-medium">WhatsApp Native</div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏬 4. Live Multi-Industry Demos */}
      <section id="demos" className="py-20 px-4 sm:px-6 bg-slate-50/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 block mb-1">
              Live Showcase
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              One Engine. Three Tailored Experiences.
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Anemony automatically morphs its catalog, cart, and CTA behavior based on the merchant&apos;s industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Demo 1: Retail Store */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <ShoppingBag className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    Retail Mode
                  </span>
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 mb-1">
                  Sharma Kirana & General Store
                </h3>
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Kanpur &bull; Groceries & Essentials</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Slide-over cart drawer, quantity controls, coupon discount engine, and 1-click WhatsApp order.
                </p>
              </div>
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <Link
                  href="/store/sharma-kirana"
                  className="flex-1 py-2 px-3 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition"
                >
                  Storefront
                </Link>
                <Link
                  href="/store/sharma-kirana/dashboard"
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Admin
                </Link>
              </div>
            </div>

            {/* Demo 2: Clinic */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                    <Stethoscope className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">
                    Clinic Mode
                  </span>
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 mb-1">
                  Care Dental & Implant Centre
                </h3>
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Lucknow &bull; Dr. R. K. Verma, MDS</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Doctor credentials, consulting hours, and interactive &ldquo;Book Appointment Slot&rdquo; modal.
                </p>
              </div>
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <Link
                  href="/store/care-dental-clinic"
                  className="flex-1 py-2 px-3 text-center bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl transition"
                >
                  Storefront
                </Link>
                <Link
                  href="/store/care-dental-clinic/dashboard"
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Admin
                </Link>
              </div>
            </div>

            {/* Demo 3: B2B */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                    B2B RFQ Mode
                  </span>
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 mb-1">
                  Apex Steel Craft & Industrial
                </h3>
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Faridabad &bull; Fasteners & Pallets</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Minimum Order Quantity (MOQ) displays, technical specs, and interactive Request For Quote modal.
                </p>
              </div>
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <Link
                  href="/store/apex-steel-craft"
                  className="flex-1 py-2 px-3 text-center bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition"
                >
                  Storefront
                </Link>
                <Link
                  href="/store/apex-steel-craft/dashboard"
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Admin
                </Link>
              </div>
            </div>

            {/* Demo 4: Bhupendra Store */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between ring-2 ring-blue-500/20">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    Live Active
                  </span>
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 mb-1">
                  Bhupendra Store
                </h3>
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Mumbai &bull; Handcrafted Lifestyle</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Handcrafted teapots, stoneware mugs, coupon discount engine, and live merchant control studio.
                </p>
              </div>
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <Link
                  href="/store/bhupendra-2011"
                  className="flex-1 py-2 px-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition"
                >
                  Storefront
                </Link>
                <Link
                  href="/store/bhupendra-2011/dashboard"
                  className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 5. Interactive Industry Solutions Tabs */}
      <section id="solutions" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 block mb-1">
            Built for Your Industry
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Engineered Specifically for MSME Workflows
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('retail')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'retail'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Retail & Kirana</span>
          </button>

          <button
            onClick={() => setActiveTab('clinic')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'clinic'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Clinics & Doctors</span>
          </button>

          <button
            onClick={() => setActiveTab('b2b')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'b2b'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>B2B & Manufacturing</span>
          </button>
        </div>

        {/* Active Tab Panel */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-xs">
          {activeTab === 'retail' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-bold text-sm text-slate-900 mb-1">Instant WhatsApp Cart</h4>
                <p className="text-xs text-slate-500">
                  Customers pick items and send an organized, itemized bill directly to your shop WhatsApp.
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-bold text-sm text-slate-900 mb-1">Delivery Radius & COD</h4>
                <p className="text-xs text-slate-500">
                  Set minimum order amounts, free delivery thresholds, and accept Cash On Delivery safely.
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-bold text-sm text-slate-900 mb-1">Promo Coupons</h4>
                <p className="text-xs text-slate-500">
                  Run festive campaigns with percentage or flat discounts with minimum cart value validation.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'clinic' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-sky-600 mb-2" />
                <h4 className="font-bold text-sm text-slate-900 mb-1">OPD Slot Reservation</h4>
                <p className="text-xs text-slate-500">
                  Patients select date and consultation time slots directly with instant clinic confirmation.
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-sky-600 mb-2" />
                <h4 className="font-bold text-sm text-slate-900 mb-1">Doctor Profiles & Fees</h4>
                <p className="text-xs text-slate-500">
                  Showcase degrees, experience, sterilization standards, and transparent treatment pricing.
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-sky-600 mb-2" />
                <h4 className="font-bold text-sm text-slate-900 mb-1">Tele-Consultation Ready</h4>
                <p className="text-xs text-slate-500">
                  Offer remote video consultations with direct UPI fee collection before the call.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'b2b' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-amber-600 mb-2" />
                <h4 className="font-bold text-sm text-slate-900 mb-1">Request For Quote (RFQ)</h4>
                <p className="text-xs text-slate-500">
                  Buyers submit custom batch inquiries with corporate details and drawing attachments.
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-amber-600 mb-2" />
                <h4 className="font-bold text-sm text-slate-900 mb-1">MOQ Enforcement</h4>
                <p className="text-xs text-slate-500">
                  Define wholesale batch sizes and tiered pricing for volume B2B purchases.
                </p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-amber-600 mb-2" />
                <h4 className="font-bold text-sm text-slate-900 mb-1">ISO & GST Compliance</h4>
                <p className="text-xs text-slate-500">
                  Display certifications, tax details, and company registration for corporate buyer trust.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 💬 Floating WhatsApp Widget */}
      <a
        href="https://wa.me/919579214456?text=Hi%20Anemony%20Team%2C%20I%20want%20to%20launch%20my%20store"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl transition hover:scale-110 flex items-center justify-center"
        aria-label="WhatsApp Support"
      >
        <MessageSquare className="w-6 h-6" />
      </a>

      {/* 🦶 Footer */}
      <footer className="border-t border-slate-200 py-10 px-4 sm:px-6 bg-slate-900 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-white text-base">Anemony</span>
            <span>&bull; India&apos;s MSME Digital Operating System</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-white transition">
              Sign In
            </Link>
            <Link href="/admin" className="hover:text-white transition">
              Super Admin
            </Link>
            <Link href="/onboarding" className="hover:text-white transition">
              Launch Store
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
