'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Calendar, Brain, Heart, Image, FileText, Phone,
  Quote, Play, ArrowRight, RefreshCw, ChevronRight, Sun
} from 'lucide-react';
import { events } from '@/lib/data';
import { formatDate } from '@/lib/utils';

const quickActions = [
  { icon: Calendar, label: 'Events', href: '/events' },
  { icon: Brain, label: 'Meditation', href: '/meditate' },
  { icon: Heart, label: 'Donate', href: '/donations' },
  { icon: Image, label: 'Gallery', href: '/gallery' },
  { icon: FileText, label: 'Blog', href: '/blog' },
  { icon: Phone, label: 'Contact', href: '/contact' },
];

const mantraData = {
  text: 'Om Bhur Bhuvah Swah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat',
  sanskrit: 'ॐ भूर्भुवः स्वः । तत्सवितुर्वरेण्यम् । भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥',
  source: 'Gayatri Mantra',
};

const guruMessage = {
  quote: 'The divine light that you seek outside is already shining within your heart. Turn your gaze inward, and you will find the eternal peace that has always been waiting for you.',
  author: '— Gurudev',
};

const videos = [
  { id: 'v1', title: 'Morning Satsang', duration: '45:00', thumbnail: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400' },
  { id: 'v2', title: 'Guided Meditation', duration: '20:00', thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400' },
  { id: 'v3', title: 'Divine Discourse', duration: '60:00', thumbnail: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`skeleton ${className || ''}`} />;
}

function HomeSkeleton() {
  return (
    <div className="app-content space-y-5">
      <SkeletonBlock className="h-[240px] w-full rounded-[20px]" />
      <SkeletonBlock className="h-[160px] w-full rounded-[20px]" />
      <div className="grid grid-cols-3 gap-3">
        {[...Array(6)].map((_, i) => (
          <SkeletonBlock key={i} className="h-[90px] rounded-2xl" />
        ))}
      </div>
      <SkeletonBlock className="h-[24px] w-[180px]" />
      <div className="flex gap-3">
        <SkeletonBlock className="h-[200px] w-[280px] shrink-0 rounded-[20px]" />
        <SkeletonBlock className="h-[200px] w-[280px] shrink-0 rounded-[20px]" />
      </div>
      <SkeletonBlock className="h-[200px] w-full rounded-[20px]" />
      <SkeletonBlock className="h-[140px] w-full rounded-[20px]" />
    </div>
  );
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const isPulling = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (scrollRef.current && scrollRef.current.scrollTop <= 0) {
      touchStartY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling.current || refreshing) return;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (dy > 0) {
      const distance = Math.min(dy * 0.4, 120);
      setPullDistance(distance);
    }
  }, [refreshing]);

  const handleTouchEnd = useCallback(() => {
    if (!isPulling.current) return;
    isPulling.current = false;
    if (pullDistance >= 80) {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
        setPullDistance(0);
      }, 1000);
    } else {
      setPullDistance(0);
    }
  }, [pullDistance]);

  if (loading) return <HomeSkeleton />;

  return (
    <div
      ref={scrollRef}
      className="app-content overflow-y-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence>
        {pullDistance > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, height: pullDistance }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-center overflow-hidden"
          >
            {refreshing ? (
              <RefreshCw className="w-5 h-5 text-accent animate-spin" />
            ) : (
              <motion.div
                animate={{ rotate: pullDistance > 60 ? 180 : 0 }}
                className="text-accent"
              >
                <RefreshCw className="w-5 h-5" />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-5 pb-4"
      >
        {/* Hero Banner */}
        <motion.div variants={itemVariants}>
          <div className="hero-card hero-gradient p-6 flex flex-col justify-end min-h-[240px] relative overflow-hidden">
            <div className="absolute -top-8 -right-8 text-8xl text-white/10 font-display animate-float select-none">
              ॐ
            </div>
            <div className="absolute -bottom-4 -left-4 text-6xl text-white/5 font-display select-none">
              ॐ
            </div>
            <div className="relative z-10">
              <span className="inline-flex items-center text-white/80 text-xs font-semibold tracking-wider uppercase mb-2">
                <Sun className="w-3.5 h-3.5 mr-1.5" />
                Today&apos;s Blessing
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                Find Peace Within
              </h1>
              <p className="text-white/70 text-sm max-w-[240px]">
                Begin your journey to inner harmony and spiritual awakening
              </p>
            </div>
          </div>
        </motion.div>

        {/* Daily Blessing Card */}
        <motion.div variants={itemVariants}>
          <Link href="/blessings" className="block">
            <div className="app-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">Daily Blessing</span>
              </div>
              <h3 className="font-display text-xl font-bold text-text-primary mb-2">The Light Within</h3>
              <p className="text-sm text-text-secondary leading-relaxed italic mb-3">
                &ldquo;Just as a lamp dispels darkness, the light of divine knowledge dispels the ignorance of the soul.&rdquo;
              </p>
              <div className="w-full h-px bg-accent/10 mb-3" />
              <div className="flex items-center gap-1 text-accent text-sm font-medium">
                <span>Tap to read more</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="rounded-2xl bg-accent-soft p-4 flex flex-col items-center gap-2 text-sm font-medium text-text-primary active:scale-95 transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-xs font-semibold">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
            <Link href="/events" className="section-action flex items-center gap-0.5">
              See All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="scroll-x">
            {events.slice(0, 4).map((event) => (
              <Link key={event.id} href={`/events/${event.id}`} className="block">
                <div className="app-card w-[280px] p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="badge badge-gold text-[10px] uppercase tracking-wider">{event.type}</span>
                    <span className="text-xs font-semibold text-accent">
                      {event.price === 0 ? 'Free' : `\u20B9${event.price}`}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-text-primary mb-1.5 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-xs text-text-muted mb-1">{formatDate(event.date)}</p>
                  <p className="text-xs text-text-muted truncate">{event.location}</p>
                  <div className="mt-3 w-full h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-text-muted mt-1.5">
                    {event.registered}/{event.capacity} registered
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Today's Mantra */}
        <motion.div variants={itemVariants}>
          <div className="app-card-glass p-6 relative overflow-hidden">
            <div className="absolute top-3 right-3 text-accent/10">
              <Quote className="w-12 h-12" />
            </div>
            <Quote className="w-6 h-6 text-accent mb-4" />
            <p className="font-display text-lg font-bold text-text-primary leading-relaxed mb-3">
              {mantraData.text}
            </p>
            <p className="text-sm text-text-secondary font-display italic mb-4 leading-relaxed">
              {mantraData.sanskrit}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-accent" />
              <span className="text-xs text-text-muted font-medium">Chant this mantra</span>
            </div>
          </div>
        </motion.div>

        {/* Guru's Message */}
        <motion.div variants={itemVariants}>
          <div className="section-header pb-2">
            <h2 className="section-title">Gurudev&apos;s Wisdom</h2>
          </div>
          <div className="app-card p-5" style={{ borderLeft: '3px solid #C89B3C' }}>
            <Quote className="w-5 h-5 text-accent/40 mb-3" />
            <p className="text-sm text-text-secondary leading-relaxed italic mb-4">
              &ldquo;{guruMessage.quote}&rdquo;
            </p>
            <p className="text-xs font-semibold text-accent mb-3">{guruMessage.author}</p>
            <Link
              href="/gurudev"
              className="inline-flex items-center gap-1 text-accent text-sm font-medium"
            >
              Read More <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Latest Videos */}
        <motion.div variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">Latest Videos</h2>
            <Link href="/gallery" className="section-action flex items-center gap-0.5">
              See All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="scroll-x">
            {videos.map((video) => (
              <div
                key={video.id}
                className="relative w-[240px] h-[152px] rounded-[20px] overflow-hidden bg-neutral-900 shrink-0 cursor-pointer active:scale-[0.98] transition-transform"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm font-semibold truncate">{video.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{video.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Meditation Section */}
        <motion.div variants={itemVariants}>
          <Link href="/meditate" className="block">
            <div
              className="rounded-[20px] p-6 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1A1A1E 0%, #2A2A2E 100%)' }}
            >
              <div className="absolute -top-6 -right-6 text-7xl text-white/5 font-display select-none">
                ॐ
              </div>
              <Brain className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-white font-display text-xl font-bold mb-1">Daily Meditation</h3>
              <p className="text-white/60 text-sm mb-5">5 min &bull; Guided</p>
              <button className="btn-app btn-primary-app w-full">
                <Play className="w-4 h-4" />
                Start
              </button>
            </div>
          </Link>
        </motion.div>

        {/* Donation Card */}
        <motion.div variants={itemVariants}>
          <div
            className="rounded-[20px] p-6"
            style={{ background: 'rgba(200,155,60,0.06)' }}
          >
            <Heart className="w-8 h-8 text-accent mb-3" />
            <h3 className="font-display text-xl font-bold text-text-primary mb-2">Support the Mission</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-5">
              Your contributions help us spread spiritual wisdom, serve humanity, and preserve sacred traditions for generations to come.
            </p>
            <Link href="/donations">
              <button className="btn-app btn-primary-app w-full">
                <Heart className="w-4 h-4" />
                Donate Now
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Bottom Spacing */}
        <div className="h-8" />
      </motion.div>
    </div>
  );
}
