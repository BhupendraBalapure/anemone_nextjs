'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DEMO_USERS } from '@/lib/store-service';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Store,
  Sparkles,
  UserCheck,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 1-Click Demo Fill Handlers
  const fillCredentials = (role: 'super_admin' | 'sharma' | 'care' | 'bhupendra') => {
    setError('');
    if (role === 'super_admin') {
      setEmail('admin@anemony.in');
      setPassword('admin123');
    } else if (role === 'sharma') {
      setEmail('sharma@anemony.in');
      setPassword('password');
    } else if (role === 'care') {
      setEmail('care@anemony.in');
      setPassword('password');
    } else if (role === 'bhupendra') {
      setEmail('bhupendra@anemony.in');
      setPassword('password');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const user = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      setError('Invalid credentials. Use 1-Click Demo buttons below to login instantly.');
      setLoading(false);
      return;
    }

    // Role-based smart redirection matching Laravel v1.2.0
    if (user.role === 'super_admin') {
      router.push('/admin');
    } else if (user.email.includes('sharma')) {
      router.push('/store/sharma-kirana/dashboard');
    } else if (user.email.includes('care')) {
      router.push('/store/care-dental-clinic/dashboard');
    } else {
      router.push('/store/bhupendra-2011/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-800">
      {/* Top Navbar */}
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

        <Link
          href="/onboarding"
          className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 py-2 px-3.5 rounded-xl border border-purple-200 transition"
        >
          <span>Launch New Store</span>
        </Link>
      </header>

      {/* Login Card */}
      <main className="max-w-md w-full mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
              Sign in to Anemony OS
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Access your merchant studio or platform control center
            </p>
          </div>

          {/* ⚡ 1-Click Demo Fill Buttons */}
          <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>1-Click Quick Demo Login:</span>
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillCredentials('super_admin')}
                className="py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-1"
              >
                <span>👑 Super Admin</span>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('sharma')}
                className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-1"
              >
                <span>🏪 Sharma Kirana</span>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('care')}
                className="py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-1"
              >
                <span>🏥 Care Clinic</span>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('bhupendra')}
                className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-xs flex items-center justify-center gap-1"
              >
                <span>🛍️ Bhupendra Store</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="admin@anemony.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white text-xs shadow-md transition flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #9333ea 50%, #4f46e5 100%)',
              }}
            >
              <UserCheck className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        &copy; 2026 Anemony Digital Operating System. All rights reserved.
      </footer>
    </div>
  );
}
