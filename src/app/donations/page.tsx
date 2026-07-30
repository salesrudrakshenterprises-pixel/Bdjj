'use client';

import { motion } from 'framer-motion';
import { Heart, Shield, Gift, CreditCard, Banknote, Wallet, Check, Info } from 'lucide-react';
import { useState } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { donations } from '@/lib/data';
import { formatDate, formatCurrency } from '@/lib/utils';

const presetAmounts = [501, 1001, 2501, 5001, 11000, 25000];
const donationPurposes = [
  'General Donation',
  'Ashram Development',
  'Education for Children',
  'Food Distribution',
  'Temple Construction',
];
const recentDonations = donations.filter((d) => d.status === 'completed');

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DonationsPage() {
  const [amount, setAmount] = useState<number>(1001);
  const [customAmount, setCustomAmount] = useState('');
  const [purpose, setPurpose] = useState(donationPurposes[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  return (
    <main className="min-h-screen bg-bg-primary">
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary via-bg-primary to-bg-primary" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center"
          >
            <Heart className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-heading mb-4"
          >
            Support Our Mission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="section-subtitle mx-auto"
          >
            Your generosity helps us spread spiritual light and serve humanity
          </motion.p>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-8"
          >
            <AnimatedCard delay={0}>
              <h2 className="text-xl font-bold font-display mb-6">Choose Amount</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setAmount(amt); setCustomAmount(''); }}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                      amount === amt && !customAmount
                        ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20'
                        : 'bg-bg-card text-text-primary border-accent/20 hover:border-accent/50'
                    }`}
                  >
                    {formatCurrency(amt)}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm font-semibold">&#8377;</span>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-accent/20 bg-bg-card text-text-primary outline-none focus:border-accent transition-colors"
                />
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.1}>
              <h2 className="text-xl font-bold font-display mb-6">Donation Purpose</h2>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-bg-card text-text-primary outline-none focus:border-accent transition-colors"
              >
                {donationPurposes.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <h2 className="text-xl font-bold font-display mb-6">Donor Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-bg-card text-text-primary outline-none focus:border-accent transition-colors"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-bg-card text-text-primary outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-bg-card text-text-primary outline-none focus:border-accent transition-colors"
                  />
                </div>
                <textarea
                  placeholder="Message (optional)"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-bg-card text-text-primary outline-none focus:border-accent transition-colors resize-none"
                />
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="w-5 h-5 rounded border-accent/30 text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-text-secondary">Keep my donation anonymous</span>
                </label>
              </div>
            </AnimatedCard>

            <motion.div variants={itemVariants} className="text-center">
              <GlowButton size="lg" className="w-full sm:w-auto">
                <Heart className="w-5 h-5" /> Donate Now
                {amount > 0 && !customAmount ? ` - ${formatCurrency(amount)}` : ''}
              </GlowButton>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <AnimatedCard delay={0}>
              <h2 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-accent" /> Payment Methods
              </h2>
              <div className="space-y-3">
                {[
                  { icon: <Wallet className="w-5 h-5" />, label: 'UPI (GPay, PhonePe, Paytm)' },
                  { icon: <CreditCard className="w-5 h-5" />, label: 'Credit / Debit Card' },
                  { icon: <Banknote className="w-5 h-5" />, label: 'Net Banking' },
                  { icon: <Wallet className="w-5 h-5" />, label: 'Mobile Wallet' },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-bg-secondary text-text-secondary">
                    <span className="text-accent">{m.icon}</span>
                    <span className="text-sm">{m.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.1}>
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold font-display mb-2">Tax Benefits (80G)</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    All donations to Brahm Divya Jeewan Jyoti are eligible for tax exemption under Section 80G of the Income Tax Act. You will receive a tax receipt via email.
                  </p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.15}>
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold font-display mb-2">Secure Donation</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Your payment information is encrypted and securely processed. We do not store your card details.
                  </p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <h2 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
                <Gift className="w-5 h-5 text-accent" /> Recent Donations
              </h2>
              <div className="space-y-4">
                {recentDonations.map((d) => (
                  <div key={d.id} className="flex items-start gap-3 p-3 rounded-xl bg-bg-secondary">
                    <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{d.anonymous ? 'Anonymous' : d.donorName}</p>
                      <p className="text-xs text-text-muted">{d.purpose}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-text-muted">{formatDate(d.date)}</span>
                        <span className="text-sm font-semibold text-accent">{formatCurrency(d.amount)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
