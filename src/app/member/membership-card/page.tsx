'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { formatDate, getStatusColor } from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';
import { CreditCard, Shield, Download, Check, Award, Calendar, Star, Brain, FileText } from 'lucide-react';

const benefits = [
  { icon: <Calendar className="w-4 h-4" />, text: 'Priority booking for all events' },
  { icon: <Star className="w-4 h-4" />, text: 'Exclusive members-only events' },
  { icon: <Brain className="w-4 h-4" />, text: 'Premium meditation resources' },
  { icon: <FileText className="w-4 h-4" />, text: 'Tax-exempt donation receipts' },
];

export default function MembershipCardPage() {
  const { user } = useAuthStore();
  const [flipped, setFlipped] = useState(false);

  const membershipColors: Record<string, string> = {
    basic: 'from-gray-600 to-gray-800',
    premium: 'from-amber-500 to-amber-800',
    lifetime: 'from-purple-500 to-purple-800',
  };

  const cardBg = user?.membershipType
    ? membershipColors[user.membershipType] || membershipColors.basic
    : membershipColors.basic;

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-bold">Digital Membership Card</h1>
          <p className="text-text-muted text-sm mt-2">Your divine connection pass</p>
        </div>

        <div className="flex justify-center mb-8" style={{ perspective: '1000px' }}>
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="relative w-full max-w-md cursor-pointer"
            style={{ transformStyle: 'preserve-3d', minHeight: '280px' }}
            onClick={() => setFlipped(!flipped)}
          >
            <div
              className={`absolute inset-0 rounded-2xl p-8 bg-gradient-to-br ${cardBg} text-white overflow-hidden`}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">ॐ</div>
                    <span className="text-sm font-medium opacity-80">BDJJ</span>
                  </div>
                  <CreditCard className="w-6 h-6 opacity-80" />
                </div>

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Member Name</p>
                  <p className="text-xl font-bold">{user?.name || 'Member'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Member ID</p>
                    <p className="text-sm font-mono">{user?.membershipId || 'BDJJ-000'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Expiry</p>
                    <p className="text-sm">{user?.membershipExpiry ? formatDate(user.membershipExpiry) : 'N/A'}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/20 capitalize">
                    {user?.membershipType || 'Basic'} Member
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`absolute inset-0 rounded-2xl p-8 bg-gradient-to-br ${cardBg} text-white overflow-hidden`}
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
                <p className="text-sm opacity-80">Scan for verification</p>
                <div className="bg-white rounded-xl p-3">
                  <QRCodeSVG
                    value={user?.membershipId || 'BDJJ-000'}
                    size={140}
                    bgColor="#ffffff"
                    fgColor="#1A1A2E"
                    level="H"
                  />
                </div>
                <p className="text-xs opacity-60">Tap card to flip</p>
              </div>
            </div>
          </motion.div>
        </div>

        <p className="text-center text-xs text-text-muted mb-8">
          Tap or click the card to flip and reveal your QR code
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-10"
        >
          <button className="btn-primary justify-center">
            <Download className="w-4 h-4" />
            Download Card
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-lg font-display font-semibold flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-accent" />
            Membership Benefits
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-sm text-text-secondary">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
