'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Share2, Heart, Calendar, MapPin, ArrowRight, UserPlus, Globe } from 'lucide-react';
import { events } from '@/lib/data';
import { formatDate } from '@/lib/utils';

const guidelines = [
  'Practice love and compassion in all interactions',
  'Respect diverse spiritual paths and beliefs',
  'Maintain confidentiality of shared experiences',
  'Focus on growth, not judgment',
  'Support fellow members on their journey',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CommunityPage() {
  return (
    <div className="app-content">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-1"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="pt-2 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-display text-text-primary">Community</h1>
              <p className="text-sm text-text-muted flex items-center gap-1.5 mt-0.5">
                <Users className="w-3.5 h-3.5" />
                12.4K members
              </p>
            </div>
            <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-accent" />
            </div>
          </div>
        </motion.div>

        {/* Join CTA */}
        <motion.div variants={itemVariants}>
          <div className="hero-card hero-gradient p-6 text-white">
            <Heart className="w-8 h-8 text-white/60 mb-3" />
            <h2 className="text-xl font-bold font-display mb-1">Join Our Community</h2>
            <p className="text-sm text-white/80 mb-4 max-w-xs">
              Connect with fellow seekers on the path to divine light and inner peace.
            </p>
            <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-5 py-2.5 rounded-full text-sm">
              <UserPlus className="w-4 h-4" />
              Join Now
            </button>
          </div>
        </motion.div>

        {/* Upcoming Gatherings */}
        <motion.div variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">Upcoming Gatherings</h2>
            <Link href="/events" className="section-action">
              See All <ArrowRight className="w-3.5 h-3.5 inline" />
            </Link>
          </div>
          <div className="space-y-3">
            {events.slice(0, 2).map((event) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <div className="app-card p-4 flex gap-3 items-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-accent leading-tight">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-[9px] font-semibold text-accent uppercase tracking-wider">
                      {new Date(event.date).toLocaleString('en', { month: 'short' })}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary truncate">{event.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.mode}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Community Guidelines */}
        <motion.div variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">Community Guidelines</h2>
          </div>
          <div className="app-card p-5 space-y-3">
            {guidelines.map((g, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Heart className="w-2.5 h-2.5 text-accent" />
                </div>
                <span className="text-sm text-text-secondary leading-relaxed">{g}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Share & Connect */}
        <motion.div variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">Share & Connect</h2>
          </div>
          <div className="app-card p-5">
            <p className="text-sm text-text-secondary mb-4">
              Spread the light and invite others to join our spiritual community.
            </p>
            <div className="flex gap-3">
              {[
                { icon: MessageCircle, label: 'WhatsApp', color: 'bg-green-500' },
                { icon: Share2, label: 'Share', color: 'bg-blue-500' },
                { icon: Heart, label: 'Invite', color: 'bg-red-400' },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.label}
                    className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl ${s.color} bg-opacity-10`}
                  >
                    <div className={`w-9 h-9 rounded-full ${s.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[11px] font-semibold text-text-primary">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Invite Friends */}
        <motion.div variants={itemVariants} className="pb-4">
          <button className="btn-primary-app btn-app w-full">
            <UserPlus className="w-5 h-5" />
            Invite Friends
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ClockIcon(props: any) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}

function ChevronRight(props: any) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
}
