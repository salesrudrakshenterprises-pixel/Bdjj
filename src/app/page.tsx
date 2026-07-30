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

const GOLD = '#C89B3C';

const quickActions = [
  { icon: Calendar, label: 'Events', href: '/events', color: GOLD },
  { icon: Brain, label: 'Meditate', href: '/meditate', color: '#7C5CFC' },
  { icon: Heart, label: 'Donate', href: '/donations', color: '#E87A2F' },
  { icon: Sun, label: 'Blessings', href: '/blessings', color: GOLD },
  { icon: Users, label: 'Community', href: '/community', color: '#7C5CFC' },
  { icon: Star, label: 'Gallery', href: '/gallery', color: '#E87A2F' },
];

function SkeletonBlock({ h }: { h: number }) {
  return <div className="shimmer" style={{ height: h }} />;
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 pt-2">
        <SkeletonBlock h={200} />
        <SkeletonBlock h={90} />
        <SkeletonBlock h={130} />
        <SkeletonBlock h={170} />
        <SkeletonBlock h={120} />
        <SkeletonBlock h={100} />
      </div>
    );
  }

  return (
    <div className="pb-8">
      {/* Hero */}
      <div
        className="relative overflow-hidden rounded-[24px] min-h-[220px] p-6 mb-5"
        style={{ background: 'linear-gradient(135deg, #C89B3C 0%, #D4A84B 40%, #E8D5A3 100%)' }}
      >
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles size={12} color="rgba(255,255,255,0.8)" />
              <span className="text-[11px] font-semibold text-white/80 tracking-wider uppercase">
                Today&apos;s Blessing
              </span>
            </div>
            <h1 className="font-display text-3xl text-white leading-[1.15] font-bold tracking-tight">
              Find Peace<br />Within
            </h1>
            <p className="text-white/70 text-sm mt-2 max-w-[200px] leading-relaxed">
              Begin your journey to inner peace and divine connection
            </p>
          </div>
          <div className="mt-5">
            <Link
              href="/blessings"
              className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-white/30 transition-all active:scale-95"
            >
              Receive Blessing <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        <div className="absolute -right-6 -top-6 text-white/10">
          <span style={{ fontSize: 120, fontFamily: 'serif', fontWeight: 700 }}>&#x0950;</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-6 gap-2.5 mb-6">
        {quickActions.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl transition-all active:scale-90"
            style={{ background: `${item.color}14` }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: `${item.color}26` }}
            >
              <item.icon size={16} color={item.color} />
            </div>
            <span className="text-[10px] font-medium" style={{ color: '#6B6B72' }}>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Daily Blessing */}
      <div className="card p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} color={GOLD} />
          <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: GOLD }}>
            Daily Blessing
          </span>
        </div>
        <h3 className="font-display text-xl font-bold mb-2" style={{ color: '#1A1A1E' }}>
          The Light Within
        </h3>
        <p className="text-sm leading-relaxed mb-3 italic" style={{ color: '#6B6B72' }}>
          &ldquo;Just as a lamp dispels darkness, the divine light within illuminates your true path.&rdquo;
        </p>
        <div className="h-px mb-3" style={{ background: 'rgba(0,0,0,0.06)' }} />
        <Link
          href="/blessings"
          className="text-sm font-semibold flex items-center gap-1"
          style={{ color: GOLD }}
        >
          Read full blessing <ArrowRight size={13} />
        </Link>
      </div>

      {/* Upcoming Events */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[17px] font-bold tracking-tight" style={{ color: '#1A1A1E' }}>
          Upcoming Events
        </h2>
        <Link
          href="/events"
          className="text-[13px] font-semibold px-2 py-1 rounded-lg active:opacity-60"
          style={{ color: GOLD }}
        >
          See All
        </Link>
      </div>
      <div className="scroll-x pb-2 mb-5">
        {events.slice(0, 3).map((event) => (
          <Link
            key={event.id}
            href="/events"
            className="card p-4 block no-underline"
            style={{ width: 250, color: '#1A1A1E' }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(200,155,60,0.1)', color: GOLD }}
              >
                {event.type}
              </span>
              {event.price === 0 && (
                <span
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(124,92,252,0.1)', color: '#7C5CFC' }}
                >
                  Free
                </span>
              )}
            </div>
            <h4 className="font-semibold text-sm mb-2 leading-snug">{event.title}</h4>
            <div className="flex items-center gap-1.5 mb-1">
              <Calendar size={11} color="#B0B0B8" />
              <span className="text-[11px]" style={{ color: '#6B6B72' }}>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={11} color="#B0B0B8" />
              <span className="text-[11px]" style={{ color: '#6B6B72' }}>{event.time}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Today's Mantra */}
      <div className="card p-6 mb-5 text-center" style={{ background: '#FAFAF8' }}>
        <Quote size={18} color={GOLD} style={{ opacity: 0.4, marginBottom: 8 }} />
        <p className="font-display text-lg font-bold mb-2 leading-relaxed" style={{ color: '#1A1A1E' }}>
          Om Bhur Bhuvah Swah
        </p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: '#6B6B72' }}>
          Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat
        </p>
        <p className="text-2xl mb-3" style={{ color: '#B0B0B8' }}>&#x0950;</p>
        <span className="text-[11px] font-medium" style={{ color: GOLD }}>
          Gayatri Mantra &mdash; Chant with devotion
        </span>
      </div>

      {/* Guru's Message */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[17px] font-bold tracking-tight" style={{ color: '#1A1A1E' }}>
          Gurudev&apos;s Wisdom
        </h2>
      </div>
      <div
        className="card p-5 mb-5"
        style={{ borderLeft: '3px solid #C89B3C', borderRadius: 20 }}
      >
        <p className="text-sm leading-relaxed italic mb-4" style={{ color: '#6B6B72' }}>
          &ldquo;The divine light that you seek outside is already shining within your heart. Turn your
          gaze inward, and you will find the eternal peace that has always been waiting for you.&rdquo;
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold" style={{ color: '#1A1A1E' }}>&mdash; Gurudev</span>
          <Link
            href="/gurudev"
            className="text-[12px] font-semibold flex items-center gap-1"
            style={{ color: GOLD }}
          >
            Read More <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Meditation CTA */}
      <div
        className="card p-6 mb-5"
        style={{ background: 'linear-gradient(135deg, #1A1A1E 0%, #2A2A2E 100%)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Brain size={16} color="rgba(255,255,255,0.7)" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
            Daily Practice
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold mb-1 text-white">Daily Meditation</h3>
        <p className="text-white/60 text-sm mb-5">5 min &bull; Guided &bull; Calm your mind</p>
        <Link
          href="/meditate"
          className="inline-flex items-center gap-2 bg-[#C89B3C] text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#B8892C] transition-all active:scale-95"
          style={{ boxShadow: '0 4px 16px rgba(200,155,60,0.3)' }}
        >
          <Play size={14} fill="white" color="white" /> Start Session
        </Link>
      </div>

      {/* Latest Videos */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[17px] font-bold tracking-tight" style={{ color: '#1A1A1E' }}>
          Latest Videos
        </h2>
        <Link
          href="/gallery"
          className="text-[13px] font-semibold px-2 py-1 rounded-lg active:opacity-60"
          style={{ color: GOLD }}
        >
          See All
        </Link>
      </div>
      <div className="scroll-x pb-2 mb-5">
        {['Morning Satsang', 'Guided Meditation', 'Divine Discourse'].map((title, i) => (
          <div key={i} className="card" style={{ width: 200 }}>
            <div
              className="relative h-[120px] flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2A2A2E, #3A3A3E)' }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <Play size={16} fill="white" color="white" style={{ marginLeft: 2 }} />
              </div>
            </div>
            <div className="p-3">
              <h4 className="text-xs font-semibold" style={{ color: '#1A1A1E' }}>{title}</h4>
              <span className="text-[10px]" style={{ color: '#B0B0B8' }}>45:00</span>
            </div>
          </div>
        ))}
      </div>

      {/* Donation CTA */}
      <div
        className="card p-5 mb-5 flex items-center justify-between"
        style={{ background: 'rgba(200,155,60,0.05)' }}
      >
        <div>
          <h3 className="font-semibold text-base mb-1" style={{ color: '#1A1A1E' }}>
            Support Our Mission
          </h3>
          <p className="text-xs" style={{ color: '#6B6B72' }}>Help us spread divine wisdom</p>
        </div>
        <Link
          href="/donations"
          className="inline-flex items-center gap-1.5 bg-[#C89B3C] text-white text-sm font-semibold px-5 py-2.5 rounded-full active:scale-95 transition-all"
        >
          <Heart size={13} /> Donate
        </Link>
      </div>

      <div className="h-6" />
    </div>
  );
}
