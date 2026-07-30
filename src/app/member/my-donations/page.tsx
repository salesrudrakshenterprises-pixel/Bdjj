'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { donations } from '@/lib/data';
import { formatDate, formatCurrency, getStatusColor } from '@/lib/utils';
import { Heart, Download, Filter, ArrowRight, Clock, Search } from 'lucide-react';

const filterTabs = ['All', 'Completed', 'Pending', 'Failed'] as const;
type FilterTab = (typeof filterTabs)[number];

export default function MyDonationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');

  const userDonations = donations.filter((d) => d.userId);

  const filteredDonations = userDonations.filter((d) => {
    if (activeFilter === 'All') return true;
    return d.status === activeFilter.toLowerCase();
  });

  const totalDonated = userDonations.reduce((sum, d) => sum + d.amount, 0);
  const lastDonation = userDonations.length > 0
    ? userDonations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    : null;

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">My Donations</h1>
            <p className="text-text-muted text-sm mt-1">Your generous contributions</p>
          </div>
          <Link href="/donations" className="btn-primary">
            <Heart className="w-4 h-4" />
            Make a Donation
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-5 text-center"
          >
            <p className="text-2xl font-bold text-accent">{formatCurrency(totalDonated)}</p>
            <p className="text-xs text-text-muted mt-1">Total Donated</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="glass-card rounded-2xl p-5 text-center"
          >
            <p className="text-2xl font-bold text-text-primary">{userDonations.length}</p>
            <p className="text-xs text-text-muted mt-1">Donations</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-5 text-center"
          >
            <p className="text-2xl font-bold text-text-primary">
              {lastDonation ? formatDate(lastDonation.date) : 'N/A'}
            </p>
            <p className="text-xs text-text-muted mt-1">Last Donation</p>
          </motion.div>
        </div>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === tab
                  ? 'bg-accent text-bg-primary'
                  : 'bg-white/5 text-text-muted hover:bg-white/10'
              }`}
            >
              {tab === 'All' ? 'All Donations' : tab}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredDonations.length > 0 ? (
            filteredDonations.map((donation, i) => (
              <motion.div
                key={donation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{donation.purpose}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-text-muted">{formatDate(donation.date)}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getStatusColor(donation.status)}`}>
                        {donation.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:text-right">
                  <span className="text-lg font-bold text-accent">{formatCurrency(donation.amount)}</span>
                  {donation.receiptUrl && (
                    <button className="text-accent hover:text-accent-light transition-colors" title="Download Receipt">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="glass-card rounded-2xl p-10 text-center">
              <Heart className="w-10 h-10 text-text-muted mx-auto mb-3" />
              <p className="text-text-muted">No donations found</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
