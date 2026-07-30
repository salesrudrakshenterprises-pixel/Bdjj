'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles, Calendar, Brain, Heart, Quote, Play,
  ArrowRight, Sun, Clock, Users, Star
} from 'lucide-react';
import { events } from '@/lib/data';
import { formatDate } from '@/lib/utils';

const quickActions = [
  { icon: Calendar, label: 'Events', href: '/events', color: '#C89B3C' },
  { icon: Brain, label: 'Meditate', href: '/meditate', color: '#7C5CFC' },
  { icon: Heart, label: 'Donate', href: '/donations', color: '#E87A2F' },
  { icon: Sun, label: 'Blessings', href: '/blessings', color: '#C89B3C' },
  { icon: Users, label: 'Community', href: '/community', color: '#7C5CFC' },
  { icon: Star, label: 'Gallery', href: '/gallery', color: '#E87A2F' },
];

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } }
};

function Skeleton() {
  return (
    <div className="space-y-4 pt-2">
      {[200, 130, 90, 170, 120].map((h, i) => (
        <div key={i} className="shimmer" style={{ height: h }} />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Skeleton />;

  return (
    <div className="pb-8">
      {/* Hero */}
      <motion.div {...fadeUp} className="relative overflow-hidden rounded-[24px] min-h-[220px] p-6 mb-5"
        style={{ background: 'linear-gradient(135deg, #C89B3C 0%, #D4A84B 40%, #E8D5A3 100%)' }}
      >
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles size={12} className="text-white/80" />
              <span className="text-[11px] font-semibold text-white/80 tracking-wider uppercase">Today's Blessing</span>
            </div>
            <h1 className="font-display text-3xl text-white leading-[1.15] font-bold tracking-tight">
              Find Peace<br />Within
            </h1>
            <p className="text-white/80 text-sm mt-2 max-w-[200px] leading-relaxed">
              Begin your journey to inner peace and divine connection
            </p>
          </div>
          <div className="mt-5">
            <Link href="/blessings"
              className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-white/30 transition-all active:scale-95"
            >
              Receive Blessing <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        {/* Decorative OM */}
        <div className="absolute -right-6 -top-6 text-white/10">
          <span style={{ fontSize: 120, fontFamily: 'serif', fontWeight: 700 }}>ॐ</span>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.4 }}>
        <div className="grid grid-cols-6 gap-2.5 mb-6">
          {quickActions.map((item) => (
            <Link key={item.href} href={item.href}
              className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl transition-all active:scale-90"
              style={{ background: `color-mix(in srgb, ${item.color} 8%, transparent)` }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: `color-mix(in srgb, ${item.color} 15%, transparent)` }}
              >
                <item.icon size={16} style={{ color: item.color }} />
              </div>
              <span className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Daily Blessing Card */}
      <motion.div {...fadeUp} transition={{ delay: 0.15, duration: 0.4 }}>
        <div className="card p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} style={{ color: '#C89B3C' }} />
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: '#C89B3C' }}>Daily Blessing</span>
          </div>
          <h3 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>The Light Within</h3>
          <p className="text-sm leading-relaxed mb-3 italic" style={{ color: 'var(--text-secondary)' }}>
            "Just as a lamp dispels darkness, the divine light within illuminates your true path."
          </p>
          <div style={{ height: 1, background: 'var(--border)', marginBottom: 12 }} />
          <Link href="/blessings" className="text-sm font-semibold flex items-center gap-1" style={{ color: '#C89B3C' }}>
            Read full blessing <ArrowRight size={13} />
          </Link>
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.4 }}>
        <div className="section-header">
          <h2 className="section-title">Upcoming Events</h2>
          <Link href="/events" className="section-link">See All</Link>
        </div>
        <div className="scroll-x pb-2 mb-5">
          {events.slice(0, 3).map((event) => (
            <Link key={event.id} href="/events" className="card p-4" style={{ width: 250 }}>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(200,155,60,0.1)', color: '#C89B3C' }}>
                  {event.type}
                </span>
                {event.price === 0 && (
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(124,92,252,0.1)', color: '#7C5CFC' }}>
                    Free
                  </span>
                )}
              </div>
              <h4 className="font-semibold text-sm mb-2 leading-snug">{event.title}</h4>
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar size={11} style={{ color: 'var(--text-muted)' }} />
                <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={11} style={{ color: 'var(--text-muted)' }} />
                <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{event.time}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Today's Mantra */}
      <motion.div {...fadeUp} transition={{ delay: 0.25, duration: 0.4 }}>
        <div className="card p-6 mb-5 text-center" style={{ background: 'var(--card-alt)' }}>
          <Quote size={18} style={{ color: '#C89B3C', opacity: 0.4, marginBottom: 8 }} />
          <p className="font-display text-lg font-bold mb-2 leading-relaxed" style={{ color: 'var(--text)' }}>
            Om Bhur Bhuvah Swah
          </p>
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
            Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat
          </p>
          <p className="text-2xl mb-3" style={{ color: 'var(--text-muted)' }}>ॐ</p>
          <span className="text-[11px] font-medium" style={{ color: '#C89B3C' }}>Gayatri Mantra — Chant with devotion</span>
        </div>
      </motion.div>

      {/* Guru's Message */}
      <motion.div {...fadeUp} transition={{ delay: 0.3, duration: 0.4 }}>
        <div className="section-header">
          <h2 className="section-title">Gurudev's Wisdom</h2>
        </div>
        <div className="card p-5 mb-5" style={{ borderLeft: '3px solid #C89B3C', borderRadius: 20 }}>
          <p className="text-sm leading-relaxed italic mb-4" style={{ color: 'var(--text-secondary)' }}>
            "The divine light that you seek outside is already shining within your heart. Turn your gaze inward, and you will find the eternal peace that has always been waiting for you."
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>— Gurudev</span>
            <Link href="/gurudev" className="text-[12px] font-semibold flex items-center gap-1" style={{ color: '#C89B3C' }}>
              Read More <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Meditation CTA */}
      <motion.div {...fadeUp} transition={{ delay: 0.35, duration: 0.4 }}>
        <div className="card p-6 mb-5 text-white" style={{ background: 'linear-gradient(135deg, #1A1A1E 0%, #2A2A2E 100%)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Brain size={16} className="text-white/70" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Daily Practice</span>
          </div>
          <h3 className="font-display text-2xl font-bold mb-1">Daily Meditation</h3>
          <p className="text-white/60 text-sm mb-5">5 min • Guided • Calm your mind</p>
          <Link href="/meditate"
            className="inline-flex items-center gap-2 bg-[#C89B3C] text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#B8892C] transition-all active:scale-95 shadow-lg"
            style={{ boxShadow: '0 4px 16px rgba(200,155,60,0.3)' }}
          >
            <Play size={14} fill="white" /> Start Session
          </Link>
        </div>
      </motion.div>

      {/* Videos */}
      <motion.div {...fadeUp} transition={{ delay: 0.4, duration: 0.4 }}>
        <div className="section-header">
          <h2 className="section-title">Latest Videos</h2>
          <Link href="/gallery" className="section-link">See All</Link>
        </div>
        <div className="scroll-x pb-2 mb-5">
          {['Morning Satsang', 'Guided Meditation', 'Divine Discourse'].map((title, i) => (
            <div key={i} className="card" style={{ width: 200 }}>
              <div className="relative h-[120px] flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, #2A2A2E, #3A3A3E)` }}
              >
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <Play size={16} fill="white" style={{ color: 'white', marginLeft: 2 }} />
                </div>
              </div>
              <div className="p-3">
                <h4 className="text-xs font-semibold">{title}</h4>
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>45:00</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Donation */}
      <motion.div {...fadeUp} transition={{ delay: 0.45, duration: 0.4 }}>
        <div className="card p-5 mb-5 flex items-center justify-between" style={{ background: 'rgba(200,155,60,0.05)' }}>
          <div>
            <h3 className="font-semibold text-base mb-1">Support Our Mission</h3>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Help us spread divine wisdom</p>
          </div>
          <Link href="/donations"
            className="inline-flex items-center gap-1.5 bg-[#C89B3C] text-white text-sm font-semibold px-5 py-2.5 rounded-full active:scale-95 transition-all"
          >
            <Heart size={13} /> Donate
          </Link>
        </div>
      </motion.div>

      <div className="h-6" />
    </div>
  );
}
