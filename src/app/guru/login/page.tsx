'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { GlowButton } from '@/components/shared/GlowButton';
import { Lock, Shield, User, Eye, EyeOff } from 'lucide-react';

export default function GuruLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <main className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F0F1A]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,164,92,0.15)_0%,_transparent_70%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-divine/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-8 md:p-10 border border-accent/10 shadow-[0_20px_60px_rgba(200,164,92,0.1)]">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light shadow-xl"
            >
              <Shield className="h-10 w-10 text-[#1A1A2E]" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="font-display text-2xl font-bold text-white"
            >
              Guru Portal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-2 text-sm text-text-muted"
            >
              Sign in to manage your spiritual domain
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-text-secondary">Email Address</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gurudev@bdjj.org"
                  className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-text-secondary">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 pl-11 pr-11 text-sm text-white placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-text-muted">
                <input type="checkbox" className="rounded border-accent/30 bg-white/5 accent-accent" />
                Remember me
              </label>
              <Link href="#" className="text-accent hover:text-accent-light transition-colors">
                Forgot Password?
              </Link>
            </div>

            <GlowButton type="submit" loading={loading} className="w-full" size="lg">
              <Lock className="h-4 w-4" />
              Sign In
            </GlowButton>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mt-8 rounded-xl bg-accent/5 border border-accent/10 p-4"
          >
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-accent">SECURE ACCESS</p>
                <p className="mt-1 text-xs text-text-muted leading-relaxed">
                  This portal is for authorized administrators only. All access is monitored
                  and logged. Unauthorized access attempts will be recorded.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="mt-6 text-center text-xs text-text-muted"
          >
            By signing in, you agree to the{' '}
            <Link href="#" className="text-accent hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="#" className="text-accent hover:underline">Privacy Policy</Link>
          </motion.p>
        </div>
      </motion.div>
    </main>
  );
}
