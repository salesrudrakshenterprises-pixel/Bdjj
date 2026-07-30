'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { members } from '@/lib/data';
import { formatDate, getStatusColor } from '@/lib/utils';
import {
  Search, Filter, User, Mail, Phone, Edit, Eye, MessageSquare, MoreHorizontal, Users
} from 'lucide-react';

const membershipTypes = ['All', 'Basic', 'Premium', 'Lifetime'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function MembersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.membershipId?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || m.membershipType === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const isExpired = (expiry: string) => new Date(expiry) < new Date();

  return (
    <main className="min-h-screen bg-bg-primary px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <SectionHeading title="Members Management" centered={false} />
            <p className="text-text-secondary -mt-6">
              <Users className="inline h-4 w-4 mr-1" />
              Total Members: <span className="text-accent font-semibold">{members.length}</span>
            </p>
          </div>
          <GlowButton>
            <User className="h-4 w-4" />
            Add New Member
          </GlowButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or membership ID..."
              className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {membershipTypes.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === t
                    ? 'bg-accent text-[#1A1A2E]'
                    : 'bg-white/5 text-text-muted border border-accent/10 hover:border-accent/30'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="glass-card rounded-2xl overflow-hidden border border-accent/5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-accent/10 bg-accent/5">
                    <th className="text-left px-6 py-4 font-medium text-text-muted">Member</th>
                    <th className="text-left px-6 py-4 font-medium text-text-muted">Contact</th>
                    <th className="text-left px-6 py-4 font-medium text-text-muted">Membership</th>
                    <th className="text-left px-6 py-4 font-medium text-text-muted">ID</th>
                    <th className="text-left px-6 py-4 font-medium text-text-muted">Expiry</th>
                    <th className="text-left px-6 py-4 font-medium text-text-muted">Status</th>
                    <th className="text-right px-6 py-4 font-medium text-text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((m, i) => {
                    const expired = m.membershipExpiry ? isExpired(m.membershipExpiry) : false;
                    return (
                      <motion.tr
                        key={m.id}
                        variants={itemVariants}
                        className="border-b border-accent/5 last:border-0 hover:bg-accent/5 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent-light/10 text-accent text-xs font-bold">
                              {m.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium text-white">{m.name}</p>
                              <p className="text-xs text-text-muted">Joined {formatDate(m.joinedAt)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-text-secondary">
                              <Mail className="h-3 w-3" /> {m.email}
                            </div>
                            <div className="flex items-center gap-1.5 text-text-muted">
                              <Phone className="h-3 w-3" /> {m.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${getStatusColor(m.membershipType || 'basic')}`}>
                            {m.membershipType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-mono text-text-muted bg-white/5 px-2 py-1 rounded">
                            {m.membershipId}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-text-secondary text-xs">
                          {m.membershipExpiry ? formatDate(m.membershipExpiry) : '—'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1 text-xs font-medium ${expired ? 'text-red-400' : 'text-green-400'}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${expired ? 'bg-red-400' : 'bg-green-400'}`} />
                            {expired ? 'Expired' : 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right relative">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all" title="View">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all" title="Edit">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all" title="Message">
                              <MessageSquare className="h-4 w-4" />
                            </button>
                            <div className="relative">
                              <button
                                onClick={() => setOpenMenuId(openMenuId === m.id ? null : m.id)}
                                className="p-2 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                              {openMenuId === m.id && (
                                <div className="absolute right-0 top-full mt-1 z-10 w-36 rounded-xl bg-[#1E1E3A] border border-accent/20 shadow-xl py-2">
                                  <button className="w-full text-left px-4 py-2 text-xs text-text-secondary hover:bg-accent/10 hover:text-white transition-colors">View Profile</button>
                                  <button className="w-full text-left px-4 py-2 text-xs text-text-secondary hover:bg-accent/10 hover:text-white transition-colors">Send Email</button>
                                  <button className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors">Suspend</button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-text-muted mx-auto mb-3" />
                <p className="text-text-secondary">No members found</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
