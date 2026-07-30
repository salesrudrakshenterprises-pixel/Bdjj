'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { dailyBlessings } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { Sun, BookOpen, Share2, Bell, Mail, Sparkles, Quote } from 'lucide-react';

export default function BlessingsPage() {
  const [subscribed, setSubscribed] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const sortedBlessings = [...dailyBlessings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const todayBlessing = sortedBlessings.find((b) => b.date === new Date().toISOString().split('T')[0]);
  const previousBlessings = sortedBlessings.filter((b) => b.date !== new Date().toISOString().split('T')[0]);

  const handleShare = async (blessing: typeof dailyBlessings[number]) => {
    const text = `${blessing.title}\n\n${blessing.message}\n\n— ${blessing.scripture}\n\nReflection: ${blessing.reflection}`;
    if (navigator.share) {
      await navigator.share({ title: blessing.title, text });
    } else {
      await navigator.clipboard.writeText(text);
      setCopiedId(blessing.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeading title="Daily Blessings" subtitle="Sacred wisdom delivered each day" />

        {todayBlessing && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-16"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#C8A45C]/10 via-[#E8D5A3]/5 to-transparent rounded-3xl" />
            <div className="relative glass-card rounded-3xl p-8 lg:p-12 border-[#C8A45C]/40 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8A45C]/5 rounded-full blur-3xl" />
              <div className="flex items-center gap-3 mb-6">
                <Sun className="w-6 h-6 text-[#C8A45C]" />
                <span className="text-[#C8A45C] text-sm font-medium">Today's Blessing</span>
              </div>
              <Quote className="w-10 h-10 text-[#C8A45C]/30 mb-4" />
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                {todayBlessing.title}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6 italic">
                &ldquo;{todayBlessing.message}&rdquo;
              </p>
              <div className="flex items-center gap-2 text-[#C8A45C] mb-8">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">{todayBlessing.scripture}</span>
              </div>
              <div className="bg-bg-glass rounded-2xl p-6 mb-8 border border-[#C8A45C]/20">
                <h4 className="text-sm font-semibold text-white mb-2">Reflection</h4>
                <p className="text-gray-400 leading-relaxed">{todayBlessing.reflection}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <GlowButton onClick={() => handleShare(todayBlessing)}>
                  <Share2 className="w-4 h-4" />
                  {copiedId === todayBlessing.id ? 'Copied!' : 'Share this blessing'}
                </GlowButton>
                <GlowButton variant="outline" onClick={() => setSubscribed(!subscribed)}>
                  {subscribed ? <Bell className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  {subscribed ? 'Subscribed' : 'Subscribe to daily email'}
                </GlowButton>
              </div>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-green-400 text-sm flex items-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  You will receive daily blessings via email
                </motion.p>
              )}
            </div>
          </motion.div>
        )}

        <div className="mb-8">
          <h3 className="text-2xl font-display font-bold text-white mb-2">Previous Blessings</h3>
          <p className="text-gray-500">Reflect on past wisdom</p>
        </div>

        {previousBlessings.length === 0 ? (
          <div className="text-center py-16">
            <Sparkles className="w-16 h-16 text-[#C8A45C]/30 mx-auto mb-4" />
            <p className="text-gray-500">No previous blessings available.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousBlessings.map((blessing, i) => (
              <AnimatedCard key={blessing.id} delay={i * 0.1}>
                <div className="flex items-center gap-2 text-[#C8A45C] text-xs mb-3">
                  <Sun className="w-3.5 h-3.5" />
                  <span>{formatDate(blessing.date)}</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{blessing.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  &ldquo;{blessing.message}&rdquo;
                </p>
                <div className="flex items-center gap-2 text-[#C8A45C] text-xs mb-4">
                  <BookOpen className="w-3 h-3" />
                  <span>{blessing.scripture}</span>
                </div>
                <p className="text-gray-500 text-xs italic mb-5">
                  {blessing.reflection}
                </p>
                <button
                  onClick={() => handleShare(blessing)}
                  className="inline-flex items-center gap-2 text-sm text-[#C8A45C] hover:text-[#E8D5A3] transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  {copiedId === blessing.id ? 'Copied!' : 'Share'}
                </button>
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
