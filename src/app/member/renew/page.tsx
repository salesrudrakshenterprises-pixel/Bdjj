'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { formatDate, formatCurrency, getStatusColor } from '@/lib/utils';
import { CreditCard, Shield, Crown, Check, Star, Zap } from 'lucide-react';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    period: 'Free',
    color: 'from-gray-500 to-gray-600',
    features: [
      'Access to free satsangs',
      'Daily blessings',
      'Basic meditation resources',
      'Community forum access',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 2501,
    period: '/yr',
    color: 'from-amber-400 to-amber-600',
    popular: true,
    features: [
      'Everything in Basic',
      'Priority event booking',
      'Exclusive workshops',
      'Premium meditation library',
      'Personalized guidance',
      'Donation receipts',
    ],
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: 25001,
    period: 'one-time',
    color: 'from-purple-400 to-purple-600',
    features: [
      'Everything in Premium',
      'Lifetime access to all content',
      'Lifetime event priority',
      'Founder member recognition',
      'Free retreat participation',
      'Exclusive Gurudev blessings',
    ],
  },
];

export default function RenewPage() {
  const { user } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });

  const currentPlan = user?.membershipType || 'basic';

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold">Renew Membership</h1>
          <p className="text-text-muted text-sm mt-2">Continue your spiritual journey with us</p>
        </div>

        {user?.membershipExpiry && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-5 mb-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-accent" />
              <div>
                <p className="text-sm text-text-muted">Current Membership</p>
                <p className="font-semibold capitalize">{user.membershipType || 'Basic'} - Expires {formatDate(user.membershipExpiry || '')}</p>
              </div>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full capitalize ${getStatusColor(user.membershipType || 'basic')}`}>
              {user.membershipType || 'Basic'}
            </span>
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedPlan(plan.id)}
              className={`glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 relative ${
                selectedPlan === plan.id
                  ? 'ring-2 ring-accent shadow-[0_20px_60px_rgba(200,164,92,0.15)]'
                  : 'hover:shadow-[0_20px_60px_rgba(200,164,92,0.1)]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-accent-light text-bg-primary text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white mb-4 ${
                plan.popular ? 'shadow-lg shadow-amber-500/30' : ''
              }`}>
                {plan.id === 'basic' ? <Shield className="w-6 h-6" /> :
                 plan.id === 'premium' ? <Star className="w-6 h-6" /> :
                 <Crown className="w-6 h-6" />}
              </div>

              <h3 className="text-lg font-display font-semibold mb-1">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price === 0 ? 'Free' : `₹${plan.price.toLocaleString('en-IN')}`}</span>
                {plan.period !== 'Free' && (
                  <span className="text-text-muted text-sm ml-1">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              {currentPlan === plan.id ? (
                <span className="block w-full text-center py-2.5 rounded-xl bg-accent/10 text-accent text-sm font-medium">
                  Current Plan
                </span>
              ) : (
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedPlan === plan.id
                      ? 'bg-accent text-bg-primary'
                      : 'border border-accent/30 text-accent hover:bg-accent/10'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select'}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {selectedPlan && selectedPlan !== 'basic' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 md:p-8 max-w-lg mx-auto"
          >
            <h2 className="text-lg font-display font-semibold flex items-center gap-2 mb-6">
              <CreditCard className="w-5 h-5 text-accent" />
              Payment Details
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-text-muted">Card Number</label>
                <input
                  value={cardForm.cardNumber}
                  onChange={(e) => setCardForm({ ...cardForm, cardNumber: e.target.value })}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 space-y-2">
                  <label className="block text-xs font-medium text-text-muted">Expiry</label>
                  <input
                    value={cardForm.expiry}
                    onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                  />
                </div>
                <div className="col-span-1 space-y-2">
                  <label className="block text-xs font-medium text-text-muted">CVV</label>
                  <input
                    type="password"
                    value={cardForm.cvv}
                    onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                    placeholder="123"
                    maxLength={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                  />
                </div>
                <div className="col-span-1 space-y-2">
                  <label className="block text-xs font-medium text-text-muted">Zap</label>
                  <input
                    value="BDJJ"
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary outline-none opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-text-muted">Name on Card</label>
                <input
                  value={cardForm.nameOnCard}
                  onChange={(e) => setCardForm({ ...cardForm, nameOnCard: e.target.value })}
                  placeholder="Full name as on card"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
                />
              </div>

              <div className="flex items-center justify-between py-3 border-t border-white/10 mt-4">
                <span className="text-text-muted text-sm">Total Amount</span>
                <span className="text-xl font-bold text-accent">
                  {formatCurrency(plans.find(p => p.id === selectedPlan)?.price || 0)}
                </span>
              </div>

              <button className="btn-primary w-full justify-center text-base">
                <Zap className="w-4 h-4" />
                Pay & Renew
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
