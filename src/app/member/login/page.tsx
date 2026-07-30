'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, Phone, Eye, EyeOff, LogIn, Globe, MessageCircle } from 'lucide-react';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const tabVariants = {
    active: { backgroundColor: 'rgba(200, 164, 92, 0.2)', color: '#C8A45C' },
    inactive: { backgroundColor: 'transparent', color: '#9CA3AF' },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="light-ray" style={{ left: `${20 + i * 30}%`, animationDelay: `${i * 2}s` }} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-8 md:p-10">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="text-5xl mb-4"
            >
              ॐ
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-gradient">
              Brahm Divya Jeewan Jyoti
            </h1>
            <p className="text-text-muted mt-2 text-sm">
              {activeTab === 'login' ? 'Welcome back, seeker of divine light' : 'Begin your spiritual journey'}
            </p>
          </div>

          <div className="flex bg-white/5 rounded-xl p-1 mb-8">
            {(['login', 'register'] as const).map((tab) => (
              <motion.button
                key={tab}
                variants={tabVariants}
                animate={activeTab === tab ? 'active' : 'inactive'}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors"
              >
                {tab === 'login' ? 'Sign In' : 'Register'}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-secondary">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-secondary">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 accent-accent" />
                    <span className="text-text-muted">Remember me</span>
                  </label>
                  <Link href="/member/forgot-password" className="text-accent hover:text-accent-light transition-colors">
                    Forgot Password?
                  </Link>
                </div>

                <button className="btn-primary w-full justify-center">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-secondary">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-secondary">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-secondary">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="tel"
                      placeholder="+91-9876543210"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-secondary">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-secondary">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 py-3 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <label className="flex items-start gap-2 cursor-pointer text-sm">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 accent-accent mt-0.5" />
                  <span className="text-text-muted">
                    I accept the{' '}
                    <Link href="/terms" className="text-accent hover:text-accent-light">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy-policy" className="text-accent hover:text-accent-light">Privacy Policy</Link>
                  </span>
                </label>

                <button className="btn-primary w-full justify-center">
                  <User className="w-4 h-4" />
                  Create Account
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-bg-card px-4 text-text-muted">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-text-secondary hover:bg-white/5 hover:border-accent/30 transition-all text-sm">
              <Globe className="w-4 h-4" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-text-secondary hover:bg-white/5 hover:border-accent/30 transition-all text-sm">
              <MessageCircle className="w-4 h-4" />
              Facebook
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
